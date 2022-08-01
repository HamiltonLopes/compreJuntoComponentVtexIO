import React, { useState } from 'react'
import Styles from './Product.module.css'
import { Button } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

interface sku {
  productId: number
  btnId: any
  image: string
  price: any
  info: string
}

const CSS_HANDLES = [
  'productName',
  'productPrice',
  'productImage',
  'productImageContainer',
  'productInfo',
  'productButtonUnavailable',
  'productButtonAvailable',
  'productButtonContainer'
]

function Product(product: any) {
  const handles = useCssHandles(CSS_HANDLES)

  const createMask = (num: any) => {
    let value = 'R$ ' + num
    if (value.split('.')[1]) {
      if (value.split('.')[1].length === 1) value += '0'
      value = value.replace('.', ',')
    } else {
      value += ',00'
      value = value.replace('.', '')
    }
    return value
  }

  const skuMount = (index: number, btnId: any) => {
    return {
      btnId,
      productId: product.productId,
      price: createMask(product.items[index].sellers[0].commertialOffer.Price),
      image: product.items[index].images[0].imageUrl,
      info: `Em até ${
        product.items[index].sellers[0].commertialOffer.Installments[2]
          .NumberOfInstallments
      }x ${createMask(
        product.items[index].sellers[0].commertialOffer.Installments[2].Value
      )}, ${
        product.items[index].sellers[0].commertialOffer.Installments[2]
          .InterestRate
      }% de juros.`,
    }
  }

  const [activeSku, setActiveSku] = useState<sku>(skuMount(0, null))

  if (activeSku.productId !== product.productId) {
    setActiveSku(skuMount(0, null))
  }

  const handleChangeSku = (index: number, e: any) => {
    e.preventDefault()
    if (activeSku.btnId !== null)
      document.getElementById(activeSku.btnId)!.classList.remove(Styles.active)
    document.getElementById(e.currentTarget.id)!.classList.add(Styles.active)
    setActiveSku(skuMount(index, e.currentTarget.id))
  }

  return (
    <div className="w-100 w-20-l">
      <div className={`${handles.productImageContainer}`}>
      <img className={`${handles.productImage}`} src={activeSku.image} />
      </div>
      <div className={`${handles.productName}`}>{product.productName}</div>
      <div className={`${handles.productPrice}`}>{`${activeSku.price}`}</div>
      <div className={`${handles.productInfo}`}>{`${activeSku.info}`}</div>
      <div className={`${handles.productButtonContainer}`}>
      {product.items.length > 1 &&
        product.items.map((sku: any, index: number) => (
          <Button variation="primary" size="small"
          id={`button${index}`}
          type="button"
          key={index}
          className={ 
            sku.sellers[0].commertialOffer.AvailableQuantity > 0
            ? handles.productButtonAvailable
            : handles.productButtonUnavailable
          }
          onClick={
            sku.sellers[0].commertialOffer.AvailableQuantity > 0
            ? (e: any) => handleChangeSku(index, e)
            : (e: any) => e.preventDefault()
          }
          >
            {sku.name}
          </Button>
        ))}
        </div>
    </div>
  )
}

export default Product
