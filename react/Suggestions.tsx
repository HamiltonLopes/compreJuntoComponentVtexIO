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
  console.log(productContext)

  return (
    <div className={Styles.Wrapper}>
      <div className={Styles.Title}>Sugestao de Compra</div>
      <div className={Styles.Container}>
        <Product {...productContext} />
        +
        <Product {...productContext} />= something
      </div>
    </div>
  )
}

export default Suggestions
