import { useState } from "react";
import {Link} from "react-router-dom";

function Score(props) {
    

    return (
        <div className="center score" >
            <h3>
            You answered {props.score} out of {props.total}
            </h3>
            <h2>
                Your rank is { (props.score / props.total * 100) } %
            </h2>
            <br/>
            <br/>
            <Link to={'/'} className="btn">Start Over</Link>
        </div>
    );
}

export default Score;