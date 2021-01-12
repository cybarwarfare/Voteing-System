import React from 'react';
import '../App.css';
import { Button, Modal, DropdownButton, Dropdown, Form } from 'react-bootstrap';
import icon2 from '../img/arnaud-jaegers-IBWJsMObnnU-unsplash.jpg';
import admin from '../img/unauthorized-person.png';


class HomeScreen extends React.PureComponent{
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
            console.log("login")
        }
    }
    // async componentDidUpdate(){
    //     if(this.state.boothList == null){
    //         await this.fetchList();
    //     }
    // }
    fetchList = () => {
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
            .then((data) => this.setState({ boothList: data }))
            .then(() => console.log(this.state.boothList[0]))
            .then(() => {
                if(this.state.boothList[0] != undefined){
                    this.setState({electionname: this.state.boothList[0].electionname})
                }
            });
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
                .then((data) => this.setState({ boothName: data[0], collage: data[3] }, console.log("data :" + JSON.stringify(data))))
                .then(() => this.fetchList());
        } catch (e) {
            alert(e.message)
        }
    }
    CreateElection = () => {
        if(this.state.electionname != ''){
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
                    .then((data) => console.log(data.reason))
                    .then(() => this.setState({showModal: false}))
                    .then(() => window.location.reload());
            } catch (e) {
                alert(e.message)
            }
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
            window.location.reload();
        } catch (e) {
            alert(e.message)
        }
    }
    handleElection = () =>{
        console.log(this.state.electionname)
        console.log(this.state.boothName)
        try{
            fetch("http://localhost/Voteing/backend/deleteElection", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    electionname: this.state.electionname,
                    boothname: this.state.boothName,
                }),
            }).then((res) => res.json());
            // .then((data) => console.log("del :"+data))
            window.location.reload();
        } catch(e){
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
                <div className="w-100 d-flex flex-row justify-content-center align-items-center pl-2" style={{ height: '25vh',backgroundColor:'#05c555' }}>
                    {/* <div style={{ height: '20vh', width: '20vh' }}>
                        <img className="p-3" style={{ height: '100%', width: '100%' }} alt="" src={Logo} />
                    </div> */}
                    <div className="d-flex flex-column justify-content-center align-items-center">
                        <span style={{ fontSize: '3em', color: 'white' }} className="font-weight-bold">ELECTS</span>
                        <span style={{ color: 'white',fontSize:'1.5em'}} className="font-smaller">The most popular voting website for creating polls & scheduling</span>
                        {/* <span style={{ color: 'white' }} className="font-smaller">creating polls & scheduling</span> */}
                    </div>
                </div>

                <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: '75vh', width: '100vw' }}>
                    <div className="col-3 d-flex flex-column justify-content-center align-items-center h-100 border">
                        <span className="mb-4" style={{fontWeight:'bold',fontSize:20}}>Profile</span>
                        <div className="d-flex justify-content-center align-items-center" style={{height:100,width:100,borderRadius:100/2}}>
                            <img style={{ height: '100%', width: '100%'}} alt="" src={admin} />
                        </div>
                        <div className="d-flex flex-column p-3 align-items-center">
                            <span className="p-1 font-weight-bolder">{window.localStorage.getItem('admin')}</span>
                            <span className="p-1">{this.state.boothName}</span>
                            <span className="p-1">{this.state.collage}</span>
                        </div>
                    </div>
                    <div className="col-9 h-100 d-flex justify-content-center align-items-center">
                    {
                        this.state.boothList == '' ? (
                            <div className="m-2 d-flex flex-column bg-primary" style={{ height: '50vh', width: '90%', borderRadius: 8 }}>
                        <div className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '100%' }}>
                            {/* <img id="img1" style={{ height: '100%', width: '100%' }} alt="" src={icon1} /> */}
                            <div type="button" onClick={this.addElection} className="position-absolute d-flex">
                                <span style={{fontSize:90,fontWeight:'bold',color:'white',textTransform:'uppercase'}}>create elect</span>
                            </div>
                        </div>
                    </div>
                        ):(
                            this.state.boothList.map((value, index) => {
                                return (
                                    <div className="m-2 d-flex flex-column justify-content-center align-items-center"  style={{ height: '50vh', width: '90%', borderRadius: 5}}  key='index'>
                                        <div type="button" className="d-flex justify-content-center align-items-center" style={{ width: '100%', height: '90%' }} onClick={()=>this.handleClick(value.electionname)}>
                                            <img id="img1" style={{ height: '100%', width: '100%'}} src={icon2} />
                                            <span className="text-uppercase font-weight-bold position-absolute" style={{fontSize:80,color:'white'}}>{value.electionname}</span>
                                        </div>
                                        <div className="d-flex flex-row justify-content-lg-between">
                                            <div type="button" onClick={this.handleElection} className="mt-3 p-4 d-flex justify-content-center align-items-center rounded-lg" style={{backgroundColor:'#05c555'}}>
                                                <span className="font-weight-bolder" style={{color:'white'}}>Delete Current Elects</span>
                                            </div>
                                            <div type="button" onClick={() => this.logoutHandle()} className="mt-3 p-4 d-flex justify-content-center align-items-center rounded-lg" >
                                                <span className="font-weight-bolder" style={{color:'#05c555'}}>logout</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                    </div>
                </div>
            </div>
        )
    }
}
export default HomeScreen;


