import { createEvents, getConstants } from '@pulldown-refresh/core';

class PulldownRefresherElement extends HTMLElement {
  private container: HTMLDivElement;

  constructor() {
    super();

    const template = this.getTemplate();
    this.className = 'pulldownRefresh';

    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(template.content.cloneNode(true));
    this.container = shadowRoot.querySelector('.pulldownRefresh__container') as HTMLDivElement;

    const style = document.createElement('style');
    // @ts-expect-error COMPONENT_STYLE defined
    style.innerHTML = COMPONENT_STYLE;
    shadowRoot.appendChild(style);

    this.registerConstants();
    this.registerEvents();
  }

  registerConstants() {
    const { DIFF_LIMIT } = getConstants();
    this.style.setProperty('--refresh-board-height', `${DIFF_LIMIT}px`);
  }

  registerEvents() {
    const { handlePressDown, handlePressing, handlePressUp } = createEvents({
      container: this.container,
      callback: finish => {
        setTimeout(() => finish(), 3000);
      },
    });
    this.container.addEventListener('touchstart', handlePressDown);
    this.container.addEventListener('touchmove', handlePressing);
    this.container.addEventListener('touchend', handlePressUp);
  }

  getTemplate = () => {
    const parser = new DOMParser();
    const dom = parser.parseFromString(this.render(), 'text/html');
    return dom.getElementById('pulldown-refresher') as HTMLTemplateElement;
  };

  render = () => {
    return /* html */ `
      <template id="pulldown-refresher">
        <div class="pulldownRefresh__board"></div>
        <div class="pulldownRefresh__container">
          <slot></slot>
        </div>
      </template>
    `;
  };
}

export const PulldownRefresher = {
  register: () => {
    if (!Object.prototype.hasOwnProperty.call(window, 'customElements')) {
      throw Error(
        'Your browser does not support `CustomElementRegistry`. See more detail for https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry'
      );
    }
    window.customElements.define('pulldown-refresher', PulldownRefresherElement);
  },
};
