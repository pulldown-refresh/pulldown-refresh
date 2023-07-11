import { CreateEventsParams } from './types';
import { DIFF_LIMIT_DEFAULT, STOP_ANIM_DURATION } from '@/constants';

export const createEvents = ({ container, onRefresh, pulldownLimit }: CreateEventsParams) => {
  let isPressing = false;
  let isLoading = false;
  let startY = 0;
  let diff = 0;
  const frameIds: number[] = [];

  const getDiffLimit = (): [number, string] => {
    const checkLimit = (limit: number) => {
      if (limit < DIFF_LIMIT_DEFAULT) {
        console.warn(`The \`pulldownLimit\` you set (${limit}) is too low. Our suggestion is ${DIFF_LIMIT_DEFAULT}.`);
      }
    };

    if (!pulldownLimit) {
      return [DIFF_LIMIT_DEFAULT, `${DIFF_LIMIT_DEFAULT}px`];
    }

    if (typeof pulldownLimit === 'number') {
      checkLimit(pulldownLimit);
      return [pulldownLimit, `${pulldownLimit}px`];
    }

    const { limit, ignoreLimitCheck = false, px2rem } = pulldownLimit;
    if (!ignoreLimitCheck) {
      checkLimit(limit);
    }
    return [limit, px2rem ? `${px2rem(limit)}rem` : `${limit}px`];
  };

  const [diffLimit, diffLimitWithUnit] = getDiffLimit();

  const stopRefresh = () => {
    container.style.transform = '';
    setTimeout(() => {
      container.style.transition = '';
      document.body.classList.remove('pulldownRefresh__overflowHidden');
      isLoading = false;
    }, STOP_ANIM_DURATION);
  };

  const handlePressDown = (ev: TouchEvent) => {
    if (isLoading) {
      return;
    }
    isPressing = true;
    startY = ev.touches[0].clientY;
    document.body.classList.add('pulldownRefresh__overflowHidden');
  };

  const handlePressing = (ev: TouchEvent) => {
    if (isLoading || !isPressing) {
      return;
    }
    const frameId = requestAnimationFrame(() => {
      diff = 0.5 * (ev.changedTouches[0].clientY - startY);
      if (diff > 0) {
        container.style.transform = `translateY(${diff}px)`;
      }
    });
    frameIds.push(frameId);
  };

  const handlePressUp = () => {
    if (isLoading) {
      return;
    }
    isPressing = false;
    container.style.transition = `transform ${STOP_ANIM_DURATION}ms ease`;
    frameIds.forEach(id => cancelAnimationFrame(id));

    if (diff < diffLimit) {
      stopRefresh();
      return;
    }

    isLoading = true;
    container.style.transform = `translateY(${diffLimitWithUnit})`;
    if (!onRefresh) {
      setTimeout(() => stopRefresh(), 2000);
      return;
    }

    onRefresh(() => stopRefresh());
  };

  return { handlePressDown, handlePressing, handlePressUp };
};
