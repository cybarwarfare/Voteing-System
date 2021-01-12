import React from 'react';
import { Form, Button, Navbar, Nav } from 'react-bootstrap';
import {Link, BrowserRouter as Router,NavLink} from 'react-router-dom';

class MainScreen extends React.Component{
  constructor(props){
    super(props)
    this.state={
      email:'',
      password:'',
    }
  }

  HandleLogin = () =>{
    try{
        console.log("data fetching")
        fetch("http://localhost/Voteing/backend/voterLogin",{
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
  this.props.history.push({pathname: '/' });
  window.localStorage.setItem('voter', this.state.email)
}
    render(){
        return(
            <div className="p-0 m-0 position-relative" style={{ width: '100vw' }}>
      <div className="position-absolute d-flex flex-column justify-content-center align-items-center" style={{ height: '75vh', width: '30vw', zIndex: 1, marginLeft: '60%',marginTop: '8%', borderRadius: '2%', backgroundColor: 'white' }}>
        <div className="d-flex flex-column mb-4">
          <span className="text-capitalize" style={{ fontSize: '2em', fontWeight: 'bold', color:'#05c555'}}>ELECTS</span>
          <small className="font-weight-bold">VOTER LOGIN</small>
        </div>
        <Form autoComplete="off" className="d-flex justify-content-center align-items-center flex-column">
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control style={{width:'270px'}} value={this.state.email} onChange={e => this.setState({ email: e.target.value })}  type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control  className="mb-4" style={{width:'270px'}} value={this.state.password} onChange={e => this.setState({ password: e.target.value })} type="password" placeholder="Password" />
          </Form.Group>
          <Button ariant="success" style={{backgroundColor:'#05c555',width:270,fontWeight:'bold'}} onClick={() =>this.HandleLogin()}>LOGIN</Button>
          <div className="mt-4" type="button">
            <Nav.Link as={NavLink} style={{fontSize:'0.8em',fontWeight:'lighter'}} to="/VoterS">CREATE NEW ACCOUNT</Nav.Link>
          </div>
        </Form>
      </div>


      <div className="login-container container-fluid p-0 m-0 position-absolute w-100" style={{ height: '100vh', scrollBehavior: 'smooth', overflow: 'auto',backgroundColor:'#f6f6f6'}}>
        <section className="h-100  p-0">
            <Navbar collapseOnSelect expand="lg" style={{backgroundColor:'#05c555'}}  variant="dark">
              <Navbar.Brand className="font-weight-bold pr-5 " style={{fontSize:'2em'}}>ELECTS</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="pr-3 w-100">
                  <Nav.Link style={{color:'white',fontWeight:'bold'}} className="pr-4">Contact</Nav.Link>
                  <Nav.Link style={{color:'white',fontWeight:'bold'}} as={NavLink} to="/Admin">Admin</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          <div className="h-100 w-100 d-flex justify-content-start align-items-center pl-4">
            <div className="pb-4 ml-4">
              <h1 className="pb-3 font-weight-bold" style={{fontSize:'3em',color:'black'}}>Online Voting System</h1>
              <h4 style={{color:'#8c8c8c'}}>The most popular voting website for</h4>
              <h4 style={{color:'#8c8c8c'}}>creating polls & scheduling</h4>
            </div>
          </div>
        </section>
        <section className="h-100 d-flex justify-content-start align-items-center pl-4" style={{ backgroundColor: 'white'}}>
            <div>
              <h1 className="pb-3 font-weight-bold" style={{fontSize:'3em',color:'#34495e'}}>An online voting system with</h1>
              <h1 className="pb-3 font-weight-bold" style={{fontSize:'3em',color:'#34495e'}}>your needs at the forefront.</h1>
              <h4 style={{fontSize:'1em'}}>From secure polling software to the management of complex voting events - we offer a</h4>
              <h4 style={{fontSize:'1em',textAlign:'center'}}>range of eVoting solutions that exceed expectation.</h4>
            </div>
        </section>
      </div>
    </div>
        )
    }
}
export default MainScreen;