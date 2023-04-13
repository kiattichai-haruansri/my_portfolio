import React from 'react'
import Navbar from './Navbar'
import Head from 'next/head'
import logo from '@/img/profile.jpg'

export default function Layout({children}) {
  return (
    <>
    <Head>
      <title>My Portfolio</title>
      <link rel="icon" type="image/x-icon" href={logo}></link>
    </Head>
    <Navbar/>
    <main>{children}</main>
    </>
  )
}
