import React from 'react';
import { Form, Button,Navbar, Nav,img } from 'react-bootstrap';
import SignUp from '../img/undraw_team_ih79.png';

class AdminSignUp extends React.Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            boothname:'',
            collage:'',
            password:'',
            confirmPassword:''
        }
    }
    onSubmit = () =>{
        if(this.state.email != '' && this.state.boothname != '' && this.state.collage != '' && this.state.password != ''){
            if(this.state.password == this.state.confirmPassword){
                try{
                    console.log("data fetching")
                    fetch("http://localhost/Voteing/backend/newBooth",{
                        method: "POST",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        body:JSON.stringify({
                            email:this.state.email,
                            password:this.state.password,
                            boothname:this.state.boothname,
                            collage:this.state.collage,
                        }),
                    }).then((res) => res.json())
                    .then((data) => data.status == true ? this.props.history.push({pathname: '/Admin' }) : alert("Failed to Create account"))
                } catch(e){
                    alert(e.message)
                }
            }else{
                alert("password not matched");
            }
        } else{
            alert("Empty input");
        }
    }

    render() {
      return(
        <div className="d-flex flex-row" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
                <div className="d-flex col-4 justify-content-center align-items-center" style={{backgroundColor:'#05c555'}}>
                    <span style={{color:'white',fontWeight:'bold',fontSize:30,marginBottom:500,marginRight:250}}>ELECTS</span>
                </div>
                <div className="d-flex col-8 justify-content-center align-items-center">
                <Form className="d-flex justify-content-center align-items-center flex-column">
                    <div className="mb-4">
                        <h2>Registration for an Account</h2>
                    </div>
                    <div className="d-flex flex-row mt-4">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control style={{ width: '270px' }} type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Boothname</Form.Label>
                        <Form.Control className="mb-1" style={{ width: '270px',marginLeft:30 }}  type="text" value={this.state.boothname} onChange={e => this.setState({ boothname: e.target.value })} placeholder="Enter Boothname" />
                    </Form.Group>
                    </div>
                    <Form.Group>
                        <Form.Label>Collage</Form.Label>
                        <Form.Control className="mb-1" style={{ width: '570px' }} type="text" value={this.state.collage} onChange={e => this.setState({ collage: e.target.value })} placeholder="Enter Collage" />
                    </Form.Group>
                   <div className="d-flex flex-row">
                   <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="mb-1" style={{ width: '270px' }} ttype="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                            <Form.Label>Conform Password</Form.Label>
                            <Form.Control style={{ width: '270px',marginLeft:30 }} type="password" value={this.state.confirmPassword} onChange={e => this.setState({ confirmPassword: e.target.value })} placeholder="Enter Conform Password" />
                    </Form.Group>
                   </div>
                    <Button variant="success" style={{ width: '570px',height:50 ,fontWeight:'bold'}} onClick={()=>this.onSubmit()}>SIGN UP</Button>
                    <Button variant="white" style={{ width: '570px',height:50,marginTop:20 ,fontWeight:'bold',color:'#05c555'}} onClick={() => this.props.history.push("/Admin")}>LOGIN</Button>
                </Form>
                </div>
            </div>
      )
    }
  }
export default AdminSignUp;