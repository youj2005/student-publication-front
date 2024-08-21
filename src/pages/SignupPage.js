import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Button from '../components/Button'
import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { auth, provider } from '../firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

const SignupPage = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // create a new user with email and password
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Pull out user's data from the userCredential property
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      navigate('/');
    } catch (err) {
      // Handle errors here
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/weak-password":
          setErrorMessage("The password is too weak.");
          break;
        case "auth/email-already-in-use":
          setErrorMessage(
            "This email address is already in use by another account."
          );
        case "auth/invalid-email":
          setErrorMessage("This email address is invalid.");
          break;
        case "auth/operation-not-allowed":
          setErrorMessage("Email/password accounts are not enabled.");
          break;
        case "auth/missing-email":
          setErrorMessage("Email address is invalid.");
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    }
  };

  const signInWithGoogle = () => {
    try {
      signInWithPopup(auth, provider).then((result) => {
        navigate("/");
      });
    } catch (err) {
      const errorMessage = err.message;
      const errorCode = err.code;

      setError(true);

      switch (errorCode) {
        case "auth/popup-closed-by-user":
          setErrorMessage("Email/password accounts are not enabled.");
          break;
        default:
          setErrorMessage(errorMessage);
          break;
      }
    }
  };

  return (
    <MainLayout>
      <div class='row justify-content-center'>
        <div class='container col-lg-4 p-5'>
          <div class='h2 mb-3'>Sign Up</div>
          <form>
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="email" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
              <label for="email">Email Address</label>
            </div>
            <div class="form-floating mb-3">
              <input type="password" class="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
              <label for="password">Password</label>
            </div>
            {/*<div class='form-check m-1 mb-3'>
              <label class="form-check-label" for="anon">
                Remain anonymous?
              </label>
              <input class="form-check-input" type="checkbox" id="anon" value={anon} onClick={changeAnon}></input>
            </div>*/}
            <div class="form-floating mb-3">
              <input type="name" class="form-control" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}></input>
              <label for="name">Name</label>
            </div>
            <div class='mb-3'>
              <div class='p'>Already have an account? <Link class='p' style={{ color: "black" }} to='/login'>Login</Link></div>
            </div>
            <Button class='btn-secondary' type='submit' onClick={handleSubmit}>Sign Up</Button>
            {error &&
              <h3 class='row justify-content-center mt-4'>
                <span class='badge w-auto bg-danger'>{errorMessage} </span>
              </h3>
            }
            <div class='row my-2 justify-content-center align-items-center inline'>
              <span class='col'><hr></hr></span>
              <span class='col-1 text-center'>or</span>
              <span class='col'><hr></hr></span>
            </div>
            <div class='row mx-1'>
              <Button class='btn border rounded' onClick={signInWithGoogle}>
                <img src={require('../images/google.png')} width='40rem' class='me-2'></img>
                <span style={{ "vertical-align": "-.1em" }}>Sign Up with Google</span>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default SignupPage