import { createEvents } from '@pulldown-refresh/core';
import '@pulldown-refresh/core/dist/lib/index.css';
import { checkElement, checkElementBySelector } from '@pulldown-refresh/util';
import { PulldownRefresherConfig } from './types';

export class PulldownRefresher {
  static init(selector: string, config?: PulldownRefresherConfig): PulldownRefresher;
  static init(element: HTMLElement, config?: PulldownRefresherConfig): PulldownRefresher;
  static init(arg: string | HTMLElement, config?: PulldownRefresherConfig): PulldownRefresher {
    return new PulldownRefresher(arg, config);
  }

  private container: HTMLElement;

  private board: HTMLElement;

  private content: HTMLElement;

  private config: PulldownRefresherConfig;

  constructor(arg: string | HTMLElement, config: PulldownRefresherConfig = {}) {
    this.container = typeof arg === 'string' ? checkElementBySelector(arg) : arg;
    this.board = document.createElement('div');
    this.content = checkElement(this.container.querySelector('[name=pulldown-refresher-content]'));
    this.config = config;

    if (!this.container.classList.contains('pulldownRefresh')) {
      this.container.classList.add('pulldownRefresh');
    }
    this.board.className = 'pulldownRefresh__board';
    if (!this.content.classList.contains('pulldownRefresh__content')) {
      this.content.classList.add('pulldownRefresh__content');
    }

    this.container.appendChild(this.board);
    this.registerEvents();
  }

  registerEvents() {
    const { handlePressDown, handlePressing, handlePressUp } = createEvents({
      container: this.content,
      ...this.config,
    });
    this.content.addEventListener('touchstart', handlePressDown, { passive: true });
    this.content.addEventListener('touchmove', handlePressing, { passive: true });
    this.content.addEventListener('touchend', handlePressUp, { passive: true });
  }
}
