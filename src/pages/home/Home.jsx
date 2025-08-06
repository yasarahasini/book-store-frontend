import React from 'react'
import Banner from './Banner'
import TopSeller from './TopSeller'
import Recommened from './Recommened'
import News from './News'
import Footer from '../../components/Footer'

const Home = () => {
  return (
    <>
    <Banner/>
    <TopSeller/>
    <Recommened/>
    <News/>
    </>
  )
}

export default Home
