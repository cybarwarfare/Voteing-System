import React from 'react';
import { Form, Button, Modal, img, DropdownButton, Dropdown } from 'react-bootstrap';
import Logo from '../img/raise-hand.png';
import voter from '../img/vote (1).png';
import check from '../img/check.png';
import add from '../img/plus.png';

class ElectionLog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            party: '',
            Chairman: [],
            Secretary: [],
            Treasury: [],
            Member: [],
            option: ''
        }
        
    }
    async componentDidMount(){
        console.log("Mound")
        await this.candidates();
    }

    candidates = async () => {
        await this.chairmanList('Chairman');
        await this.chairmanList('Secretary');
        await this.chairmanList('Treasury');
        await this.chairmanList('Member');
    }
    addElection = (e) => {
        console.log(e)
        try {
            this.setState({ option: e, showModal: this.state.showModal ? false : true });
        } catch (e) {
            alert(e.message);
        }
    }


    backButton = e => {
        this.props.history.push("/");
    };

    addCandidates = () => {
        console.log("option :" + this.state.option)
        if(this.state.name != '' && this.state.description != '' && this.state.party != ''){
            try {
                console.log("data fetching :" + this.props.location.electionname)
                fetch("http://localhost/Voteing/backend/AddCandidates", {
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: this.state.name,
                        description: this.state.description,
                        party: this.state.party,
                        electionname: this.props.location.electionname,
                        category: this.state.option
                    }),
                }).then((res) => res.json())
                    // .then((data) => alert(data.reason))
                    .then(() => this.addElection())
                    .then(() => this.candidates());
            } catch (e) {
                alert(e.message)
            }
            this.setState({name: '', description: '', party: ''});
        }else{
            alert("empty input tag")
        }
    }
    chairmanList = async(e) => {
        console.log("call  :"+ e)
        let list = [];
        try {
            await fetch("http://localhost/Voteing/backend/ListCandidates", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    electionname: this.props.location.electionname,
                    category: e
                }),
            }).then((response) => response.json())
                .then((data) => data.forEach(value => {
                    list.push(value);
                }))
                .then(() => e == 'Chairman'? this.setState({Chairman: list}):e == 'Secretary'? this.setState({Secretary: list}):e == 'Treasury'? this.setState({Treasury: list}): this.setState({Member: list}));
        } catch (e) {
            alert(e.message)
        }
    }
    logoutHandle = () => {
        try {
            localStorage.removeItem('admin');
            this.props.history.push({pathname: '/' });
            window.location.reload();
        } catch (e) {
            alert(e.message)
        }
    }

    render() {
        console.log("render data :" + JSON.stringify(this.state.Member))
        return (
            <div className="d-flex flex-column" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
                <Modal show={this.state.showModal} onHide={this.addElection} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Candidates</Modal.Title>
                    </Modal.Header>
                    <Form className="d-flex justify-content-center align-items-center flex-column p-3">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control style={{ width: '270px' }} type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} placeholder="Enter Name" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Description</Form.Label>
                            <Form.Control style={{ width: '270px' }} type="text" value={this.state.description} onChange={e => this.setState({ description: e.target.value })} placeholder="Enter description" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>party</Form.Label>
                            <Form.Control style={{ width: '270px' }} type="text" value={this.state.party} onChange={e => this.setState({ party: e.target.value })} placeholder="Enter Party" />
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.addElection}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={() => this.addCandidates()}>
                            Create
                    </Button>
                    </Modal.Footer>
                </Modal>
                <div className="bg-primary w-100 d-flex flex-row justify-content-center align-items-center pl-2" style={{ height: '25vh' }}>
                    {/* <div style={{ height: '20vh', width: '20vh' }}>
                        <img className="p-3" style={{ height: '100%', width: '100%' }} alt="" src={Logo} />
                    </div> */}
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <span style={{ fontSize: '2em', color: 'white' }} className="font-weight-bold">ELECTS</span>
                        <span style={{ color: 'white',fontSize:'1.5em'}} className="font-smaller">The most popular voting website for creating polls & scheduling</span>
                        {/* <span style={{ color: 'white' }} className="font-smaller">creating polls & scheduling</span> */}
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center border" style={{ height: '10vh', width: '100vw' }}>
                    <div type="button" className="font-weight-light pl-4" onClick={this.backButton}>back</div>
                    <div className="font-weight-bold">{this.props.location.collage}</div>
                    <div type="button" className="font-weight-light pr-4">
                        <DropdownButton id="dropdown-basic-button" title="More">
                            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                            <Dropdown.Item onClick={this.logoutHandle}>Log Out</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center" style={{ height: '65vh', width: '100vw' }}>
                    <div className="col-10 d-flex flex-row justify-content-start align-items-center" style={{ height: '65vh' }}>
                        <div className="m-1 rounded-lg d-flex flex-column" style={{ width:240 ,height: '60vh', backgroundColor: 'white' }}>
                            <Form.Label className="font-weight-bold">Chairman</Form.Label>
                            {
                                this.state.Chairman.map((value, index) => {
                                    return (
                                        <div className="p-0" key="index">
                                            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ width: 240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == '#99bbff' ? 'blue' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                                <span className="text-uppercase" style={{ color: 'black', fontWeight: 'bold', fontSize: '2em' }}>{value.party} : {value.vote}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="p-0">
                                <div className="d-flex justify-content-center align-items-center container-fluid" type="button" onClick={() => this.addElection('Chairman')} style={{ width: 240, height: 80, backgroundColor: '#99caff' }}>
                                    <img style={{ height: '20px', width: '20px' }} alt="" src={add} />
                                </div>
                            </div>
                        </div>

                        <div className="m-1 rounded-lg d-flex flex-column" style={{ height: '60vh', width: 240, backgroundColor: 'white' }}>
                            <Form.Label className="font-weight-bold">Secretary</Form.Label>
                            {
                                this.state.Secretary.map((value, index) => {
                                    return (
                                        <div className="p-0">
                                            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ width: 240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == '#99bbff' ? 'blue' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                                <span className="text-uppercase" style={{ color: 'black', fontWeight: 'bold', fontSize: '2em' }}>{value.party} : {value.vote}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="p-0">
                                <div className="d-flex justify-content-center align-items-center container-fluid" type="button" onClick={() => this.addElection('Secretary')} style={{ width: 240, height: 80, backgroundColor: '#99caff' }}>
                                    <img style={{ height: '20px', width: '20px' }} alt="" src={add} />
                                </div>
                            </div>
                        </div>

                        <div className="m-1 rounded-lg d-flex flex-column" style={{ height: '60vh', width: 240, backgroundColor: 'white' }}>
                            <Form.Label className="font-weight-bold">Treasury</Form.Label>
                            {
                                this.state.Treasury.map((value, index) => {
                                    return (
                                        <div className="p-0">
                                            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ width: 240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == '#99bbff' ? 'blue' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                                <span className="text-uppercase" style={{ color: 'black', fontWeight: 'bold', fontSize: '2em' }}>{value.party} : {value.vote}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="p-0">
                                <div className="d-flex justify-content-center align-items-center container-fluid" type="button" onClick={() => this.addElection('Treasury')} style={{ width: 240, height: 80, backgroundColor: '#99caff' }}>
                                    <img style={{ height: '20px', width: '20px' }} alt="" src={add} />
                                </div>
                            </div>
                        </div>

                        <div className="m-1 rounded-lg d-flex flex-column" style={{ height: '60vh', width: 240, backgroundColor: 'white' }}>
                            <Form.Label className="font-weight-bold">Board Member</Form.Label>
                            {
                                this.state.Member.map((value, index) => {
                                    return (
                                        <div className="p-0">
                                            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ width: 240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == '#99bbff' ? 'blue' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                                <span className="text-uppercase" style={{ color: 'black', fontWeight: 'bold', fontSize: '2em' }}>{value.party} : {value.vote}</span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className="p-0">
                                <div className="d-flex justify-content-center align-items-center container-fluid" type="button" onClick={() => this.addElection('Member')} style={{ width: 240, height: 80, backgroundColor: '#99caff' }}>
                                    <img style={{ height: '20px', width: '20px' }} alt="" src={add} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ElectionLog;

{/* <div className="m-1 border rounded-lg d-flex flex-row" style={{ height: '60vh', width: 240, backgroundColor: 'white' }}>
    <div className="col-2 d-flex justify-content-center align-items-center border">
        <span className="text-capitalize" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontWeight: 'bold' }}>Chairman</span>
    </div>
    <div className="col-10 p-0">
        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: 80, backgroundColor: 'red' }}>
            <span style={{ color: 'white', fontWeight: 'bold', fontSize: '2em' }}>SFI : 20</span>
        </div>
    </div>
</div> */}