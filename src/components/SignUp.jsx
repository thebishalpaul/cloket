import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignUp(props) {
  
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