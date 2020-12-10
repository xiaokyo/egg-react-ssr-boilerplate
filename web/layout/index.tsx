import React from 'react';
import serialize from 'serialize-javascript';
import { Context } from 'midway';
import './index.less';

const commonNode = (props: LayoutProps) => {
  return props.children ? props.children : null
}

interface LayoutProps {
  layoutData?: Context;
  ManageLayout?: any
  children?: JSX.Element | null;
}

const Layout: SFC<LayoutProps> = (props: LayoutProps): JSX.Element | null => {
  if (__isBrowser__) {
    return commonNode(props);
  } else {
    const { serverData, theme, manageLayoutData } = props.layoutData!; // tslint:disable-line
    const { injectCss, injectScript } = props.layoutData!.app.config; // tslint:disable-line
    const initialPageData = serialize(serverData)
    const initialLayoutData = serialize(manageLayoutData)
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <title>SASS</title>
          {injectCss &&
            injectCss.map((item: string) => (
              <link rel="stylesheet" href={item} key={item} />
            ))}
          <link rel="stylesheet" id="theme-link" href={`/themes/${theme}.css`} />
        </head>
        <body>
          <div id="app">{commonNode(props)}</div>
          {serverData && (
            <script
              dangerouslySetInnerHTML={{
                __html: `window.__USE_SSR__=true; window.__INITIAL_DATA__ =${initialPageData}; window.__LAYOUT_DATA__=${initialLayoutData}`, // tslint:disable-line
              }}
            />
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: injectScript && injectScript.join(''),
            }}
          />
        </body>
      </html>
    );
  }
};

export default Layout;
