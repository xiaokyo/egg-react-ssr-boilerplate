import genApis, { GenApis } from "../../tools/genApis"

const apis = {
    getShelvesList: 'POST /product-api/cjProductInfo/shelves/list',
}

const APIS: GenApis<typeof apis> = genApis(apis)
export default APIS