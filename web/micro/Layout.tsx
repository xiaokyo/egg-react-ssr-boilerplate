import React, { FC } from 'react'
import LeftBar from './LeftBar'
import './index.less'
import useTheme from '@/hooks/useTheme';

const MicroLayout: FC<any> = props => {
  useTheme()
  return (
    <div className="sass-layout">
      <LeftBar />
      <div className="sass-layout-content" id="manage-app" />
    </div>
  );
};

export default MicroLayout;
