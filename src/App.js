import React from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import SignUp from './components/SignUp';
import { Route, Routes } from 'react-router-dom';
import UserPage from './components/UserPage';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError,setPasswordError]=useState('');
  const [emailError,setEmailError]=useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  const logIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        clearError();
        alert("Log In Successfull!!");
        setUser(userCredential.user.email);
        navigate("/userPage");
      })
      .catch((error) => {
        switch(error.code){
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(error.message);
            break;
           case 'auth/wrong-password':
                setPasswordError(error.message);
                break;  
        }
      });
  }
  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }
  const clearError=()=>{
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
  return (
    <>
      
      <Routes>
        <Route path="/userPage" element={<UserPage
          user={user}
        />} />
        <Route path="/" element={<LoginForm
          logIn={logIn}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          handleLogOut={handleLogOut}
          passwordError={passwordError}
          emailError={emailError}
        />} />
        <Route path="/SignUp" element={<SignUp />} />
      </Routes>
    </>
  );

}

export default App;