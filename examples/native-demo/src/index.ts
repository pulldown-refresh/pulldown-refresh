import { PulldownRefresher } from '@pulldown-refresh/native';
import '@pulldown-refresh/native/dist/lib/index.css';
import 'reset.css';
import './index.module.scss';

PulldownRefresher.init('#pulldown-refresher', {
  onRefresh: finish => {
    setTimeout(() => finish(), 3 * 1000);
  },
  pulldownLimit: {
    limit: 60,
    ignoreLimitCheck: true,
    // px2rem: px => (px * 23) / 375,
  },
});
