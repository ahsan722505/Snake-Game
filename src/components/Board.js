import styles from "./Board.module.css";
import { useState,useEffect } from "react";
import { CreateBoard } from "../helpers/util";
import { GetHead,generateRandom,useInterval,GetTail } from "../helpers/util";
const BOARD_SIZE=20;
const Board=()=>{
    const [board,setBoard]=useState(CreateBoard(BOARD_SIZE));
    const [snakeCells,setSnakeCells]=useState([44,45,46]);
    const [direction,setDirection]=useState("Right");
    const [foodCell,setFoodCell]=useState(null);
    const [startGame,setStartGame]=useState(false);
    const [endGame,setEndGame]=useState(false);
    const [score,setScore]=useState(0);
    (function () {
        // checking if player has lose
        if(!startGame) return;
        if(endGame) return;
        let tempCells=[...snakeCells];
        let head=tempCells.pop();
        if(tempCells.find(each=> each === head)) setEndGame(true);
      })();
    (function () {
        if(endGame) return;
        if(!startGame) return;
        // checking if snake has consumed food
        if(snakeCells.slice(-1)[0] === foodCell){
            // food was consumed
            setScore(state=>state+1);
            setFoodCell(null);
            // spreading tail
            let tempCells=[...snakeCells];
            let firstElement=tempCells[0];
            tempCells.unshift(GetTail(firstElement,direction));
            setSnakeCells(tempCells);
        }
      })();
    const HandleKeydown=(e)=>{
        if(endGame) return;
        switch (e.key) {
            case "ArrowUp":
                if(!startGame) break;
                if(direction === "Up" || direction === "Down") break;
                setDirection("Up");
                break;
            case "ArrowDown":
                if(!startGame) break;
                if(direction === "Up" || direction === "Down") break;
                setDirection("Down");
                break;
            case "ArrowLeft":
                if(!startGame) break;
                if(direction === "Left" || direction === "Right") break;
                setDirection("Left");
                break;
            case "ArrowRight":
                if(!startGame) break;
                if(direction === "Right" || direction === "Left") break;
                setDirection("Right");
                break;
            
        }
    }


    useEffect(()=>{
        window.addEventListener("keydown",HandleKeydown)
        return ()=>{
            window.removeEventListener("keydown",HandleKeydown);
        }

    },[HandleKeydown]);

    const SnakeFlow=()=>{
        let tempCells=[...snakeCells];
        tempCells.shift();
        let lastElement=tempCells.slice(-1)[0];
        tempCells.push(GetHead(lastElement,direction));
        setSnakeCells(tempCells);
    }
    useInterval(()=>{
        if(endGame) return;
        if(!startGame) return;
        SnakeFlow();
    },100)
    const GenerateFood=()=>{
        if(foodCell) return;
        let food;
        while(true){
            food=generateRandom(0,399);
            console.log(food);
            if(!snakeCells.includes(food)) break;
        }
        setFoodCell(food);
    }
    useInterval(()=>{
        if(endGame) return;
        if(!startGame) return;
        GenerateFood();
    },5000);

 return(
     <>
         { !startGame && <button style={{marginBottom : "1rem"}} onClick={()=> setStartGame(true)}>Start Game</button>}
         {endGame && <h1 style={{margin : 0, padding : 0}}>You lose! Reload to play again</h1>}
         { startGame && <h1 style={{margin : 0, padding : 0}} >Score: {score}</h1>}
     
     <div className={styles.board}>
         {board.map(eachRow=>{
             return(
                <div className={styles.row}>
                    {eachRow.map(eachCell=>{
                        return(
                            <div className={`${styles.cell} ${snakeCells.includes(eachCell) ? styles.snake : ""} ${eachCell === foodCell ? styles.food : ""}`}/>
                        )
                    })}
                </div>
             )
         })}

     </div>
     </>
 )
}
export default Board;