import { CreateEventsParams } from './types';

const DIFF_LIMIT = 100;

export const createEvents = ({ container, callback }: CreateEventsParams) => {
  let isPressing = false;
  let startY = 0;

  const handlePressDown = (ev: MouseEvent) => {
    isPressing = true;
    startY = ev.clientY;
    document.body.classList.add();
  };

  const handlePressing = (ev: MouseEvent) => {
    if (!isPressing) {
      return;
    }
    requestAnimationFrame(() => {
      const diff = ev.clientY - startY;
      if (diff > 0) {
        container.style.transform = `translateY(${Math.min(diff, DIFF_LIMIT)}px)`;
      }
    });
  };

  const stopRefresh = () => {
    container.style.transform = '';
  };

  const handlePressUp = () => {
    isPressing = false;
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
