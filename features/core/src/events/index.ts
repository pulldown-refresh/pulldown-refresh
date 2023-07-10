import { CreateEventsParams } from './types';
import { DIFF_LIMIT, STOP_ANIM_DURATION } from '@/constants';

export const createEvents = ({ container, callback }: CreateEventsParams) => {
  let isPressing = false;
  let startY = 0;
  let diff = 0;
  const frameIds: number[] = [];

  const handlePressDown = (ev: TouchEvent) => {
    isPressing = true;
    startY = ev.touches[0].clientY;
    document.body.classList.add('pulldownRefresh__overflowHidden');
  };

  const handlePressing = (ev: TouchEvent) => {
    if (!isPressing) {
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

  const stopRefresh = () => {
    container.style.transform = '';
    setTimeout(() => {
      container.style.transition = '';
      document.body.classList.remove('pulldownRefresh__overflowHidden');
    }, STOP_ANIM_DURATION);
  };

  const handlePressUp = () => {
    isPressing = false;
    container.style.transition = `transform ${STOP_ANIM_DURATION}ms ease`;
    frameIds.forEach(id => cancelAnimationFrame(id));

    if (diff < DIFF_LIMIT) {
      stopRefresh();
      return;
    }

    container.style.transform = `translateY(${DIFF_LIMIT}px)`;
    if (!callback) {
      setTimeout(() => stopRefresh(), 2000);
      return;
    }

    callback(() => stopRefresh());
  };

  return { handlePressDown, handlePressing, handlePressUp };
};
