import React from 'react'

function UserPage(props) {

  
  return (
    <>
    <h1>User Details:</h1>
    <p>email: {props.user}</p>
    </>
  )
}

export default UserPage