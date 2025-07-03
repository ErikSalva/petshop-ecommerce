import React from 'react'
import CategoriesCard from './CategoriesCard'

const FeaturedCategories = () => {
    return (
        <section className="px-2 sm:px-5 md:px-10 lg:px-15 xl:px-20 2xl:px-30">
            <div className='py-10 grid gap-6 w-full'>
                {/* Primera fila: 3 cards pequeñas */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                    <CategoriesCard 
                    image="assets/FeacturedSection/fish.png"
                    title="Accesorios para Peces"
                    subtitle="Alimento fresco disponible"
                    btnText="Comprar"
                    reverse
                    bg="#feb600"
                    link='/shop?category=pez'
                    />
                    <CategoriesCard 
                    image="assets/FeacturedSection/dog-cat.png"
                    title="Novedades"
                    subtitle="Últimos productos disponibles"
                    btnText="Ver todos"
                    reverse
                    bg='#fbecd5'
                    limited
                    link='/shop'
                    />
                    <CategoriesCard 
                    image="assets/FeacturedSection/bird.png"
                    title="Accesorios para Aves"
                    subtitle="El mejor alimento de la ciudad"
                    btnText="Comprar"
                    reverse
                    bg='#f1f5f7'
                    link='/shop?category=ave'
                    />
                </div>

                {/* Segunda fila: 2 cards grandes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                    <CategoriesCard 
                    image="assets/FeacturedSection/gato.jpg"
                    title="Accesorios para Gatos"
                    subtitle="El mejor alimento de la ciudad"
                    btnText="Comprar"
                    big
                    bg="#b8eceb"
                    link='/shop?category=gato'
                    />
                    <CategoriesCard 
                    image="assets/FeacturedSection/dog.jpg"
                    title="Accesorios para Perros"
                    subtitle="El mejor alimento de la ciudad"
                    btnText="Comprar"
                    bg='#f3b700'
                    big
                    link='/shop?category=perro'
                    />
                </div>
            </div>
        </section>
  )
}

export default FeaturedCategories
