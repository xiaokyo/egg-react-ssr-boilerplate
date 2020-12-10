import React from 'react';
import { Menu } from 'antd';
import { useTranslation } from 'react-i18next';

const pushPath = (path: string) =>
  history.pushState(null, `/manage${path}`, `/manage${path}`);

export default () => {
  const { t } = useTranslation();

  function handleClick(e: any) {
    console.log('click', e);
    pushPath(e.key);
  }

  return (
    <div className="sass-layout-left">
      <Menu onClick={handleClick} style={{ width: '100%' }} mode="vertical">
        <Menu.Item key="/commodity/onTheShelf">商品</Menu.Item>
        <Menu.Item key="/service/posts">客服</Menu.Item>
        <Menu.Item>{t('Welcome to React')}</Menu.Item>
      </Menu>
    </div>
  );
};
