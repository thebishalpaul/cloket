import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase'
// import { db } from '../firebase'
// import { collection, addDoc } from "firebase/firestore";
function SignUp(props) {
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    // const [name, setName] = useState('');
    // const [phone, setPhone] = useState('');

    // const create = (e) => {
    //     e.preventDefault();
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then(() => {
    //             clearError();
    //             alert("Sign Up Successful!!")
    //             addDoc(collection(db, "users"), {
    //                 name: name,
    //                 phone: phone
    //             })
    //                 .then(() => {
    //                     alert('user created 👍');
    //                 })
    //                 .catch((error) => {
    //                     alert(error.message);
    //                 });
    //         })
    //         .catch((err) => {
    //             switch (err.code) {
    //                 case 'auth/email-already-in-use':
    //                 case 'auth/invalid-email':
    //                 case 'auth/internal-error':
    //                     setEmailError(err.message);
    //                     break;
    //                 case 'auth/weak-password':
    //                     setPasswordError(err.message);
    //                     break;
    //             }
    //         });

    // }

    // const clearError = () => {
    //     setEmailError('');
    //     setPasswordError('');
    // }
    return (
        <>
            <Form onSubmit={props.create} style={{ width: "50%", margin: "23px" }}>
                <h3>Create Account</h3>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your Name"
                        value={props.name}
                        onChange={(e) => props.setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Mobile number</Form.Label>
                    <Form.Control
                        type="number" placeholder="Enter Phone Number"
                        value={props.phone}
                        onChange={(e) => props.setPhone(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        {props.emailError}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password" placeholder="Password"
                        value={props.password}
                        onChange={(e) => props.setPassword(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        {props.passwordError}
                    </Form.Text>
                </Form.Group>

                <Button variant="primary" type="submit">
                    SignUp
                </Button>
            </Form>
        </>
    );
}

export default SignUp;