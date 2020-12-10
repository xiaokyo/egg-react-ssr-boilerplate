import React from 'react'

import s from './index.module.less'

interface IProps {
  store: {
    layout: "Vertical" | "Horizontal",
    title: string
    products: any[]
  }
}

const ProductList: SFC<IProps> = ({ store }) => {
  const { layout, title, products } = store

  return (
    <div className={`${s['product-box']} ${s[layout]}`}>
      <p className={s['title']}>{title}</p>
      <div className={s['product-list']}>
        {products.map((_, index) => (<img key={index} src={_.img} />))}
      </div>
    </div>
  )
}

ProductList.defaultProps = {
  store: {
    layout: "Horizontal",
    title: 'Find Product',
    products: [
      {
        "img": "https://imgcdn.91pic.org/img/poster/20b7d5667ac37b95.jpg"
      },
      {
        "img": "https://imgcdn.91pic.org/img/poster/20b7d5667ac37b95.jpg"
      },
      {
        "img": "https://imgcdn.91pic.org/img/poster/20b7d5667ac37b95.jpg"
      },
      {
        "img": "https://imgcdn.91pic.org/img/poster/20b7d5667ac37b95.jpg"
      },
      {
        "img": "https://imgcdn.91pic.org/img/poster/20b7d5667ac37b95.jpg"
      },
      {
        "img": "https://imgcdn.91pic.org/img/poster/20b7d5667ac37b95.jpg"
      },
    ]
  }
}

export default ProductList
