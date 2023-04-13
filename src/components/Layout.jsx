import React from 'react'
import Navbar from './Navbar'
import Head from 'next/head'

export default function Layout({children}) {
  return (
    <>
    <Head>
      <title>My Portfolio</title>
      <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
    </Head>
    <Navbar/>
    <main>{children}</main>
    </>
  )
}
