

const calcCoordinates = function(){
    let index = 0;
    let array = []
    for(let i = 0; i < 8; i++){
        for(let j = 0; j < 8; j++){
            array[index] = [j,i];
            ++index;
        }
    }
    return array;
}



const  possibleMoves = function(coordinatesArray = calcCoordinates()) {

    let adjacencyList = [];
    const movesAllowed = [[1,2],[2,1],[-1,2],[1,-2],[-2,1],[2,-1],[-1,-2],[-2,-1]];

    for(let i = 0; i < 64; i++){
        let indexCordinates = coordinatesArray[i];
        let arr = [];
        movesAllowed.forEach(element => {
            let x = indexCordinates[0] + element[0];
            let y = indexCordinates[1] + element[1];
            if(((x >= 0)&&(x <= 7))&&((y >= 0)&&( y <= 7))){ 
                arr.push([x,y]);
            }
        });
        adjacencyList[i] = arr
    }
    return adjacencyList;
}

const getIndex = function(element){
    return  (this[0] === element[0])&&(this[1] === element[1]) ? true:false;
}

const knightAdjacencyList = possibleMoves();
console.table(knightAdjacencyList);

const knightMoves = function([a,b],[c,d], adjacencyList = knightAdjacencyList, coordinatesArray = calcCoordinates()){
    let possibleMoves;
    if((a === c)&&(b === d)){
        console.log("Start and End positions are same");
    } else {
        startIndex = coordinatesArray.findIndex(getIndex, [a,b]);
        let queue = []
        let found = false;
        queue.push({moves : adjacencyList[startIndex], previousPosition : [[a,b]] });
        while((queue.length != 0)&&(found === false)){
            possibleMoves = queue.shift()
            possibleMoves.moves.forEach(element => {
                if(found === false){
                    if((c === element[0])&&(d === element[1])){
                        found = true;
                        let previousMove = [element[0],element[1]];
                        possibleMoves.previousPosition = possibleMoves.previousPosition.concat([previousMove]);
                    } else {
                        let previousMove = [element[0],element[1]];
                        queue.push({moves : adjacencyList[coordinatesArray.findIndex(getIndex, [element[0], element[1]])], previousPosition : possibleMoves.previousPosition.concat([previousMove])});
                    }
                }
            }); 
        }
    }
    return possibleMoves.previousPosition;
    
}

console.log(knightMoves([0,0],[7,7]));


    