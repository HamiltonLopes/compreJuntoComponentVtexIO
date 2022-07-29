/* eslint-disable */
import React from 'react'
import Product from './Product'
import Styles from './Suggestions.module.css'

function Suggestions() {
  return (
    <div className={Styles.Wrapper}>
      <div className={Styles.Title}>Sugestao de Compra</div>
      <div className={Styles.Container}>
        <Product />
        +
        <Product />= something
      </div>
    </div>
  )
}

export default Suggestions
