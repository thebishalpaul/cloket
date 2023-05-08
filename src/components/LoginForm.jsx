import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import SignUp from './SignUp';

function LoginForm(props) {

      
    return (
        <>
            <Form style={{ width: "50%", margin: "23px" }}>
                <h3>Log In</h3>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)} />
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
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me" />
                </Form.Group>
                <Button style={{margin:"8px"}} variant="primary" type="submit" onClick={props.logIn}>
                    LogIn
                </Button>
                <Button variant="primary" onClick={props.handleLogOut}>
                    SignOut
                </Button>
            </Form>
            <SignUp/>
        </>
    );
}

export default LoginForm;