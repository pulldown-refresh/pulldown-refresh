export type Pixcel = number;

export type Rem = number;

export type PulldownLimit =
  | Pixcel
  | {
      limit: Pixcel;
      ignoreLimitCheck?: boolean;
      px2rem?: (px: Pixcel) => Rem;
    };

export type CoreConfig = {
  pulldownLimit?: PulldownLimit;
  onRefresh?: (finish: () => void) => void | Promise<void>;
};
