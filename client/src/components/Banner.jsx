import React from 'react'
import styled from 'styled-components'
import banner from "../images/banner4.jpg"


const Wrapper = styled.div`
    width: 100%;
    height: 50vh;
    /* border: 2px solid black; */
    margin: 10px 0;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    /* object-fit: cover; */
`

const Banner = () => {
  return (
   <Wrapper>
        <Image src={banner}></Image>
   </Wrapper>
  )
}

export default Banner