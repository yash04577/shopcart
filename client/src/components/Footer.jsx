import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Wrapper = styled.div`

    width: 100%;
    height: 40vh;
    background: #343d68;
    position: relative;

    a{
        color: white;
        text-decoration: none;
        font-size: large;
        font-weight: 300;
        margin: 0 10px;

        &:hover{
            transition: 0.8s;
            color: #e84949;
        }
    }


    ul{
        list-style: none;
    }
`

const LinkContainer = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding-top: 7rem;
`

const FooterName = styled.h1`
    font-size: 5em;
    position: absolute;
    left: 0;
    bottom: 0;
    color: #535c87;
    user-select: none;
    font-weight: 300;
`

const FooterLink = styled(Link)`
     color: white;
        text-decoration: none;
        font-size: large;
        font-weight: 300;
        margin: 0 10px;

        &:hover{
            transition: 0.8s;
            color: #e84949;
        }
`

const Footer = () => {
    return (
        <Wrapper>
            <LinkContainer>
                <ul>
                    <li>
                        <FooterLink to="/">Home</FooterLink>
                        <FooterLink to="/cart">Cart</FooterLink>
                        <FooterLink to="/signup">Sign In</FooterLink>
                    </li>
                </ul>

                <ul>
                    <li>
                        <a href="#"><i class="fa-brands fa-linkedin fa-2xl"></i></a>
                        <a href="#"><i class="fa-brands fa-github fa-2xl"></i></a>
                        <a href="#"><i class="fa-brands fa-twitter fa-2xl"></i></a>
                        <a href="#"><i class="fa-brands fa-instagram fa-2xl"></i></a>
                        <a href="#"><i class="fa-solid fa-envelope fa-2xl"></i></a>
                    </li>
                </ul>
            </LinkContainer>

            <FooterName>Shopcart.com</FooterName>
        </Wrapper>
    )
}

export default Footer