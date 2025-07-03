import React from 'react'
import Hero from '../../components/Hero/Hero'
import FeaturedCategories from '../../components/FeaturedCategories/FeaturedCategories'
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts'
import PromoBanner from '../../components/PromoBanner/PromoBanner'

const Home = () => {
  return (
    <>
    <Hero/>
    <FeaturedCategories/>
    <FeaturedProducts/>
    <PromoBanner/>
         
    </>
  )
}

export default Home