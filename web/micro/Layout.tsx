import React, { FC } from 'react'
import LeftBar from './LeftBar'

import '@/assets/common.less'
import './index.less'

const MicroLayout: FC<any> = (props) => {
    return (
        <div className='sass-layout'>
            <LeftBar />
            <div className="sass-layout-content" id="manage-app" />
        </div>
    )
}

export default MicroLayout