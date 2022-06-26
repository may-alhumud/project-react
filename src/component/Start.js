import React, { useState } from "react";
import {Link} from "react-router-dom";

function Start(props) {
     //https://opentdb.com/api.php?amount=10&category=17&difficulty=easy&type=multiple
    const [amount, setAmount] = useState(10);
    const [category, setCategory] = useState(9);
    const [difficulty, setDifficulty] = useState("any");
    const [type, setType] = useState('any');
    const [user, setUser] = useState('User');


    const startQuiz = () => {

        if(!amount || amount <= 0)
        {
            alert("Please enter amount of questions");
            return;
        }
        if(!user || user.length <= 0)
        {
            alert("Please enter user name");
            return;
        }
        props.onStartQuiz({'amount':amount,'category':category,
         'difficulty' : difficulty, 'type':type,'user':user});
    }


    return (
        <div className="container">


            <div>
                <label>Number of questions</label>
                <input value={amount} onChange={(event)=>setAmount(event.target.value)} required={true}/>
            </div>
            <div>
                <label>Choose category</label>
              
                <select onChange={(event)=>setCategory(event.target.value)} required={true}>

                    <option value="9">General Knowledge</option>
                    <option value="10">Entertainment: Books</option>
                    <option value="17">Science &amp; Nature</option>
                    <option value="18">Science: Computers</option>
                    <option value="19">Science: Mathematics</option>
                    <option value="22">Geography</option>
                    <option value="23">History</option>
                    <option value="27">Animals</option>
                    <option value="28">Vehicles</option>
                </select>


            </div>
            <div>
                <label>Choose Difficulty</label>
                <select  onChange={(event)=>setDifficulty(event.target.value)} required={true}>
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <div>
                <label>Choose type of questions</label>
                <select onChange={(event)=>setType(event.target.value)} required={true}>
                    <option value="any">Any Type</option>
                    <option value="multiple">Multiple Choice</option>
                    <option value="boolean">True / False</option>
                </select>
            </div>
            <div>
                <label>Enter your name</label>
                <input value={user} onChange={(event)=>setUser(event.target.value)} required={true}/>
            </div>
            <div className="w-full center mt-3">
                
                <button className="btn" onClick={startQuiz}>Start Quiz</button>
            </div>

        </div>
    );
}
export default Start