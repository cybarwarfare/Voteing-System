import React from 'react';
import { Form, Button,Navbar, Nav } from 'react-bootstrap';
import {Link, BrowserRouter as Router,NavLink} from 'react-router-dom';

class AdminLogin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:'',
        }
    }

    HandleLogin = () =>{
        try{
            console.log("data fetching")
            fetch("http://localhost/Voteing/backend/AdminLogin",{
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                body:JSON.stringify({
                    email:this.state.email,
                    password:this.state.password,
                }),
            }).then((res) => res.json())
            .then((data) => data.status == true ? this.loginFunction(): alert("Invalid User"))
            .then(() => window.location.reload());
        } catch(e){
            alert(e.message)
        }
    }
    loginFunction = () =>{
        this.props.history.push({pathname: '/' })
        window.localStorage.setItem('admin', this.state.email);
    }

    render() {
        return (
            <div className="d-flex align-item-center flex-column" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
                <Navbar collapseOnSelect expand="lg"  variant="dark" className="bg-primary mb-4" style={{marginBottom:"100px"}}>
              <Navbar.Brand className="font-weight-bold pr-5 " style={{fontSize:'2em'}}>ELECTS</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="pr-3 w-100">
                  <Nav.Link style={{color:'white',fontWeight:'bold'}} className="pr-4">Contact</Nav.Link>
                  <Nav.Link style={{color:'white',fontWeight:'bold'}} as={NavLink} to="/Admin">Admin</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
                <Form autoComplete="off" className="d-flex justify-content-center align-items-center flex-column">
                    <div className="mb-4">
                        <h2>SignUp</h2>
                        <h4 style={{fontSize:10}}>For A Admin Accound</h4>
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control style={{ width: '270px' }} value={this.state.email} onChange={e => this.setState({ email: e.target.value })} type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
            </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="mb-4" style={{ width: '270px' }} value={this.state.password} onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" style={{ width: '270px' }} onClick={()=>this.HandleLogin()}>Login</Button>
                    <div className="mt-4">
                    <Nav.Link as={NavLink} style={{fontSize:'14px'}} to="/AdminS">Create New Accound</Nav.Link>
                    </div>
                </Form>
            </div>
        )
    }
}
export default AdminLogin;