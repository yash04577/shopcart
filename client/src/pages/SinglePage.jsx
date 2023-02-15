import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Context from '../context/Context'

const Wrapper = styled.div`
    width: 100%;
    height: 80vh; 
     margin-top: 20px;
`

const Container = styled.div`
    display: flex;
    width: 95%;
    height: 100%;
    margin: 0 auto;
    box-shadow: 0 0 4px 2px;
`

const ImageContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 0 auto;
    flex-flow: column;
   
`

const MainImg = styled.div`
    width: 90%;
    height: 60%;
    margin-top: 30px;
  
`
const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`

const MiniImageContainer = styled.div`
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    width: 90%;
    height: 30%;
`


const InformationContainer = styled.div`
    flex: 1;
    height: 100%;
    margin: 0 auto;
    overflow-y: auto;
    box-shadow: 0 0 4px 2px;
`

const Title = styled.h1`
    font-size: 30px;
    padding: 20px;
`

const Description = styled.div`
    padding: 20px;
    margin: 20px;
    background-color: teal;
    color: white;
`

const Price = styled.h2`
    background-color: #ffd17b;
    margin:0 20px;
    padding: 20px;
`

const ButtonContainer = styled.div`
    display: flex;
    padding: 20px;
    gap: 30px;
`

const BuyButton = styled.button`
    width: 130px;
    height: 45px;
    background-color: teal;
    color: white;
    border-radius: 6px;
    border: none;
    cursor: pointer;

    &:active{
        box-shadow: 0 0 6px red;
    }
`

const AddCartButton = styled.button`
    width: 130px;
    height: 45px;
    background-color: #ffd17b;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:active{
        box-shadow: 0 0 6px red;
    }
`

const FreeDeliveryContainer = styled.div`
    padding: 20px;
    background-color: teal;
    color: white;
    margin:0 20px;
`
const ReplaceContainer = styled.div`
    padding: 20px;
    background-color: #ffd17b;
    margin: 20px;
`

const SinglePage = () => {

    const navigate = useNavigate();
    const context = useContext(Context);
    const [product, setProduct] = useState({images:[ "https://i.dummyjson.com/data/products/1/1.jpg", "https://i.dummyjson.com/data/products/1/2.jpg", "https://i.dummyjson.com/data/products/1/3.jpg"]})
    const [mainImagUrl, setMainImageUrl] = useState("");

    const addHandler = (item) =>{
        context.updateCartItems(item);   
    }

    const buyHandler = (item) =>{
        addHandler(item)
        navigate("/cart");
    }


    useEffect(() => {

        setProduct(context.getSingleProduct());
    },[])
    
   

  return (
    <Wrapper>
        <Container>
            <ImageContainer>
                <MainImg>
                    <Image src={mainImagUrl || product.images[0]}></Image> 
                </MainImg>
                <MiniImageContainer>
                    <button>
                        <img src={product.images[0]}  width={"120px"} height={"90px"} onClick={()=>setMainImageUrl(product.images[0])}/>
                    </button>
                    <button>
                        <img src={product.images[1]} alt="" srcset="" width={"120px"} height={"90px"} onClick={()=>setMainImageUrl(product.images[1])}/>
                    </button>
                    <button>
                        <img src={product.images[2]} alt="" srcset="" width={"120px"} height={"90px"} onClick={()=>setMainImageUrl(product.images[2])}/>
                    </button>
                </MiniImageContainer>
            </ImageContainer>
            <InformationContainer>
                <Title>
                    {product.title}
                </Title>
                <Description>
                    {product.description}
                </Description>
                <Price>
                    {product.price}$
                </Price>
                <ButtonContainer>
                    <BuyButton onClick={()=>buyHandler(product)}>Buy Now</BuyButton>
                    <AddCartButton onClick={()=>addHandler(product)}>Add to Cart</AddCartButton>
                </ButtonContainer>
                <FreeDeliveryContainer>
                    Free Delivery Avilable on this Product
                </FreeDeliveryContainer>
                <ReplaceContainer>
                    Free 30 Days, Retuen Policy
                </ReplaceContainer>
            </InformationContainer>
        </Container>
    </Wrapper>
  )
}

export default SinglePage