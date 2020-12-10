import React from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

const pushPath = (path: string) =>
  history.pushState(null, `${path}`, `${path}`);

export default () => {
  const { t } = useTranslation();
  const { push } = useHistory()

  function handleClick(e: any) {
    console.log('click', e);
    if (e.key.startsWith('/manage')) {
      pushPath(e.key);
    } else {
      push(e.key)
    }
  }

  return (
    <div className="sass-layout-left">
      <Menu onClick={handleClick} style={{ width: '100%' }} mode="vertical">
        <Menu.Item key="/manage/commodity/onTheShelf">商品</Menu.Item>
        <Menu.Item key="/manage/service/posts">客服</Menu.Item>
        <Menu.Item key="/productList">{t('ProductList')}</Menu.Item>
        <Menu.Item key="/productDetail">{t('ProductDetail')}</Menu.Item>
        <Menu.Item key="/">{t('Home')}</Menu.Item>
        <Menu.Item key="/login">{t('Login')}</Menu.Item>
      </Menu>
    </div>
  );
};
