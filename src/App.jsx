import * as tf from "@tensorflow/tfjs";
import * as qna from "@tensorflow-models/qna";
import './App.css';
import { useEffect, useState, useRef } from "react";
import { Fragment } from "react";

function App() {
  const passageRef = useRef(null);
  const questionRef = useRef(null);
  const [answer, setAnswer] = useState();
  const [model, setModel] = useState(null);
  const loadModel = async () => {
    const loadedModel = await qna.load();
    setModel(loadedModel);
    console.log('Model loaded')
  }

  useEffect(()=>{loadModel()}, [])

  const answerQuestion = async (e) =>{
    console.log("AQ called");
    if (e.which === 13 && model !== null ){
    console.log('Question submitted.')
    const passage = passageRef.current.value
    const question = questionRef.current.value
    const answers = await model.findAnswers(question,
    passage)
    setAnswer(answers);
    console.log(answers)
    }
    }
    
    


  return ( 
  <div className="container mt-5">
  <div className="row justify-content-center">
    <div className="col-md-12">
      <div className="card">
        <div className="card-header">
          <h4>Q&A Bot</h4>
        </div>
        <div className="card-body">
          {model == null ?
            <div>
              <div className="text-center">Model Loading</div>
            </div> :
            <Fragment>
              <div className="form-group">
                <label>Passage</label>
                <textarea ref={passageRef} className="form-control" rows="10"></textarea>
              </div>
              <div className="form-group">
                <label>Ask a Question</label>
                <input ref={questionRef} className="form-control" onKeyPress={answerQuestion} />
              </div>
              <div className="form-group">
                <label>Answers</label>
                {answer ? (answer.map((ans,idx)=>
                  <div key={idx}><b>Answer{idx+1} = </b>{ans.text} {ans.score}</div>)):""}
              </div>
            </Fragment>
          }
        </div>
      </div>
    </div>
  </div>
</div>
);
}

export default App;
