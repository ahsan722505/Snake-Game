import styles from "./Board.module.css";
import { useState,useEffect } from "react";
import { CreateBoard } from "../helpers/util";
import { GetHead } from "../helpers/util";
const BOARD_SIZE=20;
const Board=()=>{
    const [board,setBoard]=useState(CreateBoard(BOARD_SIZE));
    console.log(board);
    const [snakeCells,setSnakeCells]=useState([44,45,46,47]);
    const [direction,setDirection]=useState("Right");
    const HandleKeydown=(e)=>{
        switch (e.key) {
            case "ArrowUp":
                if(direction === "Up" || direction === "Down") break;
                setDirection("Up");
                break;
            case "ArrowDown":
                if(direction === "Up" || direction === "Down") break;
                setDirection("Down");
                break;
            case "ArrowLeft":
                if(direction === "Left" || direction === "Right") break;
                setDirection("Left");
                break;
            case "ArrowRight":
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
    useEffect(()=>{
        const interval=setInterval(()=>{
            SnakeFlow();
        },[100]);

        return ()=>{
            clearInterval(interval);
        }
    },[SnakeFlow]);


    
    
 return(
     <div className={styles.board}>
         {board.map(eachRow=>{
             return(
                <div className={styles.row}>
                    {eachRow.map(eachCell=>{
                        return(
                            <div className={`${styles.cell} ${snakeCells.includes(eachCell) ? styles.snake : ""}`}/>
                                
                            
                        )
                    })}
                </div>
             )
         })}

     </div>
 )
}
export default Board;