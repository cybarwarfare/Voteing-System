import React from 'react';
import { Form, Button, Modal, img, DropdownButton, Dropdown } from 'react-bootstrap';
import Logo from '../img/raise-hand.png';
import voter from '../img/vote (1).png';
import check from '../img/check.png';
import add from '../img/plus.png';

class resultScreen extends React.Component {
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

    backButton = () => {
        this.props.history.push("/");
    };

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

    render() {
        console.log("render data :" + JSON.stringify(this.state.Member))
        return (
            <div className="d-flex flex-column" style={{ height: '100vh', width: '100vw', backgroundColor: 'white' }}>
            <div className=" w-100 d-flex flex-row justify-content-center align-items-center pl-2" style={{ height: '25vh',backgroundColor:'#05c555' }}>
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
                </div>
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center" style={{ height: '65vh', width: '100vw' }}>
                <div className="col-10 d-flex flex-row justify-content-start align-items-center" style={{ height: '65vh' }}>
                    <div className="m-1 rounded-lg d-flex flex-column" style={{ width: 240, backgroundColor: 'white' }}>
                        <Form.Label className="font-weight-bold">Chairman</Form.Label>
                        {
                            this.state.Chairman.map((value, index) => {
                                return (
                                    <div className="p-0" key="index">
                                        <div className="d-flex justify-content-center align-items-center container-fluid" style={{width:240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == '#99bbff' ? 'blue' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                            <span className="text-uppercase" style={{ color: 'black', fontWeight: 'bold', fontSize: '1em' }}>{value.name}({value.party}) : {value.vote}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="m-1 rounded-lg d-flex flex-column" style={{ width: 240, backgroundColor: 'white' }}>
                        <Form.Label className="font-weight-bold">Secretary</Form.Label>
                        {
                            this.state.Secretary.map((value, index) => {
                                return (
                                    <div className="p-0" key="index">
                                        <div className="d-flex justify-content-center align-items-center container-fluid" style={{width:240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == '#99bbff' ? 'blue' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                            <span className="text-uppercase" style={{ color: 'black', fontWeight: 'bold', fontSize: '1em' }}>{value.name}({value.party}) : {value.vote}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="m-1 rounded-lg d-flex flex-column" style={{ width: 240, backgroundColor: 'white' }}>
                        <Form.Label className="font-weight-bold">Treasury</Form.Label>
                        {
                            this.state.Treasury.map((value, index) => {
                                return (
                                    <div className="p-0" key="index">
                                        <div className="d-flex justify-content-center align-items-center container-fluid" style={{width:240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == '#99bbff' ? 'blue' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                            <span className="text-uppercase" style={{ color: 'black', fontWeight: 'bold', fontSize: '1em' }}>{value.name}({value.party}) : {value.vote}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div className="m-1 rounded-lg d-flex flex-column" style={{width: 240, backgroundColor: 'white' }}>
                        <Form.Label className="font-weight-bold">Board Member</Form.Label>
                        {
                            this.state.Member.map((value, index) => {
                                return (
                                    <div className="p-0" key="index">
                                        <div className="d-flex justify-content-center align-items-center container-fluid" style={{width:240, height: 80, backgroundColor: value.party == 'sfi' ? "#ff8080" : value.party == '#99bbff' ? 'blue' : value.party == 'nda' ? '#ffff99' : '#99ff99' }}>
                                            <span className="text-uppercase" style={{ color: 'black', fontWeight: 'bold', fontSize: '1em' }}>{value.name}({value.party}) : {value.vote}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        )
    }
}
export default resultScreen;