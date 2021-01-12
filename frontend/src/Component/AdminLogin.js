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
            <div className="d-flex align-item-center" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
                <div className="d-flex col-7 flex-column justify-content-center align-items-center">
                    <div className="d-flex justify-content-center align-items-center" style={{width:600,height:100}}>
                        <h1>ELECTS</h1>
                    </div>
                    <div className="p-2 mt-2" style={{width:600,height:300}}>
                        <h2 className="mb-4">Try online voting with Elects – it’s easy!</h2>
                        <span>Online polls are quick and easy with Elects. In just a few minutes you can create a poll for any occasion and then share it amongst your colleagues or friends. Once complete, you can easily view the results of your free online voting system to make any additions or edit your original content.</span>
                        <div type="button" onClick={() => this.props.history.push("/")} className="d-flex justify-content-center align-items-center" style={{width:130,height:50,backgroundColor:'#05c555',marginTop:20,borderRadius:7}}>
                            <span style={{fontWeight:'bold',fontSize:18,color:'white'}}>Go Back</span>
                        </div>
                    </div>
                </div>
                <div className="d-flex col-5 justify-content-center align-items-center">
                    <div className="border-left border-dark">
                    <Form autoComplete="off" className="d-flex justify-content-center align-items-center flex-column p-4 ml-4">
                    <div className="mb-4 w-100">
                        <h4 style={{fontSize:16}}>Welcome to</h4>
                        <div className="d-flex flex-row align-items-end">
                        <h1 style={{fontWeight:'bold'}}>ELECTS</h1>
                        <h4 style={{fontSize:16,marginLeft:10,marginBottom:14}}>Admin Panel</h4>
                        </div>
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
                    <Button variant="success" style={{ width: '270px',fontWeight:'bold' }} onClick={()=>this.HandleLogin()}>LOGIN TO YOUR ACCOUNT</Button>
                    <div className="mt-4">
                    <Nav.Link as={NavLink} style={{fontSize:'14px',fontWeight:'bold',color:'#05c555'}} to="/AdminS">Don't have an Account ?</Nav.Link>
                    </div>
                </Form>
                    </div>
                </div>
            </div>
        )
    }
}
export default AdminLogin;