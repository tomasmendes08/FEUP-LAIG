class MyPrologInterface extends CGFobject{
    constructor(scene){
        super(scene);
        this.possibleMoves = [];
        this.movesFlag = false;
    }

    getPrologRequest(requestString, onSuccess, onError, port){
        var requestPort = port || 8081;
        var request = new XMLHttpRequest();
        request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

        request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
        request.onerror = onError || function(){console.log("Error waiting for response");};

        request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        request.send();
    }

    makeRequest(requestString, parseFunction) {                
        // Make Request
        this.getPrologRequest(requestString, parseFunction);
    }
    
    //Handle the Reply
    handleReply(data){
        document.querySelector("#query_result").innerHTML=data.target.response;
    }
    
    makeMovePieceRequest(board, col, row, moveCol, moveRow, updatedBoard){
        
        this.makeRequest("movePiece(" + board + "," + col + "," + row + "," + moveCol + "," + moveRow + ")", updatedBoard => this.parseUpdatedBoard(updatedBoard));

    }

    checkValidMoves(board, listOfMoves){
        console.log(board);
        console.log(this.scene.gameOrchestrator.player);
        this.makeRequest("valid_moves(" + board + "," + this.scene.gameOrchestrator.player + ")", listOfMoves => this.parseListOfMoves(listOfMoves));
        
    }

    parseListOfMoves(data){
        let response = data.target.responseText.slice(1,-1).split(',');
        //console.log(response);
        var flag = false;
        var listOfMovesParsed = [];
        
        var temp = [];
        for(let i = 0; i < response.length; i++){
            if(response[i][0]=="[" && flag == false){
                flag = true;
                temp.push(parseInt(response[i][1]));
            }
            else if(response[i][1]=="]" && flag == true){
                flag=false;
                temp.push(parseInt(response[i][0]));
                listOfMovesParsed.push(temp);
                temp = [];
            }
            else{
                temp.push(parseInt(response[i][0]));
            }
        }

        //console.log(listOfMovesParsed);
        this.possibleMoves = listOfMovesParsed;
        
        //this.movesFlag = true;
        //console.log(this.possibleMoves);
    }

    parseUpdatedBoard(data){
        
        let response = data.target.responseText.slice(2, -2).split(',');
        //console.log(response);
        
        var temp = [];
        var auxBoard = [];


        var flag = false;
        
        if(this.scene.gameOrchestrator.startBoard == true){

            for (let i = 0; i < response.length; i++) {
                //console.log(response[i]);
                    
                    if(response[i][0] != "[" && response[i][response[i].length - 1] == "]" && response[i][response[i].length - 2] == "]"){
                        let auxString3 = response[i].slice(0, -2);
                        console.log(auxString3);
                        if(flag == true){
                            temp.unshift(auxString3); 
                            flag = false;
                            //temp.reverse(temp); 
                            auxBoard.push(temp);
                            //console.log(temp);
                            temp = [];
                        }
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] != "]" && response[i][1] == "["){ //no caso de na primeira coluna haver várias peças
                        let auxString0 = response[i].slice(2, -1);
                        console.log(auxString0);
    
                        if(flag == false){
                            //console.log("aqui");
                            temp.unshift(auxString0);
                            flag = true;
                        }
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] == "]" && response[i][response[i].length - 2] == "]"){//no caso de a tile só ter uma peça
                        let auxString0 = response[i].slice(1, -2);
                        //console.log(auxString0);
                        temp.unshift(auxString0);
    
                        auxBoard.push(temp);
                        //console.log(temp);
                        temp = [];
    
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] == "]" && response[i][1] == "["){ //no caso de a tile só ter uma peça
                        let auxString0 = response[i].slice(2, -1);
                        //console.log(auxString0);
    
                        temp.unshift(auxString0);
    
                        auxBoard.push(temp);
                        //console.log(temp);
                        temp = [];
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] == "]"){   //no caso de a tile só ter uma peça
                        let auxString1 = response[i].slice(1, -1);
                        //console.log(auxString1);
                        temp.unshift(auxString1);
                        
                        auxBoard.push(temp);
                        //console.log(temp);
                        temp = [];
                        
                        
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] != "]"){ //primeiro elemento de uma tile com várias peças
                        let auxString2 = response[i].substr(1);
                        //console.log(auxString2);
                        
                        if(flag == false){
                            //console.log("aqui");
                            temp.unshift(auxString2);
                            flag = true;
                        }
                        
                    }
                    else if(response[i][0] != "[" && response[i][response[i].length - 1] == "]"){ //último elemento de uma tile com várias peças
                        let auxString3 = response[i].slice(0, -1);
                        //console.log(auxString3);
                        if(flag == true){
                            temp.unshift(auxString3);
                            //temp.reverse(temp); 
                            flag = false;
                            //set stack
                            auxBoard.push(temp);
                            //console.log(temp);
                            temp = []
                        }
                    }
                    else{
                        let auxString4 = response[i];
                        temp.push(auxString4);
                    }   
            
                
            }
            this.scene.gameOrchestrator.startBoard = false;

        }
        else{
            //console.log(response);

            for (let i = 0; i < response.length; i++) {
                //console.log(response[i]);
                    
                    if(response[i][0] != "[" && response[i][response[i].length - 1] == "]" && response[i][response[i].length - 2] == "]"){
                        let auxString3 = response[i].slice(0, -2);
                        console.log(auxString3);
                        if(flag == true){
                            temp.push(auxString3); 
                            flag = false;
                            //temp.reverse(temp); 
                            auxBoard.push(temp);
                            //console.log(temp);
                            temp = [];
                        }
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] != "]" && response[i][1] == "["){ //no caso de na primeira coluna haver várias peças
                        let auxString0 = response[i].substr(2);
                        console.log(auxString0);
    
                        if(flag == false){
                            //console.log("aqui");
                            temp.push(auxString0);
                            flag = true;
                        }
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] == "]" && response[i][response[i].length - 2] == "]"){//no caso de a tile só ter uma peça
                        let auxString0 = response[i].slice(1, -2);
                        //console.log(auxString0);
                        temp.push(auxString0);
    
                        auxBoard.push(temp);
                        //console.log(temp);
                        temp = [];
    
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] == "]" && response[i][1] == "["){ //no caso de a tile só ter uma peça
                        let auxString0 = response[i].slice(2, -1);
                        //console.log(auxString0);
    
                        temp.push(auxString0);
    
                        auxBoard.push(temp);
                        //console.log(temp);
                        temp = [];
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] == "]"){   //no caso de a tile só ter uma peça
                        let auxString1 = response[i].slice(1, -1);
                        //console.log(auxString1);
                        temp.push(auxString1);
                        
                        auxBoard.push(temp);
                        //console.log(temp);
                        temp = [];
                        
                        
                    }
                    else if(response[i][0] == "[" && response[i][response[i].length - 1] != "]"){ //primeiro elemento de uma tile com várias peças
                        let auxString2 = response[i].substr(1);
                        //console.log(auxString2);
                        
                        if(flag == false){
                            //console.log("aqui");
                            temp.push(auxString2);
                            flag = true;
                        }
                        
                    }
                    else if(response[i][0] != "[" && response[i][response[i].length - 1] == "]"){ //último elemento de uma tile com várias peças
                        let auxString3 = response[i].slice(0, -1);
                        //console.log(auxString3);
                        if(flag == true){
                            temp.push(auxString3);
                            //temp.reverse(temp); 
                            flag = false;
                            //set stack
                            auxBoard.push(temp);
                            //console.log(temp);
                            temp = []
                        }
                    }
                    else{
                        let auxString4 = response[i];
                        temp.push(auxString4);
                    }   
            
                
            }
            
            var tempArray = [];
            //console.log(this.scene.gameOrchestrator.allBoards[this.scene.gameOrchestrator.allBoards.length - 1][0]);
            for(let i = 0; i < auxBoard.length; i++){
                if(auxBoard[i][0] == "empty"){
                    continue;
                }
                else if(auxBoard[i].length == this.scene.gameOrchestrator.allBoards[this.scene.gameOrchestrator.allBoards.length - 1][i].length){
                    auxBoard[i] = this.scene.gameOrchestrator.allBoards[this.scene.gameOrchestrator.allBoards.length - 1][i];
                }
                else if(auxBoard[i].length == 2){
                    auxBoard[i].reverse(auxBoard[i]);
                }
                else{
                    //console.log(auxBoard[i]);
                    for(let j = 0; j < auxBoard[i].length; j++){
                        tempArray.unshift(auxBoard[i][j]);
                    }
                    //console.log(tempArray)
                    auxBoard[i] = tempArray;
                    tempArray = [];
                }
            }

        }
        //console.log(auxBoard);
        
        this.scene.gameOrchestrator.nextBoard = auxBoard;
        
        this.scene.gameOrchestrator.allBoards.push(this.scene.gameOrchestrator.nextBoard);
        
        this.scene.gameOrchestrator.board.updateBoard(this.scene.gameOrchestrator.nextBoard);
        
        this.scene.gameOrchestrator.changePlayer();

        this.scene.gameOrchestrator.auxEndGame = true; 
        
        

        /*var listOfMoves;
        this.checkValidMoves(this.scene.gameOrchestrator.getBoardForProlog(), listOfMoves);*/
        
        
        //this.scene.gameOrchestrator.gameboard.getPrologBoard(tempArray);
    }

}