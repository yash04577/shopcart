import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Context from '../context/Context'
import emptyCartImg from "../images/emptyCart.jpg"
import { useNavigate, Link } from 'react-router-dom';

const Wrapper = styled.div`
    width: 100vw;
    height: 90vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gainsboro;
`

const Container = styled.div`
    width: 90%;
    height: 90%;
    display: flex;
    box-shadow: 0 0 5px gray;
`

const CartContainer = styled.div`
  
    flex: 2;
    overflow: auto;
    background-color: #fff;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    position: relative;
   
`

const SummaryContainer = styled.div`
    flex: 1;
`

const Title = styled.h1`
    padding: 20px;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: ghostwhite;
`

const Item = styled.div`
    border-top: 1px solid gainsboro;
    border-bottom: 1px solid gainsboro;
    display: flex;
    margin-bottom: 10px;
    padding: 15px;

    &:hover{
        
        background-color: #9ca1a1;
    }
`

const ImageContainer = styled.div`
    width: 100px;
    height: 75px;
    margin-left: 20px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
`
const ItemNameContainer = styled.div`
    
    display: flex;
    align-items: center;
    flex: 3;
`

const ItemName = styled.h4`
    padding-left: 20px;
`

const CountContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: x-large;

    button{
        width: 30px;
        height: 25px;
        background: transparent;
        border: none;
        font-size: large;
        cursor:pointer;

        &:hover{
            transform: scale(1.2);
        }

        &:active{
            color:rebeccapurple;
        }
    }
`

const PriceContainer = styled.div`
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: x-large;
`

const RemoveBtnContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.5;

    button{
        padding: 25px 20px;
        background-color: transparent;
        font-size: large;
        border: none;
        &:hover{
            background-color: red;
            color: white;
        }
    }
`


const SummaryTitle = styled.h1`
    padding: 20px;
`

const ItemsCountContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const CountItems = styled.h3`
    padding: 20px;
`

const ShippingContainer = styled.div`
    display: flex;
    flex-flow: column;
    /* border: 2px solid black; */
`

const ShippingHeading = styled.h3`
    padding: 20px;
`

const ShippingPrice = styled.h3`
    padding: 0 20px;
`

const DiscountContainer = styled.div`
    display: flex;
    flex-flow: column;
    
    h3{
        padding: 20px;
    }

    input{
        padding: 0 20px;
        width: 90%;
        height: 40px;
        align-self: center;
        font-size: large;
    }
`


const TotalContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 2px solid black; */
`

const TotalHeading = styled.h3`
    padding: 20px;
`

const TotalPrice = styled.h3`
    padding: 0 20px;
`

const CheckoutContainer = styled.div`
    display: flex;
    justify-content: center;


    button{
        background-color: black;
        color: white;
        width: 90%;
        height: 50px;
        font-size: larger;
        border: none;

        &:hover{
            background-color: teal; 
        }
    }
`

const BgContainer = styled.div.attrs({
    id: "cartBgContainer"
})`
    position: absolute;;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    overflow: hidden;
`

const BgImg = styled.img`
    width: 100%; 
    height: 100%; 
`

const Cart = () => {

    const context = useContext(Context);
    const [promoCode, setPromoCode] = useState("");
    const navigate = useNavigate();


    // let totalPrice = 0;

    const removeHandler = (item) => {
        context.removeFromCart(item);
    }

    const test = () => {
        if (context.getCartItem().length == 0) {
            // console.log("cart is empty")
            document.getElementById("cartBgContainer").style.zIndex = 1;
        }

        else {
            document.getElementById("cartBgContainer").style.zIndex = -1;

        }
    }


    const incrementItem = (item) => {
        context.updateCartItems(item);
    }

    const decrementItem = (item) => {

        if (item.quantity > 1) {
            context.removePrice(item.price);
        }
        const check = item.quantity > 1 ? item.quantity-- : 1


    }


    const promoChangeHandler = () => {
        setPromoCode(document.getElementById("promo").value);

    }

    let id = "";

    const manageOrder = async () => {

        const items = await context.getCartItem();
        const myObj = Object.assign({}, items)
        // const res = await fetch('/updateorder', {
        const res = await fetch('https://api-shopcart.onrender.com/updateorder', {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({

                id: id,
                payload: myObj
            })

        })

        const responsee = await res.json();
        // console.log("res ", responsee);

    }



    const checkoutHandler = () => {

        const authHandler = async () => {

            const res = await fetch('https://api-shopcart.onrender.com/auth', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    token: localStorage.getItem("jwt")
                })

            })

            const response = await res.json();

            if (response.message === "login with token sucessfully") {

                id = response.user._id;
                manageOrder();
                window.alert("thanks for shopping")
                context.refresCart();
                navigate('/');
            }

        }
        authHandler();

    }




    useEffect(() => {
        test();
    })


    return (
        <Wrapper>
            <Container>
                <CartContainer>
                    <Title>Shopping Cart</Title>
                    <BgContainer>
                        <BgImg src={emptyCartImg}></BgImg>
                    </BgContainer>
                    {

                        context.getCartItem().map((item, index) => {

                            return (

                                <Item key={index}>
                                    <ImageContainer>
                                        <Image src={item.thumbnail}></Image>
                                    </ImageContainer>
                                    <ItemNameContainer>
                                        <ItemName>{item.title}</ItemName>
                                    </ItemNameContainer>
                                    <CountContainer>
                                        <button onClick={() => incrementItem(item)}>+</button>
                                        {item.quantity}
                                        <button onClick={() => decrementItem(item)}>-</button>
                                    </CountContainer>
                                    <PriceContainer>{item.price}$</PriceContainer>
                                    <RemoveBtnContainer>
                                        <button onClick={() => removeHandler(item)}>X</button>
                                    </RemoveBtnContainer>
                                </Item>
                            )
                        })
                    }
                </CartContainer>
                <SummaryContainer>
                    <SummaryTitle>Summary</SummaryTitle>
                    <hr />
                    <ItemsCountContainer>
                        <CountItems>ITEMS {context.getCartItem().length}</CountItems>
                        <CountItems>{context.getCartItemsPrice()}$</CountItems>
                    </ItemsCountContainer>
                    <ShippingContainer>
                        <ShippingHeading>SHIPPING</ShippingHeading>
                        <ShippingPrice>Standard-Delivery 5$</ShippingPrice>
                    </ShippingContainer>
                    <DiscountContainer>
                        <h3 >PROMO CODE</h3>
                        <input placeholder="Enter Your Code Here" value={promoCode} id="promo" onChange={promoChangeHandler}></input>
                    </DiscountContainer>
                    <br />
                    <br />
                    <hr />
                    <TotalContainer>
                        <TotalHeading>TOTAL PRICE</TotalHeading>
                        <TotalPrice>{context.getCartItemsPrice() + 5}$</TotalPrice>
                    </TotalContainer>
                    <CheckoutContainer>
                        <button onClick={checkoutHandler}>CHECKOUT</button>
                    </CheckoutContainer>
                </SummaryContainer>
            </Container>
        </Wrapper>
    )
}

export default Cart