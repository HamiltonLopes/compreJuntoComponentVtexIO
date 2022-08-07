/* eslint-disable */
import React, { useState, useEffect } from 'react'
import Product from './Product'
import { useProduct } from 'vtex.product-context'
import { useQuery } from 'react-apollo'
import productsByIdentifier from './queries/productByIdentifier.graphql'

import IconEqual from './icons/IconEqual'
import IconRefresh from './icons/IconRefresh'
import { IconPlusLines, ButtonWithIcon, Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage, defineMessages } from 'react-intl'
import { FormattedCurrency } from 'vtex.format-currency'
import { useOrderItems } from 'vtex.order-items/OrderItems'
import axios from 'axios'

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
  'buyTogetherProductContainer',
  'totalMessage',
  'totalValue',
]

interface itemsInfo {
  id: number
  seller: number
  quantity: number
}

function Suggestions() {
  const handles = useCssHandles(CSS_HANDLES)
  const productContext: any = useProduct()
  const { addItem } = useOrderItems()

  const [melhoresCombinacoes, setMelhoresCombinacoes] = useState<Array<Number>>(
    []
  )

  useEffect((): any => async () => {
    if (melhoresCombinacoes?.length === 0) {
      const response: any = await axios.get(
        `https://hccombinationsapi.tk/combinations-api/v1/combinations-by-id/${productContext.product.productId}`
      )
      console.log('response', response)
      if ((await response?.data?.length) > 0) {
        let newArray = []
        for (let i = response.data.length - 1; i >= 0; i--) {
          newArray.push(+response.data[i])
        }
        setMelhoresCombinacoes(newArray)
      } else {
        setMelhoresCombinacoes([54, 23, 2])
      }
    }
  })

  console.log('melhores comb = ', melhoresCombinacoes)
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
  const [firstItemCartInfo, setFirstItemCartInfo] = useState<itemsInfo>({
    id: productContext.product.items[0].itemId,
    seller: productContext.product.items[0].sellers[0].sellerId,
    quantity: 1,
  })

  const [secondItemCartInfo, setSecondItemCartInfo] = useState<itemsInfo>({
    id: data?.productsByIdentifier[activeProductIndex].items[0].itemId,
    seller:
      data?.productsByIdentifier[activeProductIndex].items[0].sellers[0]
        .sellerId,
    quantity: 1,
  })

  useEffect(() => {
    setSecondItemPrice(
      data?.productsByIdentifier[activeProductIndex].items[0].sellers[0]
        .commertialOffer.Price
    )
    setSecondItemCartInfo({
      id: data?.productsByIdentifier[activeProductIndex].items[0].itemId,
      seller:
        data?.productsByIdentifier[activeProductIndex].items[0].sellers[0]
          .sellerId,
      quantity: 1,
    })
  }, [data, activeProductIndex])

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

  const handleAddCart = () => {
    addItem([firstItemCartInfo, secondItemCartInfo])
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
        <div className={handles.buyTogetherProductContainer}>
          <Product
            product={productContext.product}
            setPrice={setFirstItemPrice}
            setProductInfo={setFirstItemCartInfo}
          />
          <div className="self-center ma5">
            <IconPlusLines size={30} />
          </div>
          <Product
            product={data.productsByIdentifier[activeProductIndex]}
            setPrice={setSecondItemPrice}
            setProductInfo={setSecondItemCartInfo}
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
            <Button onClick={handleAddCart}>Adicionar ao Carrinho</Button>
          </div>
        </div>
      </div>
    )
  )
}

export default Suggestions
