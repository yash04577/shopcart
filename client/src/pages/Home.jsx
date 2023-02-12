import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Products from '../components/Products'
import SearchedProducts from '../components/SearchedProducts'
import Context from '../context/Context'


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    /* height: 100vh; */
    /* border: 5px solid rebeccapurple; */
`

const Container = styled.div`
    width: 70%;
    /* height: 100%; */
    margin: 0 auto;
    /* margin-left: 14rem; */
    margin-left: 20rem;
    /* border: 2px solid red; */
`


const SidebarWrapper = styled.div`
    width: 14rem;
    height: 100vh;
    /* border: 2px solid teal; */
    background-color: ghostwhite;
    position: fixed;
    top: 60px;
`


const NavLinks = styled.div`
    display: flex;
    flex-flow: column;
    /* justify-content: space-between; */
    list-style: none;
    align-items: center;
    gap: 10px;
    padding-top: 30px;
    /* text-align: center; */
`

const NavLink = styled.a`
    /* height: 40vh; */
    text-decoration: none;
    color: black;
    position: relative;
    font-size: large;
    &:hover{
        color:teal;
        /* font-weight: bold; */
    }

`

const Heading = styled.h3`
  text-align: center;
`



const PriceFilterContainer = styled.div`
    display: flex;
    flex-flow: column;
    /* justify-content: space-between; */
    list-style: none;
    align-items: center;
    gap: 10px;
    padding-top: 40px;
    /* text-align: center; */

    button{
      width: 60%;
    height: 40px;
    background-color: transparent;
    border-radius: 12px;
    border: 1.5px solid black;
    margin-left: 15px;
    margin-top: 15px;
    cursor: pointer;
    color: white;
    background-color: teal;
    border: none;

    &:active{
        box-shadow: 0 0 6px red;
    }

    &:hover{
        background-color: #0080809e;
        color: black;
    }
  }


  div{
    display:flex;
    justify-content: space-between;
    width:70%;
    label{
      text-transform: uppercase;
    }
  }

  
`

const PriceFilter = styled.input`
  
`


const Home = () => {

  const navigate = useNavigate();
  const context = useContext(Context);

  const clickHandler = () => {
    // navigate(".groceries")
    // to=""
  }


  const viewToggler = () => {

    const wrapper = document.getElementsByClassName("productCardWrapper");
    const imgContainer = document.getElementsByClassName("productCardImgContainer");
    const cardParagraph = document.getElementsByClassName("productCardPara");

    const wrapperArray = Array.from(wrapper);
    const imgContainerArray = Array.from(imgContainer);
    const paragraphArray = Array.from(cardParagraph);


    if (wrapper[0].style.display == "flex") {
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

    else {
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



  }

  const [fprice, setFprice] = useState(10000);

  // let price = 1000;

  const check = () => {

    setFprice(document.getElementById("priceFilter").value);
    // price = document.getElementById("priceFilter").value;

    console.log("price = ", fprice)
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
      // setUserName(response.user.name)
      // console.log("test res ", response.message)
      if (response.message === "login with token sucessfully") {
        // console.log(document.getElementById("username"))
        context.updateLoggedIn(true);
      }
    }

    catch (err) {
      context.updateLoggedIn(true);

    }



  }



  useEffect(()=>{
    authHandler();
  },[])


  return (
    <Wrapper>
      <SidebarWrapper>

        <NavLinks>
          <Heading>Categorie</Heading>
          <NavLink href="#smartphones">smartphones</NavLink>
          <NavLink href="#laptops">laptops</NavLink>
          <NavLink href="#fragrances">fragrances</NavLink>
          <NavLink href="#furniture">furniture</NavLink>
          <NavLink href="#automotive">automotive</NavLink>
          <NavLink href="#groceries">groceries</NavLink>
          <NavLink href="#tops">tops</NavLink>
          <NavLink href="#mens-shoes">mens-shoes</NavLink>
        </NavLinks>

        <PriceFilterContainer>
          <Heading>Filter by Price</Heading>
          <PriceFilter type='range' min="0" max="3000" step="100" name="priceFilter" id="priceFilter" value={fprice} onChange={check}></PriceFilter>
          <div>
            <label htmlFor="priceFilter">min 1$</label>
            <label htmlFor="priceFilter">max 3000$</label>
          </div>
          {/* <button>Clear filter</button> */}
          {/* <button onClick={viewToggler}>List/grid view</button> */}
        </PriceFilterContainer>

      </SidebarWrapper>
      <Container>

        <Banner></Banner>
        <SearchedProducts heading={"Similar items in search"}></SearchedProducts>
        <Products heading={"smartphones"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"laptops"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"fragrances"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"skincare"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"groceries"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"home-decoration"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"furniture"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"tops"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"womens-dresses"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"womens-shoes"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"mens-shirts"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"mens-shoes"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"mens-watches"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"womens-watches"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"womens-bags"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"womens-jewellery"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"sunglasses"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"automotive"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"motorcycle"} filterPrice={fprice}></Products>
        <br />
        <br />
        <Products heading={"lighting"} filterPrice={fprice}></Products>
        <br />
        <br />

      </Container>
    </Wrapper>
  )
}

export default Home