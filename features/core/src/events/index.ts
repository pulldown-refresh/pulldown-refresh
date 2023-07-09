import { DIFF_LIMIT, STOP_ANIM_DURATION } from '../constants';
import { CreateEventsParams } from './types';

export const createEvents = ({ container, callback }: CreateEventsParams) => {
  let isPressing = false;
  let startY = 0;

  const handlePressDown = (ev: TouchEvent) => {
    isPressing = true;
    startY = ev.touches[0].clientY;
    document.body.classList.add('pulldownRefresh__overflowHidden');
  };

  const handlePressing = (ev: TouchEvent) => {
    if (!isPressing) {
      return;
    }
    requestAnimationFrame(() => {
      const diff = ev.changedTouches[0].clientY - startY;
      if (diff > 0) {
        container.style.transform = `translateY(${Math.min(diff, DIFF_LIMIT)}px)`;
      }
    });
  };

  const stopRefresh = () => {
    container.style.transform = '';
    setTimeout(() => {
      container.style.transition = '';
      document.body.classList.remove('pulldownRefresh__overflowHidden');
    }, STOP_ANIM_DURATION);
  };

  const handlePressUp = (ev: TouchEvent) => {
    isPressing = false;
    container.style.transition = `transform ${STOP_ANIM_DURATION}ms ease`;

    if (ev.changedTouches[0].clientY < startY + DIFF_LIMIT) {
      stopRefresh();
      return;
    }

    container.style.transform = `translateY(${DIFF_LIMIT}px)`;
    startY = 0;
    if (!callback) {
      setTimeout(() => stopRefresh(), 2000);
      return;
    }
    callback(() => stopRefresh());
  };

  return { handlePressDown, handlePressing, handlePressUp };
};
