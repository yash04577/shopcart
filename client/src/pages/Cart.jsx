import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Context from '../context/Context'
import emptyCartImg from "../images/emptyCart.jpg"
import emptyCartImg2 from "../images/4610092.avif"

const Wrapper = styled.div`
    width: 100vw;
    height: 90vh;
    overflow: hidden;
    /* border: 2px solid red; */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: gainsboro;
`

const Container = styled.div`
    width: 90%;
    height: 90%;
    /* border: 2px solid black; */
    display: flex;
    box-shadow: 0 0 5px gray;
`

const CartContainer = styled.div`
    /* border: 2px solid red; */
    flex: 2;
    overflow: auto;
    background-color: #fff;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
    /* border: 3px solid rebeccapurple; */
    position: relative;
   
`

const SummaryContainer = styled.div`
    /* border: 2px solid black; */
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
        /* background-color: #5de7e7; */
        background-color: #9ca1a1;
        /* background-color: gainsboro; */
    }
`

const ImageContainer = styled.div`
    width: 100px;
    height: 75px;
    /* border: 2px solid black; */
    margin-left: 20px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
`
const ItemNameContainer = styled.div`
    /* border: 2px solid rebeccapurple; */
    display: flex;
    align-items: center;
    flex: 3;
`

const ItemName = styled.h4`
    padding-left: 20px;
`

const CountContainer = styled.div`
    flex: 1;
    /* border: 2px solid black; */
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
    /* border: 2px solid green; */
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
`

const RemoveBtn = styled.button`
    padding: 25px 20px;
    background-color: transparent;
    font-size: large;
    border: none;
    &:hover{
        background-color: red;
        color: white;
    }
`

const SummaryTitle = styled.h1`
    padding: 20px;
`

const ItemsCountContainer = styled.div`
    display: flex;
    /* border: 2px solid red; */
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
    /* border: 2px solid black; */
`

const DiscountHeading = styled.h3`
    padding: 20px;
`

const DiscountInput = styled.input`
    padding: 0 20px;
    width: 90%;
    height: 40px;
    align-self: center;
    font-size: large;
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
`

const CheckOutBtn = styled.button`
    background-color: black;
    color: white;
    width: 90%;
    height: 50px;
    font-size: larger;
    border: none;

    &:hover{
        /* background-color: #1a1717;  */
        /* transition: all 300ms; */
        background-color: teal; 
    }

`

const BgContainer = styled.div.attrs({
    id: "cartBgContainer"
})`
    /* border: 2px solid red; */
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

    const checkoutHandler = () =>{
        window.alert("Thanks for Shopping")
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
                                        <RemoveBtn onClick={() => removeHandler(item)}>X</RemoveBtn>
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
                        <DiscountHeading >PROMO CODE</DiscountHeading>
                        <DiscountInput placeholder="Enter Your Code Here" value={promoCode} id="promo" onChange={promoChangeHandler}></DiscountInput>
                    </DiscountContainer>
                    <br />
                    <br />
                    <hr />
                    <TotalContainer>
                        <TotalHeading>TOTAL PRICE</TotalHeading>
                        <TotalPrice>{context.getCartItemsPrice() + 5}$</TotalPrice>
                        {/* <TotalPrice>{checkPrice()}$</TotalPrice> */}
                    </TotalContainer>
                    <CheckoutContainer>
                        <CheckOutBtn onClick={checkoutHandler}>CHECKOUT</CheckOutBtn>
                    </CheckoutContainer>
                </SummaryContainer>
            </Container>
        </Wrapper>
    )
}

export default Cart