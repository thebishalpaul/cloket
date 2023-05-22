import React from 'react'
import LoginForm from './LoginForm';
import SignUp from './SignUp';
function Home(props) {
    return (
        <>
            <LoginForm 
              logIn={props.logIn}
              email={props.email}
              setEmail={props.setEmail}
              password={props.password}
              setPassword={props.setPassword}
              handleLogOut={props.handleLogOut}
              passwordError={props.passwordError}
              emailError={props.emailError}
            />
            <SignUp
             create={props.create}
             email={props.email}
             setEmail={props.setEmail}
             password={props.password}
             setPassword={props.setPassword}
             passwordError={props.passwordError}
             emailError={props.emailError}
             name={props.name}
             setName={props.setName}
             phone={props.phone}
             setPhone={props.setPhone}
            />
        </>
    )
}

export default Home