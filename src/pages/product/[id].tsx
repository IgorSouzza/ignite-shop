import Stripe from 'stripe'
import Image from 'next/image'
import { GetStaticPaths, GetStaticProps } from 'next'

import { stripe } from '@/lib/stripe'
import { priceFormatter } from '@/utils/formatter'

import * as S from '@/styles/pages/product'

type ProductProps = {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
  }
}

export default function Product({ product }: ProductProps) {
  return (
    <S.ProductContainer>
      <S.ImageContainer>
        <Image src={product.imageUrl} width={520} height={480} alt="" />
      </S.ImageContainer>
      <S.ProductDetails>
        <h1>{product.name}</h1>
        <span>{product.price}</span>
        <p>{product.description}</p>
        <button>Comprar agora</button>
      </S.ProductDetails>
    </S.ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = String(params?.id)

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        description: product.description,
        imageUrl: product.images[0],
        price: priceFormatter.format(Number(price.unit_amount) / 100),
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}
