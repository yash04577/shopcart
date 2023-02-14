import React from 'react'
import styled from 'styled-components'
import banner from "../images/banner4.jpg"


const Wrapper = styled.div`
    width: 100%;
    height: 50vh;
    margin: 10px 0;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
`

const Banner = () => {
  return (
   <Wrapper>
        <Image src={banner}></Image>
   </Wrapper>
  )
}

export default Banner