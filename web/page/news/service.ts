import genApis, { GenApis } from '../../tools/genApis';

const apis = {
  getDetail: 'POST /product-api/cjProductInfo/handle/get',
};

const APIS: GenApis<typeof apis> = genApis(apis);
export default APIS;
