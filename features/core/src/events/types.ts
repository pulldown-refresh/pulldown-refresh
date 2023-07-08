export type CreateEventsParams = {
  container: HTMLElement;
  callback?: (finish: () => void) => void | Promise<void>;
};
