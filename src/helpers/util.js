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
