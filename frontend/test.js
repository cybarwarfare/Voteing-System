import React from 'react';
import { Button, Modal, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import Logo from '../img/raise-hand.png'
import add from '../img/plus.png';
import icon1 from '../img/glen-carrie-wzKHNVTZmZo-unsplash (1).jpg';
import icon2 from '../img/arnaud-jaegers-IBWJsMObnnU-unsplash.jpg';


class HomeScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            boothName: '',
            collage: '',
            electionname: '',
            boothList: [],
            test: 4,
        }
    }
    async componentDidMount() {
        if (window.localStorage.getItem('admin') != null) {
            await this.fetchFunction();
        } else {
            alert("login")
        }
    }
    async componentDidUpdate(){
        await this.fetchList();
    }
    fetchList = () => {
        let list = [];
        fetch("http://localhost/Voteing/backend/ListElection", {
            method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    boothname: this.state.boothName,
                }),
        })
            .then((response) => response.json())
            .then((data) => data.forEach(value => {
                list.push(value);
                // console.log(value);
            }))
            .then(() => this.setState({ boothList: list }))
    }
    fetchFunction = () => {
        try {
            console.log("data fetching")
            fetch("http://localhost/Voteing/backend/admin", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: window.localStorage.getItem('admin'),
                }),
            }).then((res) => res.json())
                .then((data) => this.setState({ boothName: data[0], collage: data[3] }, console.log("data :" + data[3])));
        } catch (e) {
            alert(e.message)
        }
    }
    CreateElection = () => {
        try {
            console.log("data fetching")
            fetch("http://localhost/Voteing/backend/election", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    electionname: this.state.electionname,
                    boothname: this.state.boothName,
                    date: '12/10/2020'
                }),
            }).then((res) => res.json())
                .then((data) => alert(data.reason));
        } catch (e) {
            alert(e.message)
        }
    }
    handleClick = e => {
        this.props.history.push({pathname: '/AdminE', electionname: e, collage: this.state.collage, boothName: this.state.boothName})
    };
    addElection = () => {
        try {
            this.setState({ showModal: this.state.showModal ? false : true });
        } catch (e) {
            alert(e.message);
        }
    }
    logoutHandle = () => {
        try {
            localStorage.removeItem('admin');
        } catch (e) {
            alert(e.message)
        }
    }
    render() {
        return (
            <div className="d-flex flex-column" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
                {/* modal */}
                <Modal show={this.state.showModal} onHide={this.addElection} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Election</Modal.Title>
                    </Modal.Header>
                    <Form className="d-flex justify-content-center align-items-center flex-column p-3">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Electionname </Form.Label>
                            <Form.Control style={{ width: '270px' }} type="email" value={this.state.electionname} onChange={e => this.setState({ electionname: e.target.value })} placeholder="Enter Electionname" />
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        <Button variant="secondary" >
                            Close
                    </Button>
                        <Button variant="primary" onClick={() => this.CreateElection()}>
                            Create
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className="bg-primary w-100 d-flex flex-row justify-content-start align-items-center pl-2" style={{ height: '25vh' }}>
                    <div style={{ height: '20vh', width: '20vh' }}>
                        <img className="p-3" style={{ height: '100%', width: '100%' }} alt="" src={Logo} />
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-start ml-4 pl-4">
                        <span style={{ fontSize: '2em', color: 'white' }} className="font-weight-bold">{this.state.collage}</span>
                        <span style={{ color: 'white' }} className="font-smaller">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor</span>
                        <span style={{ color: 'white' }} className="font-smaller">incididunt ut ero labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center border" style={{ height: '10vh', width: '100vw' }}>
                    <div className="font-weight-light pl-4"></div>
                    <div className="font-weight-bold text-capitalize">{this.state.boothName}</div>
                    <div type="button" className="font-weight-light pr-4">
                        <DropdownButton id="dropdown-basic-button" title="More">
                            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                            <Dropdown.Item onClick={this.logoutHandle}>Log Out</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div className="p-4 d-flex flex-row" style={{ height: '65vh', width: '100vw' }}>
                    <div className="m-2 d-flex flex-column border" style={{ height: '50vh', width: '20vw', borderRadius: 5 }}>
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '40%' }}>
                            <img style={{ height: '100%', width: '100%' }} alt="" src={icon1} />
                        </div>
                        <div type="button" onClick={this.addElection} className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '60%' }}>
                            <img className="p-3" style={{ height: '90px', width: '90px' }} alt="" src={add} />
                        </div>
                    </div>
                    {
                        this.state.boothList.map((value, index) => {
                            return (
                                <div  type="button" className="m-2 d-flex flex-column border"  style={{ height: '50vh', width: '20vw', borderRadius: 5 }} onClick={()=>this.handleClick(value.electionname)} key='index'>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '40%' }}>
                                        <img style={{ height: '100%', width: '100%' }} src={icon2} /> 
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center flex-column p-4" style={{ width: '100%', height: '60%' }}>
                                        <span className="text-uppercase font-weight-bold">{value.electionname}</span>
                                        <span className="text-uppercase font-weight-bold">Date :{value.date}</span>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeScreen;


