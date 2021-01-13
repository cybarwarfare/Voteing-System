import React from 'react';
import { Form, Button, Navbar, Nav, img, Col } from 'react-bootstrap';
import SignUp from '../img/undraw_Process_re_gws7.svg';

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
                <div className="d-flex col-6 justify-content-center align-items-center">
                    <Form className="d-flex justify-content-center align-items-center flex-column">
                        <div className="mb-4 d-flex align-items-center flex-column">
                            <h2>Voter Registration</h2>
                            <h4 style={{fontSize:13}}>By signing up you accept Doodle's Terms of service and Privacy policy</h4>
                        </div>
                        <div className="d-flex flex-row">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control style={{ width: '20vw' }} type="email" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email ID</Form.Label>
                            <Form.Control className="mb-1" style={{ width: '20vw',marginLeft:30 }} type="text" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} placeholder="Enter Email id" />
                        </Form.Group>
                        </div>
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Row className="mb-4">
                            <Col>
                            <Form.Control as="select" style={{width:'14vw'}}  onChange={e => this.setState({ day: e.target.value })}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </Form.Control>
                            </Col>
                            <Col>
                            <Form.Control as="select" style={{width:'14vw'}} onChange={e => this.setState({ month: e.target.value })}>
                                <option value="JAN">JAN</option>
                                <option value="FAB">FAB</option>
                                <option value="MAR">MAR</option>
                                <option value="APR">APR</option>
                                <option value="MAY">MAY</option>
                                <option value="JUN">JUN</option>
                                <option value="JUL">JUL</option>
                                <option value="AUG">AUG</option>
                                <option value="SEB">SEB</option>
                                <option value="OCT">OCT</option>
                                <option value="NOV">NOV</option>
                                <option value="DEC">DEC</option>
                            </Form.Control>
                            </Col>
                            <Col>
                            <Form.Control as="select" style={{width:'14vw'}} onChange={e => this.setState({ year: e.target.value })}>
                                <option value="1996">1996</option>
                                <option value="1997">1997</option>
                                <option value="1998">1998</option>
                                <option value="1999">1999</option>
                                <option value="2000">2000</option>
                                <option value="2001">2001</option>
                                <option value="2002">2002</option>
                            </Form.Control>
                            </Col>
                        </Form.Row>
                        <div className="d-flex flex-row">
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control className="mb-1" style={{ width: '20vw' }} type="password" value={this.state.password} onChange={e => this.setState({ password: e.target.value })} placeholder="Enter Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Conform Password</Form.Label>
                            <Form.Control style={{ width: '20vw',marginLeft:30 }} type="password" value={this.state.confirmPassword} onChange={e => this.setState({ confirmPassword: e.target.value })} placeholder="Enter Conform Password" />
                        </Form.Group>
                        </div>
                        <Button variant="success" style={{ width: '20vw',marginTop:30,fontWeight:'bold',backgroundColor:'#05c555'}} onClick={() => this.onSubmit()}>SIGN UP</Button>
                    </Form>
                </div>
                <div className="d-flex col-6 justify-content-center align-items-center" style={{backgroundColor:'#eff6fe'}}>
                    <div className="d-flex flex-row position-absolute align-items-center" style={{marginBottom:500,marginRight:300}}>
                        <span style={{color:'black',fontWeight:500}}>Already a Member?</span>
                        <Button variant="success" style={{marginLeft:20,height:50,width:120,backgroundColor:'white',color:'#05c555',fontWeight:'bold'}} onClick={() => this.props.history.push("/")}>LOGIN</Button>
                    </div>
                    <img style={{height:'60%',width:'60%'}} src={ SignUp }/>
                </div>
            </div>
        )
    }
}
export default VoterSign;