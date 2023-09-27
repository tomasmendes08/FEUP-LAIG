class MyGameOrchestrator extends CGFobject{
    constructor(scene){
        super(scene);
        this.graph = new MySceneGraph("LAIG_TP3_T4_G04.xml", scene);
        
        this.prologInterface = new MyPrologInterface(this.scene);
        
        //this.player = player;
        
        this.firstPiece = true;

        this.nextBoard;
        
    }

    changePlayer(){
        if(this.player == "black") this.player = "white";
        else this.player = "black";
        //console.log(this.player);
        var listOfMoves;
        this.prologInterface.checkValidMoves(this.getBoardForProlog(), listOfMoves);
        

        this.startTile = null;
        this.destinationTile = null;
    }

    startGame(){
        this.board = new MyBoard(this.scene);
        this.player = "white";
        this.startTile = null;
        this.startBoard = true;
        this.endGame = 0;
        this.auxEndGame = false;
        this.allBoards = [];
        this.addFirstBoard();

        var listOfMoves;
        this.prologInterface.checkValidMoves(this.getBoardForProlog(), listOfMoves);
    }
    
    logPicking(results) {

        if (results != null && results.length > 0) {
            for (var i = 0; i < results.length; i++) {
                //console.log(results[i][0]);
                if (results[i][0]) {
                    /*if(this.startBoard == true){
                        var listOfMoves;
                        this.prologInterface.checkValidMoves(this.getBoardForProlog(), listOfMoves);
                    }*/
                    var list = ['0','1','2','3','4','5'];
                    var customId = results[i][1].toString();
                    var cell = [customId[0]-1, customId[1]-1];
                    //console.log(cell);
                    this.OnMoveSelected(cell);
                    var squareId = list[customId[0]-1]+customId[1];
                    
                    //this.makeMove(move);
                }
            }
            results.splice(0, results.length);
        }

        return cell;
    }

    arraysEqual(a, b) {
        if (a === b) return true;
        if (a == null || b == null) return false;
        if (a.length !== b.length) return false;
      
        // If you don't care about the order of the elements inside
        // the array, you should sort both arrays here.
        // Please note that calling sort on an array will modify that array.
        // you might want to clone your array first.
      
        for (var i = 0; i < a.length; ++i) {
          if (a[i] !== b[i]) return false;
        }
        return true;
    }

    OnMoveSelected(tile){ 
        
        if(this.firstPiece == true){
            this.firstPiece = false;
            
            this.startTile = tile;
            //console.log(this.startTile);
        }
        else{
            this.firstPiece = true;
            
            this.destinationTile = tile;
            //console.log(this.destinationTile);
            
            
            var aux = [];
            aux.push(this.startTile[0], this.startTile[1], this.destinationTile[0], this.destinationTile[1]);
            //console.log(aux);

            
            for(let i = 0; i < this.prologInterface.possibleMoves.length; i++){
                //console.log(this.prologInterface.possibleMoves[i]);
                if(this.arraysEqual(aux, this.prologInterface.possibleMoves[i]) == true){
                    console.log("move exists");
                    this.prologInterface.makeMovePieceRequest(this.getBoardForProlog(), this.startTile[0], this.startTile[1], this.destinationTile[0], this.destinationTile[1]);
                    //if(this.checkEndGame() == true) console.log("game ended !!!");
                    //console.log(this.prologInterface.possibleMoves);
                }
                else{
                    console.log("invalid move");
                    /*this.startTile = [];
                    this.destinationTile = [];*/
                }
            }

                //this.movePiece(new MyGameMove(this.scene,this.startTile.getStack(),this.startTile, this.graph.board));
        }
            
            //console.log(this.getBoardForProlog());
            //this.changeTurn();
        
    }

    addFirstBoard(){
        var temp = [];
        var auxCol = 0;
        var auxRow = 0;
        var temp2 = [];

        for(let i = 0; i < this.board.tiles.length; i++){
            
            temp2.push(this.board.tiles[auxRow][auxCol].stack[0]);
            temp.push(temp2);
            //console.log(temp);
            temp2 = [];

            if(auxCol == 5){
                auxCol = 0;
                auxRow += 1;
            }
            else auxCol += 1;

            if(auxRow == 6) break;

            if(i == 5) i = 0;
        }

        this.allBoards.push(temp);
    }

    getBoardForProlog(){
        let temp = "[";
        if(this.startBoard == true){
            for(let x = 0; x < 6; x++){
                temp += "[";
                for(let y = 0; y < 6; y++){
                    temp += "[";
                    for(let t = 0; t < this.board.tiles[x][y].stack.length; t++){
                        //console.log(this.board.tiles[x][y].stack[t]);
                        temp += this.board.tiles[x][y].stack[t];
                        if(t != this.board.tiles[x][y].stack.length - 1) temp += ",";
                    }
                    temp +="]";
                    if(y != 5) temp += ",";
                }
                temp +="]";
                if(x != 5) temp += ",";
            }
            temp +="]";
    
            //this.allBoards.push(temp);
            //console.log(this.allBoards);
        }
        else{
            var counter = 1;
            //let temp = "[";
            for(let x = 0; x < 6; x++){
                temp += "[";
                for(let y = 0; y < 6; y++){
                    temp += "[";
                    for(let t = 0; t < this.board.tiles[x][y].stack.length; t++){
                        //console.log(this.board.tiles[x][y].stack[t]);
                        if(this.board.tiles[x][y].stack.length == 1) temp += this.board.tiles[x][y].stack[t];
                        else{
                            temp += this.board.tiles[x][y].stack[this.board.tiles[x][y].stack.length - counter];
                            counter += 1;
                            if(t != this.board.tiles[x][y].stack.length - 1) temp += ",";
                        }
                        //console.log(temp);
                    }
                    counter = 1;
                    temp +="]";
                    if(y != 5) temp += ",";
                }
                temp +="]";
                if(x != 5) temp += ",";
            }
            temp +="]";
        }
        //console.log(temp);
        return temp;
    }

    checkEndGame(){
        var list;
        //console.log(this.getBoardForProlog());
        //this.prologInterface.checkValidMoves(this.getBoardForProlog(), list);
        //console.log(this.prologInterface.possibleMoves);
        
        console.log("aqui");
        console.log(this.prologInterface.possibleMoves.length);
        
    
        if(this.prologInterface.possibleMoves.length == 0){
            console.log("aqui1");
        
            console.log(this.player + " has no moves left");
            
            this.changePlayer();
        
            console.log("aqui2");
        
            /*var list1;
            this.prologInterface.checkValidMoves(this.getBoardForProlog(), list1);*/
        
            console.log("aqui3");
        
            if(this.prologInterface.possibleMoves.length == 0){
                console.log(this.player + " has no moves left");
                return true;
            }
        }
        
        return false;
    }

    display(){
        this.graph.displayScene();
        this.board.display();

        
    }
}