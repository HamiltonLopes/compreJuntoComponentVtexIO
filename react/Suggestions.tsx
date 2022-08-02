/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Product from './Product'
import Styles from './Suggestions.module.css'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import productsByIdentifier from './queries/productByIdentifier.graphql'

import IconEqual from './icons/IconEqual'
import IconRefresh from './icons/IconRefresh'
import { IconPlusLines, ButtonWithIcon, Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage, defineMessages } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'

const messages = defineMessages({
  title: {
    id: 'store/shelf.buy-together.title',
    defaultMessage: '',
  },
  totalProducts: {
    id: 'store/shelf.buy-together.total-products.label',
    defaultMessage: '',
  },
  changeLabel: {
    id: 'store/shelf.buy-together.change.label',
    defaultMessage: '',
  },
  removeLabel: {
    id: 'store/shelf.buy-together.remove.label',
    defaultMessage: '',
  },
  addLabel: {
    id: 'store/shelf.buy-together.add.label',
    defaultMessage: '',
  },
})

const CSS_HANDLES = [
  'buyTogetherContainer',
  'buyTogetherTitleContainer',
  'buyTogetherTitle',
  'totalMessage',
  'totalValue',
]

function Suggestions() {
  const handles = useCssHandles(CSS_HANDLES)
  const productContext: any = useProduct()
  const melhoresCombinacoes = [54, 23, 2]

  const { data } = useQuery(productsByIdentifier, {
    variables: { field: 'id', values: melhoresCombinacoes },
  })
  const [activeProductIndex, setActiveProductIndex] = useState<any>(0)
  const [firstItemPrice, setFirstItemPrice] = useState<any>(
    productContext.product.items[0].sellers[0].commertialOffer.Price
  )
  const [secondItemPrice, setSecondItemPrice] = useState<any>(
    data?.productsByIdentifier[activeProductIndex].items[0].sellers[0]
      .commertialOffer.Price | 0
  )

  useEffect(() => {
    console.log('passei!!')
    setSecondItemPrice(
      data?.productsByIdentifier[activeProductIndex].items[0].sellers[0]
        .commertialOffer.Price
    )
  }, [data])

  useEffect(() => {
    setTotalPrice(firstItemPrice + secondItemPrice)
  }, [firstItemPrice, secondItemPrice])

  const [totalPrice, setTotalPrice] = useState<any>(
    firstItemPrice + secondItemPrice
  )

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
      <div className={`flex-none tc ${handles.buyTogetherContainer}`}>
        <div className={`mv4 v-mid ${handles.buyTogetherTitleContainer}`}>
          <span className={`t-heading-3 ${handles.buyTogetherTitle}`}>
            <FormattedMessage {...messages.title} />
          </span>
        </div>
        <div className="tc nowrap mb3">
          <ButtonWithIcon
            icon={<IconRefresh />}
            variation="tertiary"
            onClick={handleChangeProduct}
          >
            <FormattedMessage {...messages.changeLabel} />
          </ButtonWithIcon>
        </div>
        <div className={Styles.Container}>
          <Product
            product={productContext.product}
            setPrice={setFirstItemPrice}
          />
          <div className="self-center ma5">
            <IconPlusLines size={30} />
          </div>
          <Product
            product={data.productsByIdentifier[activeProductIndex]}
            setPrice={setSecondItemPrice}
          />
          <div className="self-center ma5">
            <IconEqual size={25} />
          </div>
          <div className="w-100 mh2 mh6-l w-20-l self-center">
            <div className={`mb5 ${handles.totalMessage}`}>
              <FormattedMessage {...messages.totalProducts} />
            </div>
            <div className={`mv5 ${handles.totalValue}`}>
              <FormattedCurrency value={totalPrice} />
            </div>
            <Button>Adicionar ao Carrinho</Button>
          </div>
        </div>
      </div>
    )
  )
}

export default Suggestions
