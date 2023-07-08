import './index.scss';

export const fillStyles = (container: HTMLElement) => {
  const className = 'pulldownRefresh__container';
  if (!container.classList.contains(className)) {
    container.classList.add(className);
  }
};
