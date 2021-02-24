import React,{ Component} from "react";
import "./assets/style.css";
import ReactDom from "react-dom"
import quizeService from "./quizService";
import QuestionBox from "./components/questionBox"
import Result from "./components/result"


class QuizBee extends Component {

    state ={
        questionBank: [],
        score:0,
        responses:0
    }

    getQuestion = () =>{
        quizeService().then(question => {
            this.setState({
                questionBank:question
            });
        });
    }

    componentDidMount(){
        this.getQuestion();
    }

    computeAnswer= (answer,correctAnswer) => {

        if(answer===correctAnswer){
            this.setState({
                score:this.state.score + 1
            })
        }
        this.setState({
            responses:this.state.responses < 5 ?this.state.responses + 1 : 5
        })
    }
    render() {
        return (
            <div className="container">
                <div className="title">QuizBee</div>
                {this.state.questionBank.length > 0 && 
                this.state.responses < 5 && 
                this.state.questionBank.map(({question,answers,correct,questionId})=>
                <QuestionBox question={question} option={answers} key={questionId}
                selected= {answer => this.computeAnswer(answer,correct)}
                />
                )}
                {this.state.responses === 5 ? <Result score={this.state.score} playagain={()=>{

                    this.getQuestion();
                    this.setState({
                        score:0,
                        responses:0
                    })
                }} /> : null}
            </div>
        )
    }
}

ReactDom.render(<QuizBee/>,document.getElementById("root"))