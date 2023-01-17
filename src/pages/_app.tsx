import Image from 'next/image'
import Link from 'next/link'
import type { AppProps } from 'next/app'

import * as S from '@/styles/pages/app'
import { globalStyles } from '@/styles/global'

import logoImg from '@/assets/logo.svg'

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <S.Container>
      <S.Header>
        <Link href="/">
          <Image src={logoImg} alt="" />
        </Link>
      </S.Header>
      <Component {...pageProps} />
    </S.Container>
  )
}
