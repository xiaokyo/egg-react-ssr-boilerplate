import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, StaticRouter, Route, Switch } from 'react-router-dom'
import { Context } from 'midway'
import { getWrappedComponent, getComponent, RouteItem } from 'ykfe-utils'
import defaultLayout from './layout'
import { I18nextProvider } from 'react-i18next'
import { getInitI18nClient, getInitI18nServer } from './i18next'
const { routes } = require('../config/config.ssr')

const clientRender = async (): Promise<void> => {
  getInitI18nClient()
  // 客户端渲染||hydrate
  ReactDOM[window.__USE_SSR__ ? 'hydrate' : 'render'](
    <BrowserRouter>
      <Switch>
        {
          // 使用高阶组件getWrappedComponent使得csr首次进入页面以及csr/ssr切换路由时调用getInitialProps
          routes.map((item: RouteItem) => {
            const activeComponent = item.Component()
            const Layout = activeComponent.Layout || defaultLayout
            const WrappedComponent = getWrappedComponent(activeComponent)
            return <Route exact={item.exact} key={item.path} path={item.path} render={() => <Layout key={window.location.pathname}><WrappedComponent /></Layout>} />
          })
        }
      </Switch>
    </BrowserRouter>
    , document.getElementById('app'))
  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept()
  }
}

const serverRender = async (ctx: Context): Promise<JSX.Element> => {
  // 服务端渲染 根据ctx.path获取请求的具体组件，调用getInitialProps并渲染
  const ActiveComponent = getComponent(routes, ctx.path)()
  const Layout = ActiveComponent.Layout || defaultLayout
  const serverData = ActiveComponent.getInitialProps ? await ActiveComponent.getInitialProps(ctx) : {}
  ctx.serverData = serverData
  const i18n = getInitI18nServer(ctx)
  return (
    <I18nextProvider i18n={i18n}>
      <StaticRouter location={ctx.req.url} context={serverData}>
        <Layout layoutData={ctx}>
          <ActiveComponent {...serverData} />
        </Layout>
      </StaticRouter>
    </I18nextProvider>
  )
}
export default __isBrowser__ ? clientRender() : serverRender
