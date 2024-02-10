import React from 'react'
import { ButtonP, InputP, SelectP } from '../Composant/jsx/Input'
import './../assets/css/Login.css'
import { CardLogin } from '../Composant/jsx/Card'
import { useState } from 'react'
import { FetchSpec } from '../Fetch'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.querySelector(".email").value);
    console.log(e.target.querySelector(".mdp").value);

    const employer = {
      email: e.target.querySelector(".email").value,
      password: e.target.querySelector(".mdp").value
    }
    console.log(employer);


    FetchSpec({ path: "/auth/authenticate", method: "POST", requestBody: employer }).then((data) => {
      if (data.length === 0) {
        alert("Veuillez verifier vos informations")
      } else {
        console.log(data.token);
        localStorage.setItem("token", data.token);
        // window.location = '/Home';
        navigate('/home')
      }
    });



  }



  return <>

    <div className='loginBox'>

      <div className='headerLogin'>
        <div className='big-title'>Welcome back</div>
        <div className='min-title'>Join the world's largest community</div>
      </div>

      {/* <div className='recent-login'>
        <div className='recent-login-text'>Recent logins</div>
        <div className='box-recent-login'>
          <CardLogin name={"Sergio"} src={"user"} />
        </div>
      </div> */}

      {/* <div className='orBox'>
        <div className='or1'></div>
        <div className='orText'>Or</div>
        <div className='or2'></div>
      </div> */}

      <form onSubmit={handleSubmit} className='form-login'>
        <div className='form-item'>
          <InputP value={"sergio@gmail.com"} name={"email"} classN={"inputData email"} label={"Email"} type={"text"} fonction={handleChange} />
          <InputP value={"0000"} name={"mdp"} classN={"inputData mdp"} label={"Password"} type={"password"} fonction={handleChange} />

        </div>
        <ButtonP Texte={"Sign in"} classN={"loginButton"} />
      </form>
    </div>

  </>
}

export default Login