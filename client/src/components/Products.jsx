import React, { useState, useEffect} from 'react'
import styled from 'styled-components'
import ProductCard from './ProductCard'
import axios from 'axios';

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-flow: column;
   
`

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    @media (max-width: 400px){
      justify-content: center;
    }
    gap: 25px;
`


const Heading = styled.h1.attrs(props => ({
  id: props.name
}))`
    font-size: 20px;
    padding: 20px 0;
    font-size: 35px;
`


const Products = (props) => {

  const [products, setProducts] = useState([]);

  const category = props.heading;

  const getproducts = async () => {

    const { data } = await axios.get(`https://dummyjson.com/products/category/${category}`);
    setProducts(data.products);

  }
 
  useEffect(() => {
    getproducts();
  }, [])

  return (
    <Wrapper id="temp">
      <Heading name={props.heading}>{props.heading}</Heading>
      <Container>

        {
          products.map((elem, index) => {
            if (elem.price <= props.filterPrice) {

              return (
                <ProductCard elem={elem} key={index}></ProductCard>
              )
            }
          })
        }

      </Container>
    </Wrapper>
  )
}

export default Products