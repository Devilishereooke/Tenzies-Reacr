import React from 'react'
import "./style.css"
import Die from './Die'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App(){

    const [dice, setDice] = React.useState(allNewDice());
    const [tenzies, setTenzies] = React.useState(false);

    function allNewDice(){
        let newDice = [];
        for(let i = 0; i < 10; i++){
            newDice.push(generateNewDie());
        }
        return newDice;
    }

    React.useEffect(() => {
        let won = 0;
        for(let i = 0; i < 10; i++){
            (dice[i].isHeld && dice[i].value === dice[0].value) && won++;
        }
        if(won===10){
            setTenzies(true);
            console.log("YOU WON!!")
        }
    },[dice])

    function generateNewDie(){
        return{
            value : Math.ceil(Math.random()*6),
            id : nanoid(),
            isHeld : false
        }
    }

    function hold(id){
        setDice((oldDice) => oldDice.map((die) => {
            return(
                die.id === id ? {
                    ...die,
                    isHeld : !die.isHeld
                } : die
            )
        }))
    }

    function handleClick(event){
        if(tenzies){ 
            setDice(allNewDice());
            setTenzies(false);
        }else{
            setDice((oldDice) => oldDice.map((die) => {
                return(
                    die.isHeld ? die : generateNewDie()
                )
            }))
        }
    }
        
    const diceElements = dice.map(die => {
        return(
            <Die value={die.value} key={die.id} isHeld={die.isHeld} hold={() => hold(die.id)} />
        )
    })
    return(
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice--container">
                {diceElements}
            </div>
            <button className='roll--btn' onClick={handleClick}>
                {tenzies ? "New Game" : "Roll"}
            </button>   
        </main>
    )
}