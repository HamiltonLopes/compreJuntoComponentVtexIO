/* eslint-disable */
import React from 'react'
import Styles from './Product.module.css'

interface propObject {
  name: string
  info: string
  image: string
  price: any
  skus: any[]
}

function Product({ name, image, price, info, skus }: propObject) {
  console.log(skus)
  return (
    <div className={Styles.Wrapper}>
      <img src={image} alt="girl in a cool jeans" width="200" height="300" />
      <div>{name}</div>
      <div>{`R$ ${price},00`}</div>
      <div>{`${info}`}</div>
      {skus.map((sku, index) => {
        console.log('passei aqui')
        return (
          <button type="button" key={index}>
            {sku.name}
          </button>
        )
      })}
    </div>
  )
}

export default Product
