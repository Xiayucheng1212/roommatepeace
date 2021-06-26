import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Alert, Form, FormGroup,Label,Input, Button
} from 'reactstrap';

import './WriteComplain.css';
import { PropTypes } from 'prop-types';

const voicereason = ['鬧鐘聲','關門','走樓梯下床','講電話'];
const hygienereason = ['丟垃圾','不整理','不掃地'];
const otherreason = ['作息時間','開冷氣','帶朋友回來'];
export default class WriteComplain extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        writeComplainToggle: PropTypes.bool,
        roommates:PropTypes.array
    };
    constructor(props) {
        super(props);

        this.state = {
            problem:"聲音類",
            reason :"",
            towhom :"",
            expect:"",
            reasonOption:voicereason,
            expectOption:[],
        };
        

        this.handleProblem = this.handleProblem.bind(this);
        this.handleReason = this.handleReason.bind(this);
        this.handleExpect = this.handleExpect.bind(this);
        this.handleTowhom = this.handleTowhom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        var content;
        if (this.props.writeComplainToggle) {
            content =
                <div className="position-absolute top-50 start-50 translate-middle writeComplain">
                    <div className="icon">

                    </div>
                    <div className="setting">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label for="state">Select Problem</Label>
                                <Input type="select" name="problem" id="problem" onChange={this.handleProblem}>
                                    <option>聲音類</option>
                                    <option>衛生類</option>
                                    <option>其他</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="reason">Reason</Label>
                                <Input type="select" name="reason" id="reason" onChange={this.handleReason}>
                                    {
                                        this.state.reasonOption.map((item,index)=>{
                                            return <option>{item}</option>
                                        })
                                    }
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="reason">Expect</Label>
                                <Input type="select" name="expect" id="expect" onChange={this.handleExpect}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label for="towhom">To Who</Label>
                                <Input type="select" name="towhom" id="towhom" onChange={this.handleTowhom}>
                                    {
                                        this.props.roommates.map((item, index)=>{
                                            // console.log(item);
                                            return(
                                                <option>{item.user_name}</option>
                                            )
                                        })
                                    }
                                </Input>
                            </FormGroup>
                            <Button outline color="info">Submit</Button>
                        </Form>
                    </div>
                </div>;
        } else {
            content = '';
        }

        return (
            <div>
                {content}
            </div>
        );

    }
    handleProblem(e){
        console.log(e)
        var reasonOp;
        if(e.target.value == "聲音類"){
            reasonOp = voicereason;
        }else if(e.target.value == "衛生類"){
            reasonOp = hygienereason;
        }else{
            reasonOp = otherreason;
        }
        this.setState({
            problem:e.target.value,
            reasonOption:reasonOp
        })
    }
    handleReason(e){
        this.setState({reason:e.target.value})
    }
    handleTowhom(e){
        console.log(e.target.value);
        this.setState({towhom:e.target.value})
    }
    handleExpect(e){
        this.setState({expect:e.target.value})
    }
    handleSubmit(){

    }
}
