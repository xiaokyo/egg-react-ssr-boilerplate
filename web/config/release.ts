/**
 * 预发布服务端直连接口转发  建议不用动
 */

import { TProxys } from './type';

const proxy: TProxys = {
  'product-api': 'http://release1111.cjproductcenter.cj.com',
  cujiaOthers: 'http://192.168.5.197:8121',
};

export default proxy;
