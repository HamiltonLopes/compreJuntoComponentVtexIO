/* eslint-disable */
import React from 'react'
import Product from './Product'
import Styles from './Suggestions.module.css'
import { useProduct } from 'vtex.product-context'

function Suggestions() {
  const productContext: any = useProduct()

  const product = {
    id: productContext.product.productId,
    name: productContext.product.productName,
    price: productContext.product.priceRange.sellingPrice.lowPrice,
    image: productContext.product.items[0].images[0].imageUrl,
  }

  const teste = {
    image: `https://blog.calcadonet.com.br/wp-content/uploads/2021/02/estilos-de-roupa-retro.jpg`,
    name: `Calça boca de sino`,
    price: `300`,
    id: 1030,
  }
  console.log(productContext)

  return (
    <div className={Styles.Wrapper}>
      <div className={Styles.Title}>Sugestao de Compra</div>
      <div className={Styles.Container}>
        <Product {...product} />
        +
        <Product {...teste} />= something
      </div>
    </div>
  )
}

export default Suggestions
