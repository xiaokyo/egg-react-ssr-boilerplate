/**
 * @description 微前端主框架启动入口
 * @author zhengwenjian
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun';
import apps from './apps';
import { getInitI18nClient } from '../i18next'
import MicroLayout from './Layout';

getInitI18nClient()

const MicroApp = (props: any) => {
    return (
        <MicroLayout {...props} />
    )
}

const renderMicroApp = ({ loading }: any) => {
    ReactDOM.render(<MicroApp loading={loading} />, document.getElementById('micro-app'))
}

renderMicroApp({ loading: true })

const loader = (loading: boolean) => renderMicroApp({ loading });

const microApps = apps.map(name => ({
    name,
    entry: `/managePublic/${name}/index.html`,
    container: '#manage-app',
    loader,
    activeRule: `/manage/${name}`
}))

registerMicroApps([...microApps]);

setDefaultMountApp('/manage/commodity/onTheShelf')

start({ prefetch: false });

runAfterFirstMounted(() => {
    console.log('[MainApp] first app mounted');
});