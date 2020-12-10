import React from 'react'

interface IProps {
  content: string
  style?: any
}

const ProductList: SFC<IProps> = ({ content, style }) => {

  return (
    <p style={style}>{content}</p>
  )
}

ProductList.defaultProps = {
  content: "Selected Category"
}


export default ProductList
