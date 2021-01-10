import React from 'react';
import { Form, Button, Navbar, Nav, img, Col } from 'react-bootstrap';
import SignUp from '../img/undraw_team_ih79.png';

class VoterSign extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            day: '',
            month:'',
            year:'',
            password: '',
            confirmPassword:'',
        }
    }
    onSubmit = () => {
        if (this.state.name != '' && this.state.email != '' && this.state.day != '' && this.state.month != '' && this.state.year != '' && this.state.password != '') {
            if(this.state.confirmPassword == this.state.password){
                try {
                    const end = this.state.email.split('@').slice(1).pop();
                    var result = end.split('.').shift();
                    console.log("data fetching")
                    fetch("http://localhost/Voteing/backend/Cvoter",{
                        method: "POST",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                          },
                        body:JSON.stringify({
                            boothname : result,
                            name:this.state.name,
                            dob: this.state.day+'/'+this.state.month+'/'+this.state.year,
                            email: this.state.email,
                            password: this.state.password
                        }),
                    }).then((res) => res.json())
                    .then((data) => data.status == true ? this.userFuntion(): alert("Failed to Create account"))
                    .then(() => window.location.reload());
                } catch (e) {
                    alert(e.message)
                }
            }else{  
                alert("password is not matching")
            }
        } else {
            alert("Empty input");
        }
    }

    userFuntion = () =>{
        this.props.history.push({pathname: '/' });
        window.localStorage.setItem('voter', this.state.email)
    }

    render() {
        return (
            <div className="d-flex flex-row" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
                <div className="col-6">
                    <img style={{height:'100%',width:'100%'}} src={ SignUp }/>
                </div>
                <div className="col-6 d-flex justify-content-center align-items-center">
                    <Form className="d-flex justify-content-center align-items-center flex-column">
                        <div className="mb-4">
                            <h2>Voter Registration</h2>
                        </div>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control style={{ width: '270px' }} type="email" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control className="mb-1" style={{ width: '270px' }} type="text" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="Enter Email id" />
                        </Form.Group>
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Row className="mb-4" style={{ width: '270px' }}>
                            <Col>
                                <Form.Control placeholder="Day" value={this.state.day} onChange={e => this.setState({ day: e.target.value })}/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Month" value={this.state.month} onChange={e => this.setState({ month: e.target.value })}/>
                            </Col>
                            <Col>
                                <Form.Control placeholder="Year" value={this.state.year} onChange={e => this.setState({ year: e.target.value })}/>
                            </Col>
                        </Form.Row>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="mb-1" style={{ width: '270px' }} type="text" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="Enter Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control style={{ width: '270px' }} type="text" value={this.state.confirmPassword} onChange={e => this.setState({ confirmPassword: e.target.value })} placeholder="Enter Password" />
                        </Form.Group>
                        <Button variant="primary" style={{ width: '270px' }} onClick={() => this.onSubmit()}>Sign Up</Button>
                    </Form>
                </div>
            </div>
        )
    }
}
export default VoterSign;