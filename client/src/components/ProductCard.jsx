import React, { useContext } from 'react'
import styled from 'styled-components'
import {Link, useNavigate} from "react-router-dom"
import Context from '../context/Context'

const Wrapper = styled.div.attrs({
    className:"productCardWrapper"
})`
    width: 300px;
    height: 320px;

    &:hover{
        transition: 0.3s;
        scale: 1.1;
    }

`

const ImageContainer = styled.div.attrs({
    className:"productCardImgContainer"
})`
    width: 90%;
    height: 60%;
    margin: 10px auto;


`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;

`

const Title = styled.h3`
    margin-left: 15px;
    max-height: 25px;
    overflow: hidden;
`

const Price = styled.h4`
    margin-left: 15pt;
`

const ButtonContainer = styled.div`
    display: flex;

    button{
        width: 90%;
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
`

const ListViewContainer = styled.div`
    flex: 1;
`

const DescriptionContainer = styled.p.attrs({
    className:"productCardPara"
})`
    display: none;
    padding: 1rem;
`

const ProductCard = (props) => {
    
    const navigate = useNavigate();
    // console.log("elem ", props.elem)
    const context = useContext(Context);

    const showMoreHandler = (elem) =>{
        context.updateSingleProduct(elem);
        navigate("/singleproduct")
    }

    const cartHandler = (elem) =>{
        context.updateCartItems(elem);
    }

  return (

    <Wrapper>
        <ImageContainer onClick={()=>showMoreHandler(props.elem)}>
            <Image src={props.elem.thumbnail}></Image>
        </ImageContainer>
        <ListViewContainer>
            <Title>{props.elem.title}</Title>
            <Price>{props.elem.price}$</Price>
            <DescriptionContainer>
                {props.elem.description}
            </DescriptionContainer>
            <ButtonContainer>
                <button onClick={()=>{cartHandler(props.elem)}}>Add to Cart</button>
            </ButtonContainer>
        </ListViewContainer>
    </Wrapper>
  )
}

export default ProductCard