import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Context } from 'midway';
import './index.less';
import { useTranslation } from 'react-i18next';
import APIS from './service';
import { Link } from 'react-router-dom';

interface Props {
  detail: {
    description?: string;
    nameEn?: string;
  };
}
const News: SFC<Props> = (props: Props) => {
  const { t } = useTranslation();
  return (
    <div className="news-container">
      <p>
        <Link to="/">{t('back')}</Link>
      </p>
      <h2>{props.detail?.nameEn}</h2>
      {t('details')}:{' '}
      <div
        style={{ wordBreak: 'break-word' }}
        dangerouslySetInnerHTML={{ __html: props.detail?.description ?? '' }}
      ></div>
    </div>
  );
};

News.getInitialProps = async ctx => {
  const newsId = __isBrowser__
    ? (ctx as RouteComponentProps<{ id: string }>).match.params.id
    : (ctx as Context).request.path.split('/')[2];
  const [_, res] = await APIS.getDetail({ data: { id: newsId } });
  return {
    detail: res.data,
  };
};

export default News;
