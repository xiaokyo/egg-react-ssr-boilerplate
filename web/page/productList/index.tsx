import React from 'react'
import requireComponents from '../../customComponents'
import customComponents from './customComponents'

import "./index.less"
interface IProps {
  jsonConfig: any
}

const ProductList: SFC<IProps> = ({ jsonConfig }: any) => {
  if (!jsonConfig) return <>loading...</>
  console.log('render ProductList')
  const { content: rows = [], width = 1200 } = jsonConfig
  return (
    <div className="custom-product-list" style={{ width }}>
      {
        rows.map(({ content = [] }: any, index: number) => {
          const sumGrow = content
            .map((_: any) => _.grow)
            .reduce((total: number, num: number) => total + num) // 单行布局总列数
          return (
            <div style={{ display: 'flex' }} key={index}>
              {
                content.map(({ grow, min, content: components }: any, layoutIndex: number) => {
                  let width = ((grow / sumGrow) * 100).toFixed(2) + '%'; // 计算出列的宽度
                  return (
                    <div key={layoutIndex} style={{ minWidth: min + 'px', width }}>
                      {
                        components.map(({ type, id, ...store }: any, componentIndex: number) => {
                          // @ts-ignore
                          const C = requireComponents[id]()
                          return (
                            <C key={componentIndex} store={store}></C>
                          )
                        })
                      }
                    </div>
                  )
                })
              }
            </div>
          )
        })
      }
    </div>
  )
}

ProductList.getInitialProps = async (ctx) => {
  console.log('Product List getInitialProps')
  return Promise.resolve({ jsonConfig: customComponents })
}

export default ProductList
