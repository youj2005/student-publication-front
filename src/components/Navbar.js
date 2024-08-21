import Topics from './Topics'
import Button from './Button'
import { Link } from 'react-router-dom'
import { auth } from '../firebase-config';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from "firebase/auth";

const Navbar = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  });

  return (
    <nav className="navbar sticky-top navbar-expand-xl navbar-light mx-0 d-flex border-bottom">
      <Link to="/" class='ms-3 nav-link'>
        <img src={require('../images/logo.png')} width='50vw' height='auto' alt='home' class='nav-link'></img>
      </Link>
      <Topics class='mr-auto' topics={props.topics}></Topics>
      {
        loggedIn ?
          <Link to="/profile" class='me-3 nav-link'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="auto" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
          </Link>
          :
          <>
            <Button uri="/signup" class='btn-primary border border-dark mx-2'>Sign Up to Write</Button>
            <Button uri='/login' class='btn-primary border border-dark mx-2 me-3'>Login</Button>
          </>
      }

    </nav>
  )
}

export default Navbar