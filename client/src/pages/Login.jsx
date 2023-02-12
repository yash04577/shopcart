import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const clickHandler = async (e) => {
    e.preventDefault();


    const res = await fetch('/signin', {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({

        email: email,
        password: password,

      })

    })

    const response = await res.json();
    window.alert(response);

    if(response.message === "login sucessfull"){

      localStorage.setItem("jwt", response.token)

      console.log("inside redirected condition")
      navigate('/');
    }

  }



  let name;
  let val;

  const changeHandler = (e) => {
    console.log(e.target.name)
    name = e.target.name;
    val = e.target.value;

    if (name === "email") {
      setEmail(val);
    }

    else {
      setPassword(val);
    }
  }

  return (
    <>
      <div className="container mt-3 d-flex border overflow-hidden rounded inputs-container" style={{height:"70vh"}}>

        <div className="login-img w-50">
          <img src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=2000" class="img-fluid" alt="" srcset="" />
        </div>

        <div className="login-inputs w-50 h-100 " style={{paddingTop:"75px"}}>

          <form method='post'>
            <h1 class="ml-2" style={{marginBottom:"50px", marginLeft:"-10px"}}>Sign in</h1>

            <div class="mb-3 d-flex email-input">
              <i class="zmdi zmdi-email zmdi-hc-2x"></i>
              <input type="text" class="form-control border-0 border-bottom" id="formGroupExampleInput2" placeholder="Your Email" name='email' value={email} onChange={changeHandler} />
            </div>
            <div class="mb-3 d-flex">
              <i class="zmdi zmdi-lock zmdi-hc-2x"></i>
              <input type="text" class="form-control border-0 border-bottom" id="formGroupExampleInput2" placeholder="Your Password" name='password' value={password} onChange={changeHandler} />
            </div>
            <button class="btn btn-primary btn-lg mt-5" type='submit' onClick={clickHandler} style={{marginLeft:"-10px", marginTop:"20px"}}>Sign in</button>
          </form>
        </div>

      </div>

       <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100px"}}>
            <Link to={"/signup"} style={{textDecoration:"none", fontWeight:"bold" , textAlign:"center", fontSize:"larger"}}>Not a User SignUp Here</Link>
        </div>

    </>
  )
}

export default Login