% CHECKS IF CELL BELONGS TO A PLAYER 

checkPlayer(L, black):- nth0(0, L, black).
checkPlayer(L, white):- nth0(0, L, white).
checkPlayer(_L, _):- fail.



% CHECKS IF PIECE IS NOT EMPTY

checkPiece(Piece):- Piece \= [empty].



% CHECKS IF PIECE IS EMPTY

checkEmptyContent(Content):- Content == [empty].



% GET THE CELL AT CERTAIN COORDINATES

getMatrixAt(Row, Col, Matrix, Cell):-
  nth0(Row, Matrix, MatrixRow),
  nth0(Col, MatrixRow, Cell).



% FINDS THE LIST OF ALL VALID MOVES

valid_moves(GameState, Player, ListOfMoves):-
  findall(
    [X,Y,X1,Y1], (getMatrixAt(Y, X, GameState, Content),
    checkMoves(GameState, Player, X, Y, X1, Y1), 
    checkPlayer(Content, Player)), 
    ListOfMoves
  ).



% REPLACES THE CELL WITH NEW PIECE

replaceCell([L|Ls] , 0 , Y , Z , [R|Ls]) :- 
  replace_column(L,Y,Z,R).              

replaceCell( [L|Ls] , X , Y , Z , [L|Rs] ) :- 
  X > 0 ,                                
  X1 is X-1 ,                             
  replaceCell( Ls , X1 , Y , Z , Rs ).    

replace_column([C|Cs] , 0 , Z , [Ln|Cs]):-  
  append(Z, C, Ln).
replace_column([C|Cs] , Y , Z , [C|Rs]) :- 
  Y > 0 ,                                 
  Y1 is Y-1 ,                             
  replace_column( Cs , Y1 , Z , Rs ). 



% REPLACES THE CELL WITH AN EMPTY SLOT

replaceEmpty([L|Ls] , 0 , Y , Z , [R|Ls]) :-
  replace_columnempty(L,Y,Z,R).
replaceEmpty( [L|Ls] , X , Y , Z , [L|Rs] ) :-
  X > 0 ,                                 
  X1 is X-1 ,                             
  replaceEmpty( Ls , X1 , Y , Z , Rs ).    

replace_columnempty([_|Cs] , 0 , Z , [Z|Cs]).
replace_columnempty([C|Cs] , Y , Z , [C|Rs]) :- 
  Y > 0 ,                                  
  Y1 is Y-1 ,                              
  replace_columnempty( Cs , Y1 , Z , Rs ).      


% PRINTS THE NUMBER OF POINTS EACH PLAYER HAS

iterationPrint(GameState):-
    value(GameState, white, WhitePoints),
    format('\n~w points  = ~w\n', [white, WhitePoints]),
    value(GameState, black, BlackPoints),
    format('\n~w points  = ~w\n', [black, BlackPoints]).


value([], _, 0).

value([H|T],Player, BoardPoints):-
    iterateLine(H, Player, LinePoints),
    value(T, Player, TailPoints),
    BoardPoints is LinePoints + TailPoints.

iterateLine([], _, 0).

iterateLine([H|T], Player, LinePoints):-
    iterateCell(H, Player, CellPoints),
    iterateLine(T, Player, TailLinePoints),
    LinePoints is CellPoints + TailLinePoints.

iterateCell([], _, 0).

iterateCell(Cell, Player, Points):-
    (
    checkPlayer(Cell, Player),
    count(green, Cell, Points)
    ;
    Points is 0
    ).



% COUNTS THE AMOUNT OF GREENS IN A CELL

count(_, [], 0).
count(X, [X | T], N) :-
  !, count(X, T, N1),
  N is N1 + 1.
count(X, [_ | T], N) :-
  count(X, T, N).


% CHECKS IF GAMEOVER FLAG IS ON

checkGameOver(Check1):-
    Check1 == 1.



% CHECKS IF YOU CHOSE YOUR PIECE

validateFirstPiece(GameState, Player, Row, Col):-
  getMatrixAt(Row, Col, GameState, Content),
  checkPlayer(Content, Player).



% CHECKS IF MOVE IS POSSIBLE
    % VERTICAL

checkMoves(GameState, Player, SelectCol, SelectRow, MoveCol, MoveRow):-
  getMatrixAt(SelectRow, SelectCol, GameState, _SelectContent),
  getMatrixAt(MoveRow, MoveCol, GameState, MoveContent),
  checkPiece(MoveContent),
  SelectCol == MoveCol,
  (
    SelectRow < MoveRow -> AuxRow is MoveRow - SelectRow, AuxRow < 6, checkDownPieces(GameState, Player, MoveCol, MoveRow, AuxRow);
    AuxRow is SelectRow - MoveRow, AuxRow < 6, checkUpPieces(GameState, Player, MoveCol, MoveRow, AuxRow)
  ).
  
    % HORIZONTAL
checkMoves(GameState, Player, SelectCol, SelectRow, MoveCol, MoveRow):-
  getMatrixAt(SelectRow, SelectCol, GameState, _SelectContent),
  getMatrixAt(MoveRow, MoveCol, GameState, MoveContent),
  checkPiece(MoveContent),
  SelectRow == MoveRow,
  (
    SelectCol < MoveCol -> AuxCol is MoveCol - SelectCol, AuxCol < 6, checkRightPieces(GameState, Player, MoveCol, MoveRow, AuxCol);
    AuxCol is SelectCol - MoveCol, AuxCol < 6, checkLeftPieces(GameState, Player, MoveCol, MoveRow, AuxCol) 
  ).



% CHECKS IF THERE ARE NO PIECES BETWEEN SELECTED PIECE AND MOVE LOCATION

checkLeftPieces(_GameState, _Player, _MoveCol, _MoveRow, 1).

checkLeftPieces(GameState, Player, MoveCol, MoveRow, AuxCol):-
  Aux is MoveCol + 1,
  getMatrixAt(MoveRow, Aux, GameState, Content),
  checkEmptyContent(Content),
  Aux2 is AuxCol - 1, 
  checkLeftPieces(GameState, Player, Aux, MoveRow, Aux2).


checkRightPieces(_GameState, _Player, _MoveCol, _MoveRow, 1).

checkRightPieces(GameState, Player, MoveCol, MoveRow, AuxCol):-
  Aux is MoveCol - 1,
  getMatrixAt(MoveRow, Aux, GameState, Content),
  checkEmptyContent(Content),
  Aux2 is AuxCol - 1, 
  checkRightPieces(GameState, Player, Aux, MoveRow, Aux2).


checkUpPieces(_GameState, _Player, _MoveCol, _MoveRow, 1).

checkUpPieces(GameState, Player, MoveCol, MoveRow, AuxRow):-
  Aux is MoveRow + 1,
  getMatrixAt(Aux, MoveCol, GameState, Content),
  checkEmptyContent(Content),
  Aux2 is AuxRow - 1, 
  checkUpPieces(GameState, Player, MoveCol, Aux, Aux2).
  

checkDownPieces(_GameState, _Player, _MoveCol, _MoveRow, 1).

checkDownPieces(GameState, Player, MoveCol, MoveRow, AuxRow):-
  Aux is MoveRow - 1,
  getMatrixAt(Aux, MoveCol, GameState, Content),
  checkEmptyContent(Content),  %se na casa acima estiver uma peça, falha
  Aux2 is AuxRow - 1, 
  checkDownPieces(GameState, Player, MoveCol, Aux, Aux2).



% CHECK IF THERE IS ANY POSSIBLE MOVE FOR PLAYER X

contentAnyFound(Col, Row, Player, GameState):-
  contentRightFound(Col, Row, Player, GameState)
  ;
  contentLeftFound(Col, Row, Player, GameState)
  ;
  contentUpFound(Col, Row, Player, GameState)
  ;
  contentDownFound(Col, Row, Player, GameState).

contentAnyFound(_, _, Player, _):-
  format('\nNo moves for ~w\n', Player),
  fail.


% RIGHT SIDE

contentRightFound(Col, Row, Player, GameState):-
  Row < 6,
  Col < 5,
  getMatrixAt(Row, Col, GameState, CellContent),
  checkPlayer(CellContent, Player),
  AuxCol is Col + 1,
  contentRightFoundAux(AuxCol, Row, Player, GameState).

contentRightFound(Col, Row, Player, GameState):-
  Row < 6,
  Col < 5,
  AuxCol2 is Col + 1,
  contentRightFound(AuxCol2, Row, Player, GameState).

contentRightFound(Col, Row, Player, GameState):-
  Row < 6,
  Col >= 5,
  AuxRow is Row + 1,
  contentRightFound(0, AuxRow, Player, GameState).

contentRightFound(_, _, _, _):-
  fail.

contentRightFoundAux(Col, Row, _Player, GameState):-
  Col < 6,
  getMatrixAt(Row, Col, GameState, ContentRight),
  checkPiece(ContentRight).

contentRightFoundAux(Col, Row, Player, GameState):-
  Col < 6,
  AuxCol is Col + 1,
  contentRightFoundAux(AuxCol, Row, Player, GameState).


% LEFT SIDE

contentLeftFound(Col, Row, Player, GameState):-
  Row < 6,
  Col < 6,
  getMatrixAt(Row, Col, GameState, CellContent),
  checkPlayer(CellContent, Player),
  AuxCol is Col - 1,
  contentLeftFoundAux(AuxCol, Row, Player, GameState).

contentLeftFound(Col, Row, Player, GameState):-
  Row < 6,
  Col < 6,
  AuxCol2 is Col + 1,
  contentLeftFound(AuxCol2, Row, Player, GameState).

contentLeftFound(Col, Row, Player, GameState):-
  Row < 6,
  Col >= 6,
  AuxRow is Row + 1,
  contentLeftFound(1, AuxRow, Player, GameState).

contentLeftFound(_, _, _, _):-
  fail.


contentLeftFoundAux(Col, Row, _Player, GameState):-
  Row < 6,
  Col > -1,
  getMatrixAt(Row, Col, GameState, ContentLeft),
  checkPiece(ContentLeft).

contentLeftFoundAux(Col, Row, Player, GameState):-
  Row < 6,
  Col > -1,
  AuxCol is Col - 1,
  contentLeftFoundAux(AuxCol, Row, Player, GameState).



% DOWN SIDE

contentDownFound(Col, Row, Player, GameState):-
  Row < 6,
  Col < 6,
  getMatrixAt(Row, Col, GameState, CellContent),
  checkPlayer(CellContent, Player),
  AuxRow is Row + 1,
  contentDownFoundAux(Col, AuxRow, Player, GameState).

contentDownFound(Col, Row, Player, GameState):-
  Row < 6,
  Col < 6,
  AuxRow2 is Row + 1,
  contentDownFound(Col, AuxRow2, Player, GameState).

contentDownFound(Col, Row, Player, GameState):-
  Row >= 6,
  Col < 6,
  AuxCol is Col + 1,
  contentDownFound(AuxCol, 0, Player, GameState).

contentDownFound(_, _, _, _):-
  fail.

contentDownFoundAux(Col, Row, _Player, GameState):-
  Row < 6,
  getMatrixAt(Row, Col, GameState, ContentDown),
  checkPiece(ContentDown).

contentDownFoundAux(Col, Row, Player, GameState):-
  Row < 6,
  AuxRow is Row + 1,
  contentDownFoundAux(Col, AuxRow, Player, GameState).



% UP SIDE

contentUpFound(Col, Row, Player, GameState):-
  Row < 6,
  Col < 6,
  getMatrixAt(Row, Col, GameState, CellContent),
  checkPlayer(CellContent, Player),
  AuxRow is Row - 1,
  contentUpFoundAux(Col, AuxRow, Player, GameState).

contentUpFound(Col, Row, Player, GameState):-
  Row < 6,
  Col < 6,
  AuxRow2 is Row + 1,
  contentUpFound(Col, AuxRow2, Player, GameState).

contentUpFound(Col, Row, Player, GameState):-
  Row >= 6,
  Col < 6,
  AuxCol is Col + 1,
  contentUpFound(AuxCol, 0, Player, GameState).

contentUpFound(_, _, _, _):-
  fail.

contentUpFoundAux(Col, Row, _Player, GameState):-
  Row > -1,
  getMatrixAt(Row, Col, GameState, ContentUp),
  checkPiece(ContentUp).

contentUpFoundAux(Col, Row, Player, GameState):-
  Row > -1,
  AuxRow is Row - 1,
  contentUpFoundAux(Col, AuxRow, Player, GameState).



