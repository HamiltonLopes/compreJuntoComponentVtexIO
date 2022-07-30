/* eslint-disable */
import React from 'react'
import Product from './Product'
import Styles from './Suggestions.module.css'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import productsByIdentifier from './queries/productByIdentifier.graphql'

function Suggestions() {
  const productContext: any = useProduct()
  const melhoresCombinacoes = [54, 23, 6]

  const { data } = useQuery(productsByIdentifier, {
    variables: { field: 'id', values: melhoresCombinacoes },
  })

  console.log(data)

  const product = {
    id: productContext.product.productId,
    name: productContext.product.productName,
    price: productContext.product.items[0].sellers[0].commertialOffer.Price,
    image: productContext.product.items[0].images[0].imageUrl,
    info: `Em até 3x R$${productContext.product.items[0].sellers[0].commertialOffer.Installments[2].Value}, ${productContext.product.items[0].sellers[0].commertialOffer.Installments[2].InterestRate}% de juros.`,
    skus: productContext.product.items,
  }

  const teste = {
    image: `https://blog.calcadonet.com.br/wp-content/uploads/2021/02/estilos-de-roupa-retro.jpg`,
    name: `Calça boca de sino`,
    price: `300`,
    id: 1030,
    info: `Em até 3x R$100,00, 0% de juros.`,
    skus: [0],
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
