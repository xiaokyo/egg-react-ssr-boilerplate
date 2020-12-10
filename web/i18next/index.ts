import i18n, { InitOptions } from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from "react-i18next";
import { Cookie } from "../tools";
import resources from './languages/resources'
import { Context } from "midway";

const commonOptions: InitOptions = {
    fallbackLng: 'en',
    resources,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
        escapeValue: false // react already safes from xss
    }
}

export const getInitI18nClient = () => {
    const lng = Cookie.getCookie('lng') ?? 'en'
    i18n
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            ...commonOptions,
            lng,
        });

    return i18n
}

export const getInitI18nServer = (ctx: Context) => {
    const lng = ctx.cookies.get('lng', { encrypt: false, signed: false }) ?? 'en';

    i18n
        .use(Backend)
        .use(LanguageDetector)
        .use(initReactI18next) // passes i18n down to react-i18next
        .init({
            ...commonOptions,
            lng,
        });

    return i18n
}

export default i18n;