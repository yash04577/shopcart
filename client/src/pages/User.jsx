import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom"
import Context from '../context/Context'
import Footer from '../components/Footer'

const Wrapper = styled.div`
    width: 100vw;
    height: 90vh;
    
`

const UserHeading = styled.div`
    width: 100%;
    height: 30%;
    background-color: #3c406a;
    color: white;

    h1{
        padding: 50px 50px 10px 70px;
    }

    p{
        padding: 0 0 50px 70px;
    }
`

const Container = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
`

const MenuContainer = styled.div`
    box-sizing: border-box;
    flex: 1;
    height: 50%;
    margin: 50px;
    background-color: #dcdcdc;
    display: flex;
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: baseline;

    ul{
       list-style: none;
       display: flex;
       flex-direction: column;
       height: 100%;
       justify-content: space-evenly;
        width: 100%;

        li{

            cursor: pointer;

            a{
                padding-left: 10px;
                text-decoration: none;
                color: black;
                font-size: large;
                font-weight: 500;
            }
            padding: 13px 0;
            &:hover{
                background-color: #fff;
            }
        }

    }
`

const InfoContainer = styled.div`
    flex: 5;
    height: 100%;
    overflow: hidden;
`

const OrderContainer = styled.div`
   
    height: 90%;
    overflow-y: scroll;
    display: none;
`

const UserDataContainer = styled.div`
    height: 90%;
    width: 95%;
    background-color: ghostwhite;
    
    >div{
        
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 2fr;
        grid-template-rows: repeat(5, 70px);
        font-size: large;
        
        div{

            border: 1px solid gray;
            padding: 20px;
        }

    }
    
`

const Order = styled.div`
    width: 99%;
    height: 30%;
    border: 2px solid gainsboro;
    color: white;
    position: relative;
    margin-bottom: 10px;

    h2{
        padding: 30px 0 0 50px;
        color:black;
    }
    
    a{
        color:green;
        text-decoration: none;
        padding: 30px 0 0 50px;
    }
    
    p{
        color:green;
        position: absolute;
        top: 50px;
        right: 300px;
    }
    
`

const ItemContainer = styled.div`
    display: none;
    height: 90%;
    overflow-y: scroll;
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
    /* border: 2px solid green; */
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: x-large;
`


const User = () => {

    const navigate = useNavigate();
    const context = useContext(Context);
    const [user, setUser] = useState({
        _id: "3876867",
        name: "user",
        email: "user email",
        number: "97979",
        address: "iuyiuyiuyi",
        createdAt: "787897",
        orders: []
    });

    const [singleOrder, setSingleOrder] = useState([]);

    const getData = async () => {
        setUser(context.getUser());
    }


    const showProfileHandler = () => {
        document.getElementById("userDataContainer").style.display = "block";
        document.getElementById("oderContainer").style.display = "none";
        document.getElementById("order-text").innerHTML = "Profile";
        
    }
    
    const showOrderHandler = () => {
        
        document.getElementById("userDataContainer").style.display = "none";
        document.getElementById("oderContainer").style.display = "block";
        document.getElementById("order-text").innerHTML = "Order";
        
        
    }
    
    
    const goHome = () => {
        navigate("/")
    }
    
    const goContact = () => {
        navigate("/contact");
    }


    
    const showOrderDetails = (elem) => {
        
        setSingleOrder([])
        
        for (let key in elem) {
            setSingleOrder(singleOrder=>[...singleOrder, elem[key]])
        }
        
        document.getElementById("userDataContainer").style.display = "none";
        document.getElementById("oderContainer").style.display = "none";
        document.getElementById("itemContainerUser").style.display = "block";
        document.getElementById("order-text").innerHTML = "Order Details";

    }


    useEffect(() => {
        getData();
    })

    return (
        <>
            <Wrapper>
                <UserHeading>
                    <h1>{user.name}</h1>
                    <p>{user.address}</p>
                </UserHeading>
                <Container>
                    <MenuContainer>
                        <ul>
                            <li onClick={showProfileHandler}>
                                <Link to="#" >Profile</Link>
                            </li>
                            <li onClick={showOrderHandler}>
                                <Link to="#" >Order</Link>
                            </li>
                            <li onClick={goHome}>
                                <Link to="/">Home</Link>
                            </li>
                            <li onClick={goContact}>
                                <Link to="/">Contact</Link>
                            </li>
                        </ul>
                    </MenuContainer>
                    <InfoContainer>
                        <h2 style={{ margin: "10px" }} id="order-text">Profile</h2>
                        <OrderContainer id="oderContainer">

                            {
                                user.orders.map((elem, index) => {
                                    return (
                                        <Order onClick={()=>showOrderDetails(elem)}>
                                            <h2>order {index}</h2>
                                            <Link to="#">view order</Link>
                                            <p>Shipped on {user.createdAt}</p>
                                        </Order>
                                    )
                                })
                            }
                        </OrderContainer>
                        <UserDataContainer id="userDataContainer">
                            <div>
                                <div>name</div>
                                <div>{user.name}</div>


                                <div>Email</div>
                                <div>{user.email}</div>


                                <div>Phone Number</div>
                                <div>{user.number}</div>


                                <div>Address</div>
                                <div>{user.address}</div>


                                <div>User ID</div>
                                <div>{user._id}</div>


                            </div>
                        </UserDataContainer>
                        <ItemContainer id="itemContainerUser">
                            {

                                
                                singleOrder.map((item, index) => {

                                    return (

                                        <Item key={index}>
                                            <ImageContainer>
                                                <Image src={item.thumbnail}></Image>
                                            </ImageContainer>
                                            <ItemNameContainer>
                                                <ItemName>{item.title}</ItemName>
                                            </ItemNameContainer>
                                            <CountContainer>
                                                {item.quantity}
                                            </CountContainer>
                                            <PriceContainer>{item.price}$</PriceContainer>
                                        </Item>
                                    )
                                })
                            }
                        </ItemContainer>
                    </InfoContainer>
                </Container>
            </Wrapper>
            <br />
            <br />
            <Footer></Footer>
        </>
    )
}

export default User