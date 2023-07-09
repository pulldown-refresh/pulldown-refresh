import sass from 'sass';
import * as path from 'path';

export const getComponentStyle = () => {
  const { css } = sass.compile(path.resolve(__dirname, './index.scss'));
  return css;
};
