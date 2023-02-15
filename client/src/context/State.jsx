import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import Context from './Context';




const State = (props) => {
    
    const [singleProduct, setSingleProduct] = useState({});
    const[cartItems, setCartItems] = useState([]);
    const [cartItemsPrice, setCartItemsPrice] = useState(0);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const[searchItem, setSearchItem] = useState([]);

    const getSingleProduct = () =>{
        return singleProduct;
    }

    const updateSingleProduct = (product) =>{
        setSingleProduct(product);
    }

    const getCartItem = ()=>{
        return cartItems;
    }

    const updateCartItems = (item)=>{

        // item.quantity = 1;
        let isPresent = false;

        cartItems.map(citem =>{

            if(citem.title === item.title){
                citem.quantity++;
                isPresent = true;

                let temp = eval(item.price);
                setCartItemsPrice(cartItemsPrice + temp);
            }
        })

        if(!isPresent){
            item.quantity = 1;
            setCartItems((cartItems)=> [...cartItems, item]);
            let temp = eval(item.price);
            setCartItemsPrice(cartItemsPrice + temp);
        }

        
    }

    const removeFromCart = (item) =>{


        setCartItems((cartItems).filter(citem=>citem.title !== item.title))
        let temp = eval(item.price);
        temp *= eval(item.quantity);
        setCartItemsPrice(cartItemsPrice - temp);
    }

    const removePrice = (price) =>{
        const temp = eval(price);
        setCartItemsPrice(cartItemsPrice - temp);
    }

    const getCartItemsPrice = () =>{
        return cartItemsPrice;
    }

    const getSearchItem = () =>{
        return searchItem;
    }

    const updateSearchItem = async (query) =>{
        const {data} = await axios.get(`https://dummyjson.com/products/search?q=${query}`)
        if(data.products.length > 0){
            setSearchItem(data.products);
        }
        else{
            window.alert("product not avilable")
        }
    }


    const getBadgeCount = () =>{
        let badgeCount = 0;

        cartItems.forEach(item =>{
            const temp = eval(item.quantity);
            badgeCount += temp;
        })

        return badgeCount;
    }


    const getUser = () =>{
        return user;
    }

    const updateUser = (userData) =>{
        setUser(userData);
    }

    const getLoggedIn = () =>{
        return loggedIn;
    }

    const updateLoggedIn = (val) =>{
        setLoggedIn(val);
    }

    const refresCart = () =>{
        setCartItems([]);
        setCartItemsPrice(0);
    }


  return (
    <Context.Provider value={{getSingleProduct, updateSingleProduct, getCartItem, updateCartItems, removeFromCart, getCartItemsPrice, getSearchItem, updateSearchItem, removePrice, getBadgeCount, getUser, updateUser, getLoggedIn, updateLoggedIn, refresCart}}>
        {props.children}
    </Context.Provider>
  )
}

export default State