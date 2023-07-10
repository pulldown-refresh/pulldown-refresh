import { createEvents } from '@pulldown-refresh/core';
import '@pulldown-refresh/core/dist/lib/index.css';

const checkElement = (elem: Element | null) => {
  if (!(elem instanceof HTMLElement)) {
    throw Error(`${elem} is not a HTMLElement.`);
  }
  return elem;
};

const checkElementBySelector = (selector: string) => {
  const elem = document.querySelector(selector);
  if (!elem) {
    throw Error(`Please check your selector. Can not find an element by ${selector}.`);
  }
  return checkElement(elem);
};

export class PulldownRefresher {
  static init(selector: string): PulldownRefresher;
  static init(element: HTMLElement): PulldownRefresher;
  static init(arg: string | HTMLElement): PulldownRefresher {
    return new PulldownRefresher(arg);
  }

  private container: HTMLElement;

  private board: HTMLElement;

  private content: HTMLElement;

  constructor(arg: string | HTMLElement) {
    this.container = typeof arg === 'string' ? checkElementBySelector(arg) : arg;
    if (!this.container.classList.contains('pulldownRefresh')) {
      this.container.classList.add('pulldownRefresh');
    }

    this.board = document.createElement('div');
    this.board.className = 'pulldownRefresh__board';
    this.container.appendChild(this.board);

    this.content = checkElement(this.container.querySelector('[name=pulldown-refresher-content]'));
    if (!this.content.classList.contains('pulldownRefresh__content')) {
      this.content.classList.add('pulldownRefresh__content');
    }

    this.registerEvents();
  }

  registerEvents() {
    const { handlePressDown, handlePressing, handlePressUp } = createEvents({
      container: this.content,
      callback: finish => {
        setTimeout(() => finish(), 3000);
      },
    });
    this.content.addEventListener('touchstart', handlePressDown);
    this.content.addEventListener('touchmove', handlePressing);
    this.content.addEventListener('touchend', handlePressUp);
  }
}
