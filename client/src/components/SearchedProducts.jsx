import React, {useContext} from 'react'
import styled from 'styled-components'
import Context from '../context/Context'
import ProductCard from './ProductCard'

const Wrapper = styled.div.attrs({
    id:'searchItemsContainer'
})`
    width: 100%;
    display: flex;
    flex-flow: column;
    display: none;
    /* border: 2px solid gold; */
`

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: space-around; */
    @media (max-width: 400px){
      justify-content: center;
    }
    gap: 25px;
`


const Heading = styled.h1.attrs(props => ({
  id:props.name
}))`
    font-size: 20px;
    padding: 20px 0;
    font-size: 35px;
`


const SearchedProducts = (props) => {

  const category = props.heading;
  const context = useContext(Context);


  return (
    <Wrapper id="temp">
        <Heading name={props.heading}>{props.heading}</Heading>
        <Container>

        {
          context.getSearchItem().map((elem, index)=>{
            return(
              <ProductCard elem={elem} key={index}></ProductCard>
            )
          })
        }
        </Container>
    </Wrapper>
  )
}

export default SearchedProducts