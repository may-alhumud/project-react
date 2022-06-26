import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Question(props) {

    
    const [questions, setQuestions] = useState(props.questions);
    const [score, setScore] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState('N');
    const [currentAnswers, setCurrentAnswers] = useState([]);


    let { index } = useParams();

    


    const renderQuestion = () => {
        if (questions && questions.length) {
            return (<h3>{normalizeString(questions[index - 1].question)}</h3>)
        }
        else {
            return (<h3>Loading</h3>)
        }
    }
    const answerQuestion = (answer) => {
        if (answer === questions[index - 1].correct_answer) {
            setScore(score + 1);
            setCurrentAnswer('C');
        }
        else {
            setCurrentAnswer('I');
        }

    }
    const renderAnswerInfo = () => {
        if (currentAnswer === 'I') {
            return (
                <div>
                    <p style={{ color: 'red' }}>Incorrect answer </p>
                    <p>Correct answer is {questions[index - 1].correct_answer}</p>
                </div>

            )
        }
        else if (currentAnswer === 'C') {
            return (
                <p style={{ color: 'green' }}>Great,  correct answer </p>);
        }
    }
    const shuffleArray = (array) => {

        let currentIndex = array.length, randomIndex;

      
        while (currentIndex != 0) {

          
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;

    }

    const prepareAnswers = () => {
        if (questions && questions.length) {
            var answers = []
            answers = answers.concat(questions[index - 1].incorrect_answers);
            answers.push(questions[index - 1].correct_answer);
            answers = shuffleArray(answers);
            setCurrentAnswer('N');
            setCurrentAnswers(answers);

        }
    }
    useEffect(()=>{
        if (!(currentAnswers && currentAnswers.length)) {
            prepareAnswers();
        }
    })
    const renderAnswers = () => {

       

        if (currentAnswers && currentAnswers.length && currentAnswer === 'N') {


            return currentAnswers.map(x => <li key={normalizeString(x)}>
                <button className="btn aswer-btn" onClick={() => answerQuestion(x)}>
                    {normalizeString(x)}
                </button>


            </li>);
        }
        if (currentAnswers && currentAnswers.length) {

            return currentAnswers.map(x => <li key={normalizeString(x)}>
                <button className="btn aswer-btn" style={questions[index - 1].correct_answer == x ? { backgroundColor: "green" } : { backgroundColor: "red" }}>
                    {normalizeString(x)}
                </button>


            </li>);
        }
    }


    const normalizeString = (s) => {
        s = s.replace(/&quot;/g, '"');
        s = s.replace(/&#039;/g, "'");
        return s;
    }
    return (
        <div>
            <div className="center">Welcome {props.user}</div>
            {
                renderQuestion()
            }
            <ul>
                {
                    renderAnswers()
                }
            </ul>

            <div className="right">
                {index < questions.length ? <Link to={'/question/' + (Number(index) + 1)} className="btn" onClick={() => setCurrentAnswers([])}>Next</Link>
                    : <button className="btn" onClick={()=>props.onEndQuiz(score)}>Score</button>}
            </div>
            <div>
                {renderAnswerInfo()}
            </div>

        </div>
    );
}

export default Question;