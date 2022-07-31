/* eslint-disable */
import React, { useState } from 'react'
import Styles from './Product.module.css'

interface propObject {
  product: any
}

interface sku {
  btnId: any
  image: string
  price: any
  info: string
}

function Product(product: propObject) {
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
      price: createMask(
        product.product.items[index].sellers[0].commertialOffer.Price
      ),
      image: product.product.items[index].images[0].imageUrl,
      info: `Em até 3x ${createMask(
        product.product.items[index].sellers[0].commertialOffer.Installments[2]
          .Value
      )}, ${
        product.product.items[index].sellers[0].commertialOffer.Installments[2]
          .InterestRate
      }% de juros.`,
    }
  }

  const [activeSku, setActiveSku] = useState<sku>(skuMount(0, null))

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
      <div>{product.product.productName}</div>
      <div>{`${activeSku.price}`}</div>
      <div>{`${activeSku.info}`}</div>
      {product.product.items.length > 1 &&
        product.product.items.map((sku: any, index: number) => (
          <button
            id={`button${index}`}
            type="button"
            key={index}
            onClick={(e: any) => handleChangeSku(index, e)}
          >
            {sku.name}
          </button>
        ))}
    </div>
  )
}

export default Product
