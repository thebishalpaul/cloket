import React from 'react'
import Button from 'react-bootstrap/Button';


function UserPage(props) {

  return (
    <>
      <h1>User Details:</h1>
      <p>email: {props.user.email}</p>
      
      <Button variant="primary" type="submit" >
        Edit
      </Button>
    </>
  )
}

export default UserPage