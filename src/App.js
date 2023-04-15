import * as React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import {useState, useEffect} from 'react';


function ProductCategoryRow({ category }) {
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductRow({ product }) {

  const [result, setResult] = React.useState("primary");
 
  const handleClick = (props) => { 
    if(props === product.correct_answer){
      setResult("success");
    }else{
      setResult("error");
    }    
  }
  const reset = () => {setResult("primary"); }
  let options = product.incorrect_answers
  const randIndex = Math.floor(Math.random() * 4)
  options.splice(randIndex, 0,product.correct_answer)
  let uniqeOptions = [...new Set(options)];
  let formattedOptions = []

  uniqeOptions.forEach((q) => {
    formattedOptions.push(
      <td>
        <Button onClick = {() => handleClick(q)} variant = "contained" color = {result}>{q}</Button>
      </td>
    );
  });

  return (
    <tr>
      <td><Button onClick = {() => handleClick(uniqeOptions[0])} variant = "contained" color = {result}>{uniqeOptions[0]}</Button></td>
      <td><Button onClick = {() => handleClick(uniqeOptions[1])} variant = "contained" color = {result}>{uniqeOptions[1]}</Button></td>
      <td><Button onClick = {() => handleClick(uniqeOptions[2])} variant = "contained" color = {result}>{uniqeOptions[2]}</Button></td>
      <td><Button onClick = {() => handleClick(uniqeOptions[3])} variant = "contained" color = {result}>{uniqeOptions[3]}</Button></td>

    </tr>
  );
}

function QuizTable({ quizList }) {
  const rows = [];
  let lastCategory = null;
  let count = 0
  quizList.forEach((q) => {
    if (q.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={q.category}
          key={q.category} />
      );
    }
    count = count + 1
    rows.push(
      <div>
        <p>{count}. {q.question}</p>
        <ProductRow product={q} />
      </div>
    );

    lastCategory = q.category;
  });

  return (
    <table>
      <tbody>{rows}</tbody>
    </table>
  );
}

//Wraps the Quiz table component
function QuizTableWrapper({ quiz }) {
  return (
    <div>
      <p>Lets GO!</p>
      <QuizTable quizList={quiz} />
    </div>
  );
}


export default function App(){
  //<img src="..\src\TriviaStockImage.jpg" alt = "Homescreen"></img>
  const [triviaData, setTriviaData] = useState([]);

  useEffect(()=> {
    fetch('https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple')
    .then((response) => response.json())
    .then((data)=> setTriviaData(data.results))
    .catch((error) => console.log("Error: ", error))
  },[])

  return (
    <div>
      <div>
          <h1>Welcome to Trivia Trial!</h1>
      </div>
      <div>
        <QuizTableWrapper quiz = {triviaData}/>
      </div>
    </div>
  );
}

const QUESTIONS = {
  "response_code":0,
  "results": [
    {
      "category":"Sports",
      "type":"multiple",
      "difficulty":"easy",
      "question":"Which of the following sports is not part of the triathlon?",
      "correct_answer":"Horse-Riding",
      "incorrect_answers":["Cycling","Swimming","Running"]
    },
    {
      "category":"Geography",
      "type":"multiple",
      "difficulty":"easy",
      "question":"Which of these is the name of the largest city in the US state Tennessee?",
      "correct_answer":"Memphis",
      "incorrect_answers":["Thebes","Alexandria","Luxor"]
    },
      
      {"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"What ingredients are required to make a cake in Minecraft?","correct_answer":"Milk, Sugar, Egg, and Wheat","incorrect_answers":["Milk, Bread, Egg, and Wheat","Milk, Sugar Cane, Egg, and Wheat","Milk, Sugar, and Wheat"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"Which Pokemon generation did the fan-named &quot;Masuda Method&quot; first appear in? ","correct_answer":"Diamond\/Pearl","incorrect_answers":["Ruby\/Sapphire","Black\/White","X\/Y"]},{"category":"Entertainment: Film","type":"multiple","difficulty":"easy","question":"The 2002 film &quot;28 Days Later&quot; is mainly set in which European country?","correct_answer":"United Kingdom","incorrect_answers":["France","Italy","Germany"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"In what year was Hearthstone released?","correct_answer":"2014","incorrect_answers":["2011","2013","2012"]},{"category":"Entertainment: Video Games","type":"multiple","difficulty":"easy","question":"The name of the Metroid series comes from what?","correct_answer":"An enemy in the game","incorrect_answers":["The final boss&#039;s name","The main character&#039;s name","A spaceship&#039;s name"]},{"category":"History","type":"multiple","difficulty":"easy","question":"How old was Adolf Hitler when he died?","correct_answer":"56","incorrect_answers":["43","65","47"]},{"category":"General Knowledge","type":"multiple","difficulty":"easy","question":"What is the name of NASA&rsquo;s most famous space telescope?","correct_answer":"Hubble Space Telescope","incorrect_answers":["Big Eye","Death Star","Millenium Falcon"]},{"category":"Entertainment: Comics","type":"multiple","difficulty":"easy","question":"What&#039;s the race of Invincible&#039;s father?","correct_answer":"Viltrumite","incorrect_answers":["Kryptonian","Kree","Irken"]}]}
