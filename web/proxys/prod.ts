/**
 * 线上服务端直连接口转发  改错直接80，斟酌哈
 */

import { TProxys } from "./type";

const proxy: TProxys = {
    "product-api": "http://master.cjproductcenter.cj.com",
    "cujiaOthers": "http://192.168.5.197:8121"
}

export default proxy