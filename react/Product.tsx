/* eslint-disable */
import React from 'react'
import Styles from './Product.module.css'

interface propObject {
  name: string
  id: number
  image: string
  price: any
}

function Product({ name, image, price, id }: propObject) {
  return (
    <div className={Styles.Wrapper}>
      <img src={image} alt="girl in a cool jeans" width="200" height="300" />
      <div>{name}</div>
      <div>{`ProductId: ${id}`}</div>
      <div>{`R$ ${price},00`}</div>
    </div>
  )
}

export default Product
