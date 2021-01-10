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
        <div className="d-flex flex-row" style={{height:'100vh',width:'100vw',backgroundColor:'white'}}>
            <div className="col-6">
                <img style={{height:'100%',width:'100%'}} src={ SignUp }/>
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center">
            <Form className="d-flex justify-content-center align-items-center flex-column">
                    <div className="mb-4">
                        <h2>Aadmin Registration</h2>
                    </div>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control style={{ width: '270px' }} type="email" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Boothname</Form.Label>
                        <Form.Control className="mb-1" style={{ width: '270px' }}  type="text" value={this.state.boothname} onChange={e => this.setState({ boothname: e.target.value })} placeholder="Enter Boothname" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Collage</Form.Label>
                        <Form.Control className="mb-1" style={{ width: '270px' }} type="text" value={this.state.collage} onChange={e => this.setState({ collage: e.target.value })} placeholder="Enter Collage" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control className="mb-1" style={{ width: '270px' }} type="text" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="Enter Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control style={{ width: '270px' }} type="text" value={this.state.confirmPassword} onChange={e => this.setState({ confirmPassword: e.target.value })} placeholder="Enter Password" />
                    </Form.Group>
                    <Button variant="primary" style={{ width: '270px' }} onClick={()=>this.onSubmit()}>Login</Button>
                </Form>
            </div>
        </div>
      )
    }
  }
export default AdminSignUp;