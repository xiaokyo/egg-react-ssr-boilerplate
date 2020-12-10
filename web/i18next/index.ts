import i18n, { InitOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { Cookie } from '../tools';
import resources from './languages/resources';
import { Context } from 'midway';
import { getServerCookie } from '@/tools/cookie';

const commonOptions: InitOptions = {
  fallbackLng: 'en',
  resources,

  keySeparator: false, // we do not use keys in form messages.welcome

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
};

/**
 * 获取cookie中的语言lng
 */
export const getClientLng = () => Cookie.getCookie('lng') ?? 'en';

/**
 * 获取客户端i18n实例
 */
export const getInitI18nClient = () => {
  const lng = getClientLng();
  i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      ...commonOptions,
      lng,
    });

  return i18n;
};

/**
 * 获取服务端i18n实例
 * @param ctx 服务端上下文
 */
export const getInitI18nServer = (ctx: Context) => {
  const lng = getServerCookie(ctx, 'lng') ?? 'en';

  i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
      ...commonOptions,
      lng,
    });

  return i18n;
};

export default i18n;
