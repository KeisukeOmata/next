import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TypeItem } from '../types/TypeItem'
// import styles from '../styles/components/Detail.module.scss';

type Props = {
  detail: TypeItem
}

const Detail: React.FC<Props> = ({ detail }) => {
  return (
    <>
      <h1>商品詳細</h1>
      <Grid container spacing={1}>
        <Grid item xs={12} lg={6}>
          hoge
        </Grid>
        <Grid item xs={12} lg={6}>
          <div>Brand: {detail.vendor}</div>
          <div>{detail.title}</div>
          <div>Price: ${detail.variants[0].price}</div>
          <div>
            商品情報
            <br />
            {detail.description}
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default Detail
