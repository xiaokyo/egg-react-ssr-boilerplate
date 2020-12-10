import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom';
import { Context } from 'midway';
import { getWrappedComponent, getComponent, RouteItem } from 'ykfe-utils';
import defaultLayout from './layout';
import { I18nextProvider } from 'react-i18next';
import { getInitI18nClient, getInitI18nServer } from './i18next';
const { routes } = require('../config/config.ssr');

import '@/assets/common.less';
import { getServerCookie } from './tools/cookie';
import Manage from './components/Manage';
import getManageComponent from './components/Manage/getManageComponent';

// 没有layout的
const noLayoutPathObj = {
  '/login': false
}
const noLayoutPaths = Object.keys(noLayoutPathObj)
const getLayout = (currentPath: string) => {
  let c = Manage
  noLayoutPaths.forEach(path => {
    if (path === currentPath || currentPath.startsWith(path)) {
      c = ({ children }) => <>{children}</>
    }
  })
  return c
}

const clientRender = async (): Promise<void> => {
  getInitI18nClient();
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      <Switch>
        {// 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
          routes.map((item: RouteItem) => {
            const activeComponent = item.Component();
            const Layout = activeComponent.Layout || defaultLayout;
            const WrappedComponent = getWrappedComponent(activeComponent);
            // 判断是否有layout 且有的情况去请求初始值获取数据
            const ManageLayout = getManageComponent(getLayout(item.path))

            return (
              <Route
                exact={item.exact}
                key={item.path}
                path={item.path}
                render={() => (
                  <Layout key={window.location.pathname}>
                    <ManageLayout {...window.__LAYOUT_DATA__}>
                      <WrappedComponent />
                    </ManageLayout>
                  </Layout>
                )}
              />
            );
          })}
      </Switch>
    </BrowserRouter>,
    document.getElementById('app'),
  );
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
  }
};

const serverRender = async (ctx: Context): Promise<JSX.Element> => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(routes, ctx.path)();
  const Layout = ActiveComponent.Layout || defaultLayout;
  const serverData = ActiveComponent.getInitialProps
    ? await ActiveComponent.getInitialProps(ctx)
    : {};
  ctx.serverData = serverData;
  ctx.theme = getServerCookie(ctx, 'theme') ?? 'default'

  // 判断是否有layout 且有的情况去请求初始值获取数据
  const ManageLayout = getLayout(ctx.path)
  const manageLayoutData = ManageLayout.getInitialProps ? await ManageLayout.getInitialProps(ctx) : {}
  ctx.manageLayoutData = manageLayoutData

  const i18n = getInitI18nServer(ctx);
  return (
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={ctx.req.url} context={serverData}>
        <Layout layoutData={ctx}>
          <ManageLayout {...manageLayoutData}>
            <ActiveComponent {...serverData} />
          </ManageLayout>
        </Layout>
      </StaticRouter>
    </I18nextProvider>
  );
};

// @ts-ignore
export default __isBrowser__ ? clientRender() : serverRender;
