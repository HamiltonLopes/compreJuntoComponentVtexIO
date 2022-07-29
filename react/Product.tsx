/* eslint-disable */
import React from 'react'
import Styles from './Product.module.css'

function Product() {
  let productImage = `https://blog.calcadonet.com.br/wp-content/uploads/2021/02/estilos-de-roupa-retro.jpg`
  let productName = `Calça boca de sino`
  let productPrice = `300`
  let productInfo = `10x of 30`

  return (
    <div className={Styles.Wrapper}>
      <img
        src={productImage}
        alt="girl in a cool jeans"
        width="200"
        height="300"
      />
      <div>{productName}</div>
      <div>{productInfo}</div>
      <div>{`R$ ${productPrice},00`}</div>
    </div>
  )
}

export default Product
