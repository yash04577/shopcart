import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import "../styles/Signup.css"
import { Link } from 'react-router-dom';
import axios from 'axios';



const SignUp = () => {


    const navigate = useNavigate();

    const [user, setUser] = useState({
        fullName:"",email:"", phone:"", address:"", password:""
    })


    const testapi = (e) =>{

        e.preventDefault();
        const {fullName,email, phone, address,password} = user;

        const data = {
            name: fullName, 
            email: email, 
            number: phone, 
            address: address, 
            password: password 
        
        }

        axios.post(`http://localhost:8000/signup`, JSON.stringify(data),
        { headers: { 'Content-Type': 'application/json' } })
        .then(res => {
          window.alert(res.data.message)

        if(res.data.message === "registered sucessfully"){

            navigate("/login")
        }
          console.log(res.data);
      })
    }



   
    const afterSubmission = async (e) =>{
        e.preventDefault();
        console.log(user); 
        
        const {name,email, phone, work,password,cpassword} = user;
        
        const res = await fetch('/register',{
            method: "post",
            headers: {
                'Content-Type' : 'application/json'
            },

            body:JSON.stringify({
                
                naame: name,
                email : email,
                phone : phone,
                work : work,
                password : password,
                cpassword : cpassword
                    
            })
        })

        console.log("waiting.....up")
        // const data = await res.json();
        console.log("waiting.....")
        navigate('/login')
        // if(data.status === 422 || !data){
        //     console.log(data)
        //     window.alert("failed");
        // }

        // else{
        //     console.log(data)
        //     window.alert("succesfull");
        // }
    }



    let Name;
    let val;

    const handleInputs = (e) => {
        // console.log(e);
        Name = e.target.name;
        val = e.target.value;
        setUser({...user, [Name]:val});
        // console.log(user)
        
    }

    return (
        <>
            <div className="container mt-5 d-flex border overflow-hidden rounded">

                <div className="register-inputs w-50 h-100 ">

                    <form method='post' style={{padding:"20px"}}>

                        <h1 class="mb-4 ml-2">Sign up</h1>
                        <div class="mb-3 d-flex">
                            <input type="text" class="form-control border-0 border-bottom" id="formGroupExampleInput" name='fullName' placeholder="Your Name" value={user.fullName} onChange={handleInputs} />
                        </div>
                        <div class="mb-3 d-flex">
                            <input type="text" class="form-control border-0 border-bottom" id="formGroupExampleInput2" name='email' placeholder="Your Email" value={user.email} onChange={handleInputs} />
                        </div>
                        <div class="mb-3 d-flex">
                            <input type="text" class="form-control border-0 border-bottom" id="formGroupExampleInput2" name='phone' placeholder="Your Phone Number" value={user.phone} onChange={handleInputs} />
                        </div>
                        <div class="mb-3 d-flex">
                            <input type="text" class="form-control border-0 border-bottom" id="formGroupExampleInput2" name='password' placeholder="Your Password" value={user.password} onChange={handleInputs} />
                        </div>
                        <div class="mb-3 d-flex">
                            <input type="text" class="form-control border-0 border-bottom" id="formGroupExampleInput2" name='address' placeholder="Your Address" value={user.address} onChange={handleInputs} />
                        </div>

                        {/* <button class="btn btn-primary btn-lg" type='submit' onClick={afterSubmission}>Register</button> */}
                        <button class="btn btn-primary btn-lg" type='submit' onClick={testapi} style={{marginLeft:"-10px"}}>Register</button>

                    </form>

                </div>
                <div className="register-img w-50 h-100">
                    <img src="https://img.freepik.com/free-vector/privacy-policy-concept-illustration_114360-7478.jpg?w=2000" class="img-fluidf" width={"80%"} alt="" srcset="" />
                </div>
            </div>

            <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"70px"}}>
                <Link to={"/login"} style={{textDecoration:"none", fontWeight:"bold" , textAlign:"center", fontSize:"larger"}}>Already a User Login Here</Link>
            </div>

        </>
    )
}

export default SignUp