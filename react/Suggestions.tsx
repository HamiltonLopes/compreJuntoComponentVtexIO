/* eslint-disable */
import React, { useState } from 'react'
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

// interface Props {
//   title?: string
//   BuyButton: React.ComponentType
// }

const CSS_HANDLES = [
  'buyTogetherContainer',
  'buyTogetherTitleContainer',
  'buyTogetherTitle',
  'totalValue',
]

function Suggestions () {
  const handles = useCssHandles(CSS_HANDLES)
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
          <Product {...productContext.product} />
          <div className="self-center ma5">
            <IconPlusLines size={20} />
          </div>
          <Product {...data.productsByIdentifier[activeProductIndex]} />
          <div className="self-center ma5">
            <IconEqual />
          </div>
          <div className="w-100 mh2 mh6-l w-20-l self-center">
            <div className="mb5">
            <FormattedMessage {...messages.totalProducts} />
            </div>
            <div className={`mv5 ${handles.totalValue}`}>
            <FormattedCurrency value={300} />
            </div>
            <Button>Adicionar ao Carrinho</Button>
          </div>
        </div>
      </div>
    )
  )
}

export default Suggestions
