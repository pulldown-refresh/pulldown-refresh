import { createEvents, fillStyles } from '@pulldown-refresh/core';

export class PulldownRefresher {
  static init(container: string | HTMLElement) {
    return new PulldownRefresher(container);
  }

  private elem: HTMLElement;

  constructor(container: string | HTMLElement) {
    if (typeof container === 'string') {
      const elem = document.querySelector(container);
      if (!elem) {
        throw Error(`Can not find element by \`${container}\`.`);
      }
      if (!(elem instanceof HTMLElement)) {
        throw Error(`Element find by \`${container}\` is not a valid HTMLElement.`);
      }
      this.elem = elem;
    } else {
      this.elem = container;
    }
    fillStyles(this.elem);
    this.registerEvents();
  }

  registerEvents() {
    const { handlePressDown, handlePressing, handlePressUp } = createEvents({
      container: this.elem,
      callback: finish => {
        setTimeout(() => finish(), 3000);
      },
    });
    this.elem.addEventListener('mousedown', handlePressDown);
    this.elem.addEventListener('mousemove', handlePressing);
    this.elem.addEventListener('mouseup', handlePressUp);
  }
}
