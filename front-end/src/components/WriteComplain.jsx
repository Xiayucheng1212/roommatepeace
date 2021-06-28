import React from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {
    Alert, Form, FormGroup,Label,Input, Button
} from 'reactstrap';
import {createComplain} from "../api/complains.js";

import './WriteComplain.css';
import { PropTypes } from 'prop-types';

const voicereason = ['鬧鐘聲','關門','走樓梯下床','講電話'];
const hygienereason = ['丟垃圾','不整理','不掃地'];
const otherreason = ['作息時間','開冷氣','帶朋友回來'];
const clockExpect = ['我每天都被你雞巴美妙的鬧鐘聲叫醒欸','可以設一兩個鬧鐘就好嗎？'];
const closedoorExpect = ['可以輕輕的關門嗎？','要記得關門喔!'];
const walkExpect = ['可以腳步小聲一點嗎?','你下床，我都以為地震來了要快逃'];
const talkExpect = ['可以講話小聲一點嗎？','可以不要這麼晚講電話嗎？']
const trashExpect = ['可以定時記得丟垃圾嗎？','可以不要讓食物臭臭嗎？'];
const cleanExpect = ['可以清理一下個人座位嗎?','哇!哥明明人體積不大啊，怎麼東西整個凸出來擋道路了餒'];
const floorExpect = ['可以把地上頭髮稍微整理整理嗎?','嘿!我們寢要默默鋪上一層頭髮地毯了餒'];
const timeExpect = ['可以在寢室內有人要睡覺時就關燈嗎?','姐，早睡早起對身體好啊!別拉著我一起晚睡惹嘛~'];
const airExpect = ['可以投票決定要不要開冷氣嗎?','心靜自然涼，我們別開冷氣好不好'];
const friendExpect = ['霸托霸脫> < 我帶朋朋回去寢室玩，如果方便，可以把寢室讓給我們嗎?','可以出去望遠凝視一下嘛~謝謝大哥感恩大姊!'];

export default class WriteComplain extends React.Component {
    static propTypes = {
        user: PropTypes.object,
        writeComplainToggle: PropTypes.bool,
        handleWriteComplainToggle: PropTypes.func,
        roommates:PropTypes.array
    };
    constructor(props) {
        super(props);

        this.state = {
            problem:"聲音類",
            reason :"鬧鐘",
            towhom :"",
            expect:"1",
            reasonOption:voicereason
        };
        
        

        this.handleProblem = this.handleProblem.bind(this);
        this.handleReason = this.handleReason.bind(this);
        this.handleExpect = this.handleExpect.bind(this);
        this.handleTowhom = this.handleTowhom.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        if(this.props.roommates.length <= 1){
            this.setState({
                towhom: this.props.user.id //
            })
        }else{
            this.setState({
                towhom: this.props.roommates[0].id
            })
        }
    }

    render() {
        var content;
        if (this.props.writeComplainToggle) {
            content =
                <div className="position-absolute top-50 start-50 translate-middle writeComplain">
                    <div className="icon">
                    </div>
                    <div>
                        <Alert color="secondary">Write A Complain</Alert>
                    </div>
                    <div className="close" onClick={this.props.handleWriteComplainToggle}>
                    </div>
                    <div className="setting" >
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
                                <Label for="towhom">To Who</Label>
                                <Input type="select" name="towhom" id="towhom" onChange={this.handleTowhom}>
                                    {
                                        this.props.roommates.map((item, index)=>{
                                           if(item.id !== this.props.user.id){
                                                return(
                                                    <option key={index} value={item.id}>{item.name}</option>
                                                )
                                           }
                                        })
                                    }
                                </Input>
                            </FormGroup>
                            <Button outline color="primary">Submit</Button>
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
        var expect;
        switch(e.target.value){
            case '鬧鐘聲':
                expect = clockExpect;
                break;
            case '關門':
                expect = closedoorExpect;
                break;
            case '走樓梯下床':
                expect = walkExpect;
                break;
            case '講電話':
                expect = talkExpect;
                break;
            case '丟垃圾':
                expect = trashExpect;
                break;
            case '不整理':
                expect = cleanExpect;
                break;
            case '不掃地':
                expect = floorExpect;
                break;
            case '作息時間':
                expect = timeExpect;
                break;
            case '開冷氣':
                expect = airExpect;
                break;
            case '帶朋友回來':
                expect = friendExpect;
                break;
            default:
                break;
        }
        var num = Math.floor(Math.random()*2);
        this.setState({
            reason:e.target.value,
            expect:expect[num]
        });
    }
    handleTowhom(e){
        this.setState({towhom:e.target.value})
    }
    handleExpect(e){
        this.setState({expect:e.target.value})
    }
    handleSubmit(e){
        e.preventDefault();
        // console.log("ppppp");
        // console.log(this.props.user.id,
        //     this.state.towhom,
        //     this.state.problem,
        //     this.state.reason,
        //    this.state.expect);
        createComplain({
            from_user: this.props.user.id,
            to_user: this.state.towhom,
            problem: this.state.problem,
            reason: this.state.reason,
            expect: this.state.expect
        }).then((cpl)=>{
            this.props.handleWriteComplainToggle();
        })
    }

}
