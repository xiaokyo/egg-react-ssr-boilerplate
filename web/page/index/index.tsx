import useTheme from '@/hooks/useTheme';
import { Button } from 'antd';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Cookie } from '../../tools';
import './index.less';
import APIS from './service';

interface Props {
  news: NewsItem[];
}
interface NewsItem {
  id: string;
  category: string;
  nameEn: string;
}

const Page: SFC<Props> = (props: Props): JSX.Element => {
  const { t, i18n } = useTranslation();
  const [themeLoading, setTheme] = useTheme()

  const name = 'xiaokyo';

  const changeLanguage = (lng: string) => {
    console.log('changeLng', lng);
    i18n.changeLanguage(lng);
    Cookie.setCookie('lng', lng);
  };

  return (
    <div className="index">
      <div className="welcome">
        <Trans i18nKey="Welcome to React">Welcome to React {{ name }}</Trans>
        <Button
          type="primary"
          onClick={() => {
            changeLanguage('zh');
          }}
        >
          {t('toggle')} zh
        </Button>
        -
        <Button
          type="primary"
          onClick={() => {
            changeLanguage('en');
          }}
        >
          {t('toggle')} en
        </Button>
        -
        <Button
          type="primary"
          onClick={() => {
            changeLanguage('fr');
          }}
        >
          {t('toggle')} fr
        </Button>
        -{/* change color */}
        <Button
          type="primary"
          loading={themeLoading}
          onClick={() => {
            setTheme(Cookie.getCookie('theme') == "theme1" ? "theme2" : "theme1");
          }}
        >
          {t('toggle')} theme
        </Button>
      </div>
      <ul className="list">
        {props.news &&
          props.news.map((item: NewsItem) => (
            <li key={item.id}>
              <div>
                {t('title')}: {item.nameEn}
              </div>
              <div className="toDetail">
                <Link to={`/news/${item.id}`}>{t('click to detail')}</Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

Page.getInitialProps = async ctx => {
  // ssr渲染模式只在服务端通过Node获取数据，csr渲染模式只在客户端通过http请求获取数据，getInitialProps方法在整个页面生命周期只会执行一次
  const [err, res] = await APIS.getShelvesList({
    data: {
      page: 1,
      size: 10,
      isCombine: '0',
      productType: '0',
      customizedVersion: '-1',
    },
  });

  if (err || !res) return { news: [] }
  // return { news: res.data.content ?? [] };
};
export default Page;
