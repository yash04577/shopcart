import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import Footer from '../components/Footer'


const Wrapper = styled.div`
  width: 100%;
  padding-bottom: 1rem;
  background-color: rgb(231, 231, 231);
`

const ContactContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  h1{
    padding-top: 2rem;
    font-size: 5em;
    color: #e84949;
    margin-bottom: 10px;
  }

  h2{
    font-size: 3rem;
    text-transform: capitalize;
    color: #343d68aa;
  }
`

const FormContainer = styled.div`
  width: 70%;
  margin: 5rem auto;

  input{
    width: 100%;
    height: 50px;
    margin: 15px 0;
    padding: 0 20px;
    box-shadow: 2px 2px 10px #1f1f1f;
    font-size: large;
    font-weight: 300;
    border-radius: 5px;
  }

  textarea{
    width: 100%;
    padding: 10px 20px;
    margin-top: 15px;
    font-size: large;
    font-weight: 300;
    box-shadow: 2px 2px 10px #1f1f1f;
    border-radius: 5px;
  }
`

const RedBuuton = styled.button`
  background-color: #e84949;
    color: white;
    width: 200px;
    height: 60px;
    border: none;
    font-size: large;
    margin-top: 2rem;
    position: relative;
    z-index: 1;
    box-shadow: 5px 5px 7px 0px #0000003f;
    transition: 0.8s;
    cursor: pointer;

    &:hover{
      transform: scale(0.9);
      color: black;
    }

    &::before{
      content: "";
      position: absolute;
      background-color: #fff;
      color: #000;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: -1;
      /* margin: 3px; */
      transform-origin: left;
      transform: scaleX(0);
      transition: all 0.6s ease;
    }

    &:hover::before{
      transform: scaleX(1);
    }
`

const Contact = () => {

  const [user, setUser] = useState({name:"", email:"", number:"", address:""})
  
  const authHandler = async () => {
   
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
    
    setUser({name:response.user.name, email:response.user.email, number:response.user.number, address:response.user.address})

  }

  let cname = null;
  let cval = null;

  const changeHandler = (e) =>{
    cname = e.target.name
    cval = e.target.value
    setUser({cname : cval});
  }

  useEffect(()=>{
    authHandler();
  }, [])

  return (
    <>
      <Wrapper>
        <ContactContainer>
          <h1>Contact Us</h1>
          <h2>Questions, thoughts, or just want to say hello? </h2>

          <FormContainer>
            <form method="post" enctype="text/plain" action="mailto:yash04577@gmail.com">
              <input type="text" name='name' placeholder="Enter your name" onChange={changeHandler} value={user.name}/>
              <br />
              <input type="text" name='mail' placeholder="Enter your email address" value={user.email}/>
              <br />
              <input type="text" name='subject' placeholder="Enter your subject" />
              <br />
              <textarea name="message" id="" cols="30" rows="10" placeholder="Enter your message here"></textarea>
              <RedBuuton type="submit" value="Send">Send Message <i class="fa-solid fa-paper-plane"></i></RedBuuton>
            </form>
          </FormContainer>
        </ContactContainer>
        <Footer></Footer>
      </Wrapper>
    </>
  )
}

export default Contact