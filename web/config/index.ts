import localp from './dev';
import testp from './test';
import releasep from './release';
import prodp from './prod';

export const proxys: any = {
  development: {
    keys: Object.keys(localp),
    proxy: localp,
  },
  test: {
    keys: Object.keys(testp),
    proxy: testp,
  },
  release: {
    keys: Object.keys(releasep),
    proxy: releasep,
  },
  production: {
    keys: Object.keys(prodp),
    proxy: prodp,
  },
};
