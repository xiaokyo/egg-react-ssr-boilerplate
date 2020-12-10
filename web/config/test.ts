/**
 * 测试服务端直连接口转发  建议不用动
 */

import { TProxys } from './type';

const proxy: TProxys = {
  'product-api': 'http://test.cjproductcenter.cj.com',
  cujiaOthers: 'http://192.168.5.197:8121',
};

export default proxy;
