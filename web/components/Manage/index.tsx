
import React from 'react'
import LeftBar from '../LeftBar'
import './index.less'

export const getLayoutData = async () => {
  console.log('request layout data')
  return ({ username: 'xiaokyo' })
}
interface IManage {
  username?: any
}

const Manage: SFC<IManage> = ({ children, username }) => {
  return (
    <div className="sass-layout">
      <LeftBar />
      <div className="sass-layout-content">
        {children} {username ?? 'null'}
      </div>
    </div>
  )
}

Manage.getInitialProps = async (ctx) => {
  console.log('Manage getInitialProps')
  if (__isBrowser__) {
    if (Object.keys(window.__LAYOUT_DATA__).length > 0) {
      return window.__LAYOUT_DATA__
    }
  }
  const data = await getLayoutData()
  if (__isBrowser__) {
    window.__LAYOUT_DATA__ = data
  }
  return data
}

export default Manage
