import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Banner from '../components/Banner'
import Products from '../components/Products'
import SearchedProducts from '../components/SearchedProducts'
import Context from '../context/Context'


const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`

const Container = styled.div`
    width: 70%;
    margin: 0 auto;
    margin-left: 20rem;
`


const SidebarWrapper = styled.div`
    width: 14rem;
    height: 100vh;
    background-color: ghostwhite;
    position: fixed;
    top: 60px;
`


const NavLinks = styled.div`
    display: flex;
    flex-flow: column;
    list-style: none;
    align-items: center;
    gap: 10px;
    padding-top: 30px;
`

const NavLink = styled.a`
   
    text-decoration: none;
    color: black;
    position: relative;
    font-size: large;
    &:hover{
        color:teal;
      }

`

const Heading = styled.h3`
  text-align: center;
`



const PriceFilterContainer = styled.div`
    display: flex;
    flex-flow: column;
    list-style: none;
    align-items: center;
    gap: 10px;
    padding-top: 40px;

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

  const context = useContext(Context);
  const [fprice, setFprice] = useState(10000);


  const check = () => {

    setFprice(document.getElementById("priceFilter").value);

  }



  const authHandler = async () => {
    // e.preventDefault();

    try {

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
      context.updateUser(response.user);
     
      if (response.message === "login with token sucessfully") {
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