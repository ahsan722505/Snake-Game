import React, { useState, useEffect, useRef } from 'react';
export const CreateBoard=(BOARD_SIZE)=>{
    let board=[];
    let currentRow=[];
    let counter=0;
    for(let i=0 ; i < BOARD_SIZE ; i++){
        currentRow=[];
        for(let j=0 ; j< BOARD_SIZE ; j++){
            currentRow.push(counter++);
        }
        board.push(currentRow);
    }
    return board;
}
export const  Directions={
    ArrowUp : "Up",
    ArrowDown : "Down",
    ArrowRight : "Right",
    ArrowLeft : "Left",
}
const GetIndex=(number)=>{
    if(String(number).length === 2) return 0;
    if(String(number).length === 3) return 1;
}
const IsDigitOdd=(number)=>{
    if(String(number).length === 1){
        return false;
    }else{
        if(Number(String(number).charAt(GetIndex(number)))%2 !== 0){
            return true;
        }else{
            return false;
        }
    }
}
const IsDigitEven=(number)=>{
    if(String(number).length === 1){
        return true;
    }else{
        if(Number(String(number).charAt(GetIndex(number)))%2 === 0){
            return true;
        }else{
            return false;
        }
    }
}
export const GetHead=(lastElement,Direction)=>{
    if(Direction === "Right"){
        if((lastElement+1)%10 === 0 && IsDigitOdd(lastElement)){
            return lastElement - 19;
        }else{
            return lastElement+1;  
            
        }
    } 
    if(Direction === "Left"){
        if(lastElement % 10 === 0 && IsDigitEven(lastElement)){
            return lastElement +19;
        }else{
            
            return lastElement -1;
        }
    } 
    if(Direction === "Up"){
        if(lastElement >=0 && lastElement <=19){
                return lastElement + 380;
        }else{
            return lastElement - 20;
        }
        
    } 
    if(Direction === "Down"){
        if(lastElement >=380 && lastElement <=399 ){
            return lastElement - 380;
        }else{
            return lastElement + 20;
        }
    } 


}
export const generateRandom=(min = 0, max = 100)=> {

    // find diff
    let difference = max - min;

    // generate random number 
    let rand = Math.random();

    // multiply with difference 
    rand = Math.floor( rand * difference);

    // add with min value 
    rand = rand + min;

    return rand;
}

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
export const GetTail=(firstElement,direction)=>{
    if(direction === "Right"){
        if(firstElement % 10 === 0 && IsDigitEven(firstElement)){
                return firstElement +20;
        }else{

            return firstElement -1;
        }
    }
    if(direction === "Left"){
        if((firstElement+1)%10 === 0 && IsDigitOdd(firstElement)){
            return firstElement -20;
        }else{
            
            return firstElement +1;
        }
    }
    if(direction === "Up"){
        if(firstElement >=380 && firstElement <=399 ){
            return firstElement - 380;
        }else{

            return firstElement +20;
        }
    }
    if(direction === "Down"){
        if(firstElement >=0 && firstElement <=19){
            return firstElement + 380;
    }else{
        
        return firstElement -20;
    }
    }

}


