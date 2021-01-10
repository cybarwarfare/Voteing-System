import React from 'react';
import { Button, Modal, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import Logo from '../img/raise-hand.png'
import add from '../img/plus.png';
import icon1 from '../img/close.png';
import icon2 from '../img/arnaud-jaegers-IBWJsMObnnU-unsplash.jpg';


class VoterHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            boothName: '',
            collage: '',
            electionname: '',
            boothList: [],
            test: 4,
            show:false,
        }
    }
    logoutHandle = () => {
        try {
            localStorage.removeItem('voter');
            window.location.reload();
        } catch (e) {
            alert(e.message)
        }
    }
    async componentDidMount(){
        console.log("mounded");
        const end = window.localStorage.getItem('voter').split('@').slice(1).pop();
        let result = end.split('.').shift();
        this.setState({boothName: result});
        console.log(result)
        console.log("mound state :"+ this.state.boothName)
        await this.fetchElection();
        await this.checkVoter();
        await this.fetchFunction(result);
    }
    fetchFunction = (e) => {
        try {
            console.log("data fetching :"+ this.state.boothname)
            fetch("http://localhost/Voteing/backend/adminData", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    boothname: e,
                }),
            }).then((res) => res.json())
                .then((data) => this.setState({collage: data}));
        } catch (e) {
            alert(e.message)
        }
    }
    async componentDidUpdate(){
        await this.fetchList();
    }
    checkVoter = () =>{
        console.log("data fetching ..")
        try{
            fetch("http://localhost/Voteing/backend/checkVote", {
            method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: window.localStorage.getItem('voter'),
                }),
        })
            .then((response) => response.json())
            .then((data) =>{
                if(data == "1"){
                    this.setState({show: false})
                    console.log(data)
                }else{
                    this.setState({show:true})
                }
            })
        } catch(e){
            alert(e.message);
        }
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
            }))
            .then(() => this.setState({ boothList: list }))
    }
    fetchElection = () => {
        console.log("boothname :"+this.state.boothName)
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
            .then((data)=> console.log("data :"+ data))
    }
    handleClick = e => {
        this.props.history.push({pathname: '/Voting', electionname: e})
    };

    result = e => {
        this.props.history.push({pathname: '/result', electionname: e})
    };

    render() {
        // console.log("state booth"+this.state.boothname)
        return (
            <div className="d-flex flex-column" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
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
                    <div className="font-weight-light pl-4"></div>
                    <div className="font-weight-bold text-capitalize">{this.state.collage}</div>
                    <div type="button" className="font-weight-light pr-4">
                        <DropdownButton id="dropdown-basic-button" title="More">
                            <Dropdown.Item href="/settings">Settings</Dropdown.Item>
                            <Dropdown.Item onClick={this.logoutHandle}>Log Out</Dropdown.Item>
                        </DropdownButton>
                    </div>
                </div>
                <div className="p-4 d-flex flex-row" style={{ height: '65vh', width: '100vw' }}>
                    {
                        this.state.boothList.map((value, index) => {
                            return (
                                <div key={index}  className="m-2 d-flex flex-column"  style={{ height: '50vh', width: '90vw', borderRadius: 5,position:'relative' }}>
                                    <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '70%' }}>
                                        <img style={{ height: '100%', width: '100%' }} src={icon2} /> 
                                        <span className="text-uppercase font-weight-bold position-absolute" style={{fontSize:100, color:'white'}}>{value.electionname}</span>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center flex-row p-4" style={{ width: '100%', height: '30%' }}>
                                        <div type="button" disable className="d-flex justify-content-center align-items-center" style={{height:'80px',width:'30%',backgroundColor:'blue',margin:30,borderRadius:10}}>
                                            <span style={{fontSize:27,fontWeight:'bold',color:'white'}}>Candidates</span>
                                        </div>
                                        <div type="button" onClick={()=> this.state.show == true ? this.handleClick(value.electionname): alert("already voted")} className="d-flex justify-content-center align-items-center" style={{height:'80px',width:'30%',backgroundColor:'blue',margin:30,borderRadius:10}}>
                                            <span style={{fontSize:27,fontWeight:'bold',color:'white'}}>Vote</span>
                                        </div>
                                        <div type="button" className="d-flex justify-content-center align-items-center" onClick={() => this.result(value.electionname)} style={{height:'80px',width:'30%',backgroundColor:'blue',margin:30,borderRadius:10}}>
                                            <span style={{fontSize:27,fontWeight:'bold',color:'white'}}>Result</span>
                                        </div>
                                    </div>
                                    <img style={{height: 100,position:'absolute',zIndex: this.state.show == false ? 1:-1}} src={icon1} />
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
export default VoterHome;


