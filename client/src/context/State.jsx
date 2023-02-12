import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react'
import Context from './Context';




const State = (props) => {
    const [allProducts, setAllProducts] = useState([]);
    const [singleProduct, setSingleProduct] = useState({});
    const[cartItems, setCartItems] = useState([]);
    const [cartItemsPrice, setCartItemsPrice] = useState(0);
    const [user, setUser] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);

    const[searchItem, setSearchItem] = useState([]);

    const getAllProduct = () =>{
        return allProducts;
    }

    const getData = async () =>{
        const {data} = await axios.get("https://dummyjson.com/products")
        // const {data} = await axios.get("https://dummyjson.com/products/category/smartphones")
        // console.log(data.products);
        setAllProducts(data.products)
    }


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

            console.log("quantity ",item.quantity)

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
        // console.log("test = ", data.products[0])
        // console.log("query = ", query)
        // context.updateSingleProduct(data.products[0]);

        // console.log("len = ", data.products.length)
        if(data.products.length > 0){
            // navigate("/singleproduct")

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

    useEffect(()=>{
        getData();
    })

  return (
    <Context.Provider value={{getAllProduct, getSingleProduct, updateSingleProduct, getCartItem, updateCartItems, removeFromCart, getCartItemsPrice, getSearchItem, updateSearchItem, removePrice, getBadgeCount, getUser, updateUser, getLoggedIn, updateLoggedIn}}>
        {props.children}
    </Context.Provider>
  )
}

export default State