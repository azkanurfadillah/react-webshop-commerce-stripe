import React, { useState, useEffect } from 'react'
import { commerce } from './lib/commerce'
import { Navbar, Products, Cart } from './components'

export default function App() {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchProducts = async () => {
        const { data } = await commerce.products.list()
        setProducts(data)
    }

    const fetchCart = async () => {
        const cart = await commerce.cart.retrieve()
        console.log("cart retrieve", cart)
        setCart(cart)
    }

    useEffect(() => {
        fetchProducts()
        fetchCart()
    }, [])


    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity)
        console.log("item", item)
        setCart(item.cart)
    }

    console.log(products)
    console.log("cart", cart)
    return (
        <div>
            <Navbar totalItems={cart.total_items} />
            {/* <Products products={products} onAddToCart={handleAddToCart} /> */}
            <Cart cart={cart} />
        </div>
    )
}
