import React from 'react';
import { Form, Button, Modal, img } from 'react-bootstrap';
import add from '../img/plus.png';

class VoterScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            party: '',
            Chairman: [],
            Secretary: [],
            Treasury: [],
            Member: [],
            voted_chairman:false,
            voted_Secretary:false,
            voted_Treasury:false,
            voted_Member:false,
            option:'',
            showModal:false,
            status:'',
        }
        
    }
    async componentDidMount(){
        console.log("Mound")
        await this.candidates();
    }
    addElection = (e,state) => {
        console.log(e)
        try {
            this.setState({ option: e,status:  state,showModal: this.state.showModal ? false : true });
        } catch (e) {
            alert(e.message);
        }
    }

    candidates = async () => {
        await this.chairmanList('Chairman');
        await this.chairmanList('Secretary');
        await this.chairmanList('Treasury');
        await this.chairmanList('Member');
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
    handleVote = (e) => {
        fetch("http://localhost/Voteing/backend/vote", {
            method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: e,
                }),
        })
            .then((response) => response.json())
            .then(() => this.setState({[this.state.status]: true}))
            .then(() => this.addElection());
    }
    backButton = e => {
        this.props.history.push("/");
    };
    handleFinish = async() =>{
        try{
            await fetch("http://localhost/Voteing/backend/markVote", {
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: window.localStorage.getItem('voter'),
                }),
            }).then((response) => response.json())
                .then((data) => console.log(data))
                .then(() => {
                        this.props.history.push({pathname: '/'})
                })
        } catch(e){
            alert(e.message);
        }
    }
    componentWillUnmount(){
        this.handleFinish();
    }
    
    render() {
        return (
            <div className="d-flex flex-column" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
                <Modal show={this.state.showModal} onHide={this.addElection} animation={false}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Candidates</Modal.Title>
                    </Modal.Header>
                    <Form className="d-flex justify-content-center align-items-center flex-column p-3">
                        <div>
                            <span>Are You conform</span>
                        </div>
                    </Form>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.addElection}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={() => this.handleVote(this.state.option,this.state.status)}>
                            Conform
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
                    <div className="font-weight-bold">{this.props.location.boothName}</div>
                    <div type="button" className="font-weight-light pr-4"> </div>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '50vh', width: '100vw' }}>
                    <div className="d-flex flex-row justify-content-start align-items-center" style={{ height: '65vh' }}>
                        <div className="m-1 border rounded-lg d-flex flex-column" style={{ width: 240, backgroundColor: 'white',opacity: this.state.voted_chairman == false ? 10: 0.4}}>
                            <Form.Control size="sm" as="select" disabled>
                                <option>Chairman</option>
                                <option>Secretary</option>
                                <option>Treasury</option>
                                <option>Board Member</option>
                            </Form.Control>
                            {
                                this.state.Chairman.map((value, index) => {
                                    return (
                                        <div key={index} className="p-0" key="index" type="button" onClick={() => this.state.voted_chairman == false? this.addElection(value.id,'voted_chairman'):''}>
                                            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ width: 240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == 'ksu' ? '#99bbff' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                                <span className="text-capitalize" style={{ color: 'black', fontWeight: 'bold', fontSize: '1em' }}>{value.name}<span>(</span><span className="text-uppercase">{value.party}</span><span>)</span></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="m-1 border rounded-lg d-flex flex-column" style={{ width: 240, backgroundColor: 'white',opacity: this.state.voted_Secretary == false ? 10: 0.4 }}>
                            <Form.Control size="sm" as="select" disabled>
                                <option>Secretary</option>
                                <option>Treasury</option>
                                <option>Board Member</option>
                            </Form.Control>
                            {
                                this.state.Secretary.map((value, index) => {
                                    return (
                                        <div key={index} className="p-0" key="index" type="button"  onClick={() => this.state.voted_Secretary == false? this.addElection(value.id,'voted_Secretary'):''}>
                                            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ width: 240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == 'ksu' ? '#99bbff' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                                <span className="text-capitalize" style={{ color: 'black', fontWeight: 'bold', fontSize: '1em' }}>{value.name}<span>(</span><span className="text-uppercase">{value.party}</span><span>)</span></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="m-1 border rounded-lg d-flex flex-column" style={{ width: 240, backgroundColor: 'white',opacity: this.state.voted_Treasury == false ? 10: 0.4 }}>
                            <Form.Control size="sm" as="select" disabled>
                                <option>Treasury</option>
                                <option>Board Member</option>
                            </Form.Control>
                            {
                                this.state.Treasury.map((value, index) => {
                                    return (
                                        <div key={index} className="p-0" key="index" type="button" onClick={() => this.state.voted_Treasury == false? this.addElection(value.id,'voted_Treasury'):''}>
                                            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ width: 240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == 'ksu' ? '#99bbff' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                                <span className="text-capitalize" style={{ color: 'black', fontWeight: 'bold', fontSize: '1em' }}>{value.name}<span>(</span><span className="text-uppercase">{value.party}</span><span>)</span></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <div className="m-1 border rounded-lg d-flex flex-column" style={{ width: 240, backgroundColor: 'white',opacity: this.state.voted_Member == false ? 10: .4 }}>
                            <Form.Control size="sm" as="select" disabled>
                                <option>Board Member</option>
                            </Form.Control>
                            {
                                this.state.Member.map((value, index) => {
                                    return (
                                        <div key={index} className="p-0" key="index" type="button"  onClick={() => this.state.voted_Member == false? this.addElection(value.id,'voted_Member'):''}>
                                            <div className="d-flex justify-content-center align-items-center container-fluid" style={{ width: 240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == 'ksu' ? '#99bbff' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                                <span className="text-capitalize" style={{ color: 'black', fontWeight: 'bold', fontSize: '1em' }}>{value.name}<span>(</span><span className="text-uppercase">{value.party}</span><span>)</span></span>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <Button className="rounded-pill pl-4 pr-4" variant="primary" onClick={() => this.handleFinish()}>Finish</Button>
                </div>
            </div>
        )
    }
}
export default VoterScreen;