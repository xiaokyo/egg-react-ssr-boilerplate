import React from 'react'

const ProductDetail: SFC<any> = ({ name }) => {
  if (!name) return null
  console.log('render ProductDetail')
  return (
    <div>{name.username}</div>
  )
}

ProductDetail.getInitialProps = async (ctx) => {
  console.log('Product Detail getInitialProps')
  return { name: { username: 'Product Detail' } }
}

export default ProductDetail
