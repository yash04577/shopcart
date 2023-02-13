import React,{useContext, useEffect, useState} from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import Context from '../context/Context'
// import Orders from '../components/Orders'

const Wrapper = styled.div`
    width: 100vw;
    height: 90vh;
    /* border: 2px solid red; */
`

const UserHeading = styled.div`
    width: 100%;
    height: 30%;
    /* border: 2px solid black; */
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
    /* border: 2px solid rebeccapurple; */
    display: flex;
`

const MenuContainer = styled.div`
    box-sizing: border-box;
    flex: 1;
    height: 50%;
    /* padding: 50px; */
    margin: 50px;
    /* border: 2px solid red; */
    background-color: #dcdcdc;
    display: flex;
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    /* padding-left: 10px; */

    ul{
       list-style: none;
       display: flex;
       flex-direction: column;
       height: 100%;
       justify-content: space-evenly;
        width: 100%;

        li{
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
    /* width: 100%; */
    height: 100%;
    /* border: 5px solid green; */
`

const OrderContainer = styled.div`
    /* border:5px solid black; */
    height: 90%;
    overflow-y: scroll;
`

const Order = styled.div`
    width: 100%;
    height: 30%;
    /* border: 2px solid block; */
    /* background-color: black; */
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

const User = () => {

    const context = useContext(Context);
    const [user, setUser] = useState({
        _id:"3876867",
        name:"user",
        email:"user email",
        number:"97979",
        address:"iuyiuyiuyi",
        createdAt:"787897",
        orders:[]
    });

    const getData = async() =>{
        setUser(context.getUser());
        // console.log("user ", user)
    }

    useEffect(()=>{
        getData();
    })

    return (
        <Wrapper>
            <UserHeading>
                <h1>{user.name}</h1>
                <p>{user.address}</p>
            </UserHeading>
            <Container>
                <MenuContainer>
                    <ul>
                        <li>
                            <Link to="#">Profile</Link>
                        </li>
                        <li>
                            <Link to="#">Order</Link>
                        </li>
                        <li>
                            <Link to="#">Payment</Link>
                        </li>
                        <li>
                            <Link to="#">Whishlist</Link>
                        </li>
                    </ul>
                </MenuContainer>
                <InfoContainer>
                    <h2 style={{margin:"10px"}}>Orders</h2>
                    <OrderContainer>

                        {
                            user.orders.map((elem, index)=>{
                                return(
                                    <Order>
                                        <h2>order {index}</h2>
                                        <Link to="#">view order</Link>
                                        <p>Shipped on {user.createdAt}</p>
                                    </Order>
                                )
                            })
                        }

                        
                        {/* <Order>
                            <h2>order 123232</h2>
                            <Link to="#">view order</Link>
                            <p>Shipped on 23/2/2023</p>
                        </Order>
                        <Order>
                            <h2>order 123232</h2>
                            <Link to="#">view order</Link>
                            <p>Shipped on 23/2/2023</p>
                        </Order>
                        <Order>
                            <h2>order 123232</h2>
                            <Link to="#">view order</Link>
                            <p>Shipped on 23/2/2023</p>
                        </Order> */}
                    </OrderContainer>
                </InfoContainer>
            </Container>
        </Wrapper>
    )
}

export default User