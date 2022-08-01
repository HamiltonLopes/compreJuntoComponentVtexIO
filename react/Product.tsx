/* eslint-disable */
import React, { useState } from 'react'
import Styles from './Product.module.css'

interface sku {
  productId: number
  btnId: any
  image: string
  price: any
  info: string
}

function Product(product: any) {
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
    <div className={Styles.Wrapper}>
      <img className={Styles.image} src={activeSku.image} />
      <div>{product.productName}</div>
      <div>{`${activeSku.price}`}</div>
      <div>{`${activeSku.info}`}</div>
      {product.items.length > 1 &&
        product.items.map((sku: any, index: number) => (
          <button
            id={`button${index}`}
            type="button"
            key={index}
            className={
              sku.sellers[0].commertialOffer.AvailableQuantity > 0
                ? Styles.available
                : Styles.unavailable
            }
            onClick={
              sku.sellers[0].commertialOffer.AvailableQuantity > 0
                ? (e: any) => handleChangeSku(index, e)
                : (e: any) => e.preventDefault()
            }
          >
            {sku.name}
          </button>
        ))}
    </div>
  )
}

export default Product
