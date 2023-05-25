import React, { useEffect } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import { Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebase'
import { setDoc, doc } from "firebase/firestore";
import Home from './components/Home';

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();


  // Authentication listener

  const auth = getAuth();
  //  console.log(auth);
  const authListener = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        clearInputs();
        setUser(user);
        // console.log(user);
      } else { setUser('') }
    });
  }

  // //React listener.
  useEffect(() => {
    authListener();
  }, []);


  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        clearError();
        alert("Log In Successfull!!");
        navigate("/userPage");
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(error.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(error.message);
            break;

          default:
            break;
        }
      });
  }

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }
  const clearError = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogOut = () => {
    auth.signOut().then(() => {
      alert("logged out!!");
      clearInputs();
    }).catch((error) => {
      // An error happened.
      alert(error.message);
    });
  }


  // <-----------Signup and create collection in firebase---------->

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const create = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (res) => {
          alert("Sign Up Successful!!")
        const ref = doc(db, "users", res.user.uid);
        const docRef = await setDoc(ref, {
          name: name,
          phone: phone
        })
          .then(() => {
            alert('user created 👍');
          })
          .catch((error) => {
            alert(error.message);
          });
      })
      .catch((err) => {
        switch (err.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
          case 'auth/internal-error':
            setEmailError(err.message);
            break;
          case 'auth/weak-password':
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  }


  return (
    <>
      <Routes>
        <Route path="/" element={
          <Home
            logIn={logIn}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogOut={handleLogOut}
            passwordError={passwordError}
            emailError={emailError}
            create={create}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
          />
        }
        />
        <Route path="/loginForm" element={
          <LoginForm
          />}
        />

        <Route path="/userPage" element={
          <UserPage
            user={user}
          />}
        />

        <Route path="/SignUp" element={
          <SignUp />}
        />

      </Routes>
    </>
  );
}

export default App;