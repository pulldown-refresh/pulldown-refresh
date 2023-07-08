import { PulldownRefresher } from '@pulldown-refresh/native';
import 'reset.css';
import styles from './index.module.scss';

const wrapper = document.getElementById('wrapper');
if (wrapper) {
  wrapper.className = styles.wrapper;
  wrapper.textContent = 'hello world';
  PulldownRefresher.init(wrapper);
}
