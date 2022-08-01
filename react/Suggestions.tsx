/* eslint-disable */
import React, { useState } from 'react'
import Product from './Product'
import Styles from './Suggestions.module.css'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import productsByIdentifier from './queries/productByIdentifier.graphql'

function Suggestions() {
  const productContext: any = useProduct()
  const melhoresCombinacoes = [54, 23, 2]

  const { data } = useQuery(productsByIdentifier, {
    variables: { field: 'id', values: melhoresCombinacoes },
  })
  const [activeProductIndex, setActiveProductIndex] = useState<any>(0)

  console.log(data)
  console.log(productContext)
  const handleChangeProduct = () => {
    setActiveProductIndex((prev: any) => {
      if (prev < melhoresCombinacoes.length - 1) return prev + 1
      else return 0
    })
  }

  return (
    !!data && (
      <div className={Styles.Wrapper}>
        <div className={Styles.Title}>Sugestao de Compra</div>
        <div>
          <button onClick={handleChangeProduct}> Change Product </button>
        </div>
        <div className={Styles.Container}>
          <Product {...productContext.product} />
          +
          <Product {...data.productsByIdentifier[activeProductIndex]} />
          <div>= something</div>
        </div>
      </div>
    )
  )
}

export default Suggestions
