const resolvePath = path => require('path').resolve(__dirname, path);
const routes = require('./routes');

module.exports = {
  type: 'ssr', // 指定运行类型可设置为csr切换为客户端渲染
  routes: Object.keys(routes).map(path => ({
    path,
    exact: true,
    Component: () => require('@/page/' + routes[path]).default, // 这里使用一个function包裹为了让它延迟require
    controller: 'page',
    handler: 'index',
  })),
  baseDir: resolvePath('../'),
  injectCss: [
    `/themes/antd.css`,
    `/static/css/Page.chunk.css`
  ], // 客户端需要加载的静态样式表
  injectScript: [
    `<script src='/static/js/runtime~Page.js'></script>`,
    `<script src='/static/js/vendor.chunk.js'></script>`,
    `<script src='/static/js/Page.chunk.js'></script>`,
  ], // 客户端需要加载的静态资源文件表
  serverJs: resolvePath(`../output/Page.server.js`),
  layout: resolvePath(`../output/Layout.server.js`),
  useCDN: false,
};
