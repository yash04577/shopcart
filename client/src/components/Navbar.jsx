import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom"
import { ShoppingCartOutlined } from '@material-ui/icons'
import { PersonOutlineOutlined } from '@material-ui/icons'
import { SearchOutlined } from '@material-ui/icons'
import { Badge } from '@material-ui/core'
import Context from '../context/Context'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HashScroll } from "react-hash-scroll";
// import { Badge } from '@material-ui/icons'

const Wrapper = styled.div`
    width: 100%;
    height: 10vh;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: ghostwhite;
    /* border: 2px solid red; */
`

const Container = styled.div`
    width: 100%;
    height: 100%;
    /* border: 2px solid black; */
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Logo = styled.div`
    padding: 0 30px;
`

const NavLinks = styled.div`
    display: flex;
    justify-content: space-between;
    list-style: none;
    gap: 30px;
`

const NavLink = styled(Link)`
    text-decoration: none;
    color: black;
    position: relative;

    &:hover{
        color:teal;
        /* font-weight: bold; */
    }

`

const SerachInput = styled.div`
    width: 30vw;
    display: flex;
    position: relative;
`

const CategoriesContainer = styled.div`
    background-color: ghostwhite;
    /* border: 2px solid red; */
    width: 10vw;
    height: 30vh;
    position: absolute;
    left: -50%;
    top: 40px;
    /* right: 0; */
    margin: auto;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 20px;
    display: none;
    transition: 1s;
    
`



const Navbar = () => {


    const context = useContext(Context);
    const [searchQuery, setSearchQuery] = useState("");

    const [userName, setUserName] = useState("");

    const navigate = useNavigate();

    const searchClickHandler = async () => {

        document.getElementById("searchItemsContainer").style.display = "flex";
        await context.updateSearchItem(searchQuery);
        console.log("before")
        navigate("/");
        console.log("before a")
        // useNavigate("")

    }



    const searchChangeHandler = () => {
        const query = document.getElementById('searchInput').value;
        setSearchQuery(query);

    }


    const listViewHandler = () => {
        const wrapper = document.getElementsByClassName("productCardWrapper");
        const imgContainer = document.getElementsByClassName("productCardImgContainer");
        const cardParagraph = document.getElementsByClassName("productCardPara");

        const wrapperArray = Array.from(wrapper);
        const imgContainerArray = Array.from(imgContainer);
        const paragraphArray = Array.from(cardParagraph);


        wrapperArray.forEach(elem => {
            elem.style.display = "block";
            elem.style.width = "300px";
            elem.style.marginLeft = "unset";
        })

        imgContainerArray.forEach(elem => {
            elem.style.height = "60%";
            elem.flex = "1";
            elem.style.width = "90%";
        })

        paragraphArray.forEach(elem => {
            elem.style.display = "none";
        })


    }


    const gridViewHandler = () => {
        const wrapper = document.getElementsByClassName("productCardWrapper");
        const imgContainer = document.getElementsByClassName("productCardImgContainer");
        const cardParagraph = document.getElementsByClassName("productCardPara");

        const wrapperArray = Array.from(wrapper);
        const imgContainerArray = Array.from(imgContainer);
        const paragraphArray = Array.from(cardParagraph);




        wrapperArray.forEach(elem => {
            elem.style.display = "flex";
            elem.style.width = "950px";
            elem.style.height = "250px";
            elem.style.marginLeft = "2rem";
        })

        imgContainerArray.forEach(elem => {
            elem.style.height = "90%";
            elem.flex = "1";
            elem.style.width = "500px";
        })

        paragraphArray.forEach(elem => {
            elem.style.display = "block";
        })

    }



    const authHandler = async () => {
        // e.preventDefault();

        try {

            const res = await fetch('/auth', {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({

                    token: localStorage.getItem("jwt")
                })

            })

            const response = await res.json();
            context.updateUser(response.user);
            // window.alert(response.message);

            // setUser({name:response.user.name, email:response.user.email, number:response.user.number, address:response.user.address})
            
            console.log("test res ", response.message)
            if (response.message === "login with token sucessfully") {
                // console.log(document.getElementById("username"))
                context.updateLoggedIn(true);
            }
        }

        catch (err) {

            context.updateLoggedIn(true);
            
        }

    }   


    const hidden = () =>{
        try{

            if(context.getUser().name !== undefined){
                // console.log("if condition");
                // console.log("icon = ",  document.getElementById("logoutBtn"))
                document.getElementById("logoutBtn").style.display = "block";
                document.getElementById("loginBtn").style.display = "none";
                document.getElementById("username").style.display = "block";
            }
            else{
                document.getElementById("loginBtn").style.display = "block";
                document.getElementById("logoutBtn").style.display = "none";
                // console.log("else condition");
                // console.log("icon = ",  document.getElementById("logoutBtn"))
            }
        }
        
        catch(e){
            // console.log(e)
            document.getElementById("username").style.display = "none";
        }
    }
    
    const setUName = async () =>{
        try{
            setUserName(context.getUser().name);

        }
        catch(e){
            // console.log(e);
        }
    }


    const logoutHandler = () =>{
        localStorage.clear("jwt");
        window.location.reload(true)
    }

    useEffect(() => {
        
        // console.log("un = ", context.getUser().name)
        setUName();
        hidden();
       
    })

    

    return (
        <>
            <Wrapper>

                <Container>
                    <Logo>
                        <NavLink to="/">
                            <h1>ShopCart</h1>
                        </NavLink>
                    </Logo>
                    <NavLinks>
                        <NavLink to="/" >Home</NavLink>
                        <NavLink to="#" onClick={listViewHandler}>Grid view</NavLink>
                        <NavLink to="#" onClick={gridViewHandler}>List view</NavLink>
                        <NavLink to="/contact" >Contact</NavLink>
                        <SerachInput >
                            <input type="text" id='searchInput' value={searchQuery} onChange={searchChangeHandler} style={{ width: "100%", paddingLeft: "10px" }} placeholder="Search Here"></input>
                            <a href="#searchItemsContainer">
                                <SearchOutlined onClick={() => searchClickHandler()} style={{ cursor: "pointer", position: "absolute", right: "0px", marginRight: "7px", top: "2px" }}></SearchOutlined>
                            </a>
                        </SerachInput>
                        <NavLink id='username' to="/user">{userName}</NavLink>
                        <NavLink to="/signup" id="loginBtn"><PersonOutlineOutlined /></NavLink>
                        <NavLink id="logoutBtn" onClick={logoutHandler}>Logout</NavLink>
                        {/* <NavLink to="/login"><PersonOutlineOutlined /></NavLink> */}
                        {/* <Badge badgeContent={context.getCartItem().length} color="primary" style={{ marginRight: "20px" }}> */}
                        <Badge badgeContent={context.getBadgeCount()} color="primary" style={{ marginRight: "20px" }}>
                            <NavLink to="/cart"><ShoppingCartOutlined /></NavLink>
                        </Badge>
                    </NavLinks>
                </Container>
            </Wrapper>
        </>
    )
}

export default Navbar