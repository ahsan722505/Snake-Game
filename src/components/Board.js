import styles from "./Board.module.css";
import { useState,useEffect } from "react";
import { CreateBoard } from "../helpers/util";
import { GetHead,generateRandom,useInterval,GetTail } from "../helpers/util";
const BOARD_SIZE=20;
const Board=()=>{
    const [board,setBoard]=useState(CreateBoard(BOARD_SIZE));
    const [snakeCells,setSnakeCells]=useState([44,45,46]);
    const [direction,setDirection]=useState("Right");
    const [foodCell,setFoodCell]=useState(288);
    const [startGame,setStartGame]=useState(false);
    const [endGame,setEndGame]=useState(false);
    const [score,setScore]=useState(0);
    const [delay,setDelay]=useState(100);
    
        var elem = document.documentElement;

/* View in fullscreen */
function openFullscreen() {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}
    
    useEffect(()=>{
        // checking if player has lose
        if(!startGame) return;
        if(endGame) return;
        let tempCells=[...snakeCells];
        let head=tempCells.pop();
        if(tempCells.find(each=> each === head)) setEndGame(true);
    },[snakeCells,endGame,startGame]);
    useEffect(()=>{
        if(endGame) return;
        if(!startGame) return;
        // checking if snake has consumed food
        if(snakeCells.slice(-1)[0] === foodCell){
            // food was consumed
            setDelay(state=>state-1);
            setScore(state=>state+1);
            setFoodCell(null);
            // spreading tail
            let tempCells=[...snakeCells];
            let firstElement=tempCells[0];
            tempCells.unshift(GetTail(firstElement,direction));
            setSnakeCells(tempCells);
        }
    },[snakeCells,startGame,endGame,foodCell]);
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
    const SwipeLeft=()=>{
        HandleKeydown({key : "ArrowLeft"})
    }
    const SwipeRight=()=>{
        HandleKeydown({key : "ArrowRight"})
    }
    const SwipeUp=()=>{
        HandleKeydown({key : "ArrowUp"})
    }
    const SwipeDown=()=>{
        HandleKeydown({key : "ArrowDown"})
    }
    useEffect(()=>{
        document.addEventListener('swiped-left',SwipeLeft);
        document.addEventListener('swiped-right',SwipeRight);
        document.addEventListener('swiped-up',SwipeUp);
        document.addEventListener('swiped-down',SwipeDown);
        return ()=>{
            document.removeEventListener('swiped-left',SwipeLeft);
            document.removeEventListener('swiped-right',SwipeRight);
            document.removeEventListener('swiped-up',SwipeUp);
            document.removeEventListener('swiped-down',SwipeDown);
        }
    },[SwipeLeft,SwipeRight,SwipeUp,SwipeDown]);

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
    },delay)
    const GenerateFood=()=>{
        if(foodCell) return;
        let food;
        while(true){
            food=generateRandom(0,399);
            if(!snakeCells.includes(food)) break;
        }
        setFoodCell(food);
    }
    useInterval(()=>{
        if(endGame) return;
        if(!startGame) return;
        GenerateFood();
    },2000);

 return(
     <>
         { !startGame && <button style={{marginBottom : "1rem"}} onClick={()=> {setStartGame(true)
            openFullscreen()
        }}>Start Game</button>}
         {endGame && <h1 style={{margin : 0, padding : 0 , textAlign : "center"}}>You lose! Reload to play again</h1>}
         { startGame && <h1 style={{margin : 0, padding : 0}} >Score: {score}</h1>}
     
     <div className={styles.board}>
         {board.map((eachRow,rowInd)=>{
             return(
                <div key={rowInd} className={styles.row}>
                    {eachRow.map((eachCell,cellInd)=>{
                        return(
                            <div key={cellInd} className={`${styles.cell} ${snakeCells.includes(eachCell) ? styles.snake : ""} ${eachCell === foodCell ? styles.food : ""}`}/>
                        )
                    })}
                </div>
             )
         })}

     </div>
     {/* <div className={styles.mobileBtn}>
         <button className={styles.btnUp} onClick={()=>HandleKeydown({key : "ArrowUp"})}><i className="fas fa-arrow-up"></i></button>
         <div className={styles.btnGroup}>
            <button className={styles.btnLeft} onClick={()=>HandleKeydown({key : "ArrowLeft"})}><i className="fas fa-arrow-left"></i></button>
            <button className={styles.btnRight} onClick={()=>HandleKeydown({key : "ArrowRight"})}><i className="fas fa-arrow-right"></i></button>

         </div>
         <button onClick={()=>HandleKeydown({key : "ArrowDown"})} className={styles.btnDown}><i className="fas fa-arrow-down"></i></button>
     </div> */}
     </>
 )
}
export default Board;