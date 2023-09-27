% MAKES A MOVE

move(GameState, Player, MoveDoneGameState):-
    repeat,
        format('\nChoose a ~w Piece!\n\n', Player),
        readFirstInput(_SelectCol, _SelectRow, ConfirmedCol, ConfirmedRow, Player, GameState),
        validateSecondInput(ConfirmedCol, ConfirmedRow, ConfirmedMoveCol, ConfirmedMoveRow, Player, GameState),
        movePiece(GameState, ConfirmedCol, ConfirmedRow, ConfirmedMoveCol, ConfirmedMoveRow, MoveDoneGameState).

% PUTS THE PIECE IN PLACE

movePiece(GameState, ConfirmedCol, ConfirmedRow, ConfirmedMoveCol, ConfirmedMoveRow, MoveDoneGameState):-
    getMatrixAt(ConfirmedRow, ConfirmedCol, GameState, Content),
    getMatrixAt(ConfirmedMoveRow, ConfirmedMoveCol, GameState, _MoveContent),
    replaceEmpty(GameState, ConfirmedRow, ConfirmedCol, [empty], NewGameState),
    replaceCell(NewGameState, ConfirmedMoveRow, ConfirmedMoveCol, Content, MoveDoneGameState).


% READS AND CHECKS THE SELECTED PIECE

readFirstInput(Col, Row, ConfirmedCol, ConfirmedRow, Player, GameState):-
    once(readCol(_C1, Col)),
    once(readRow(_R1, Row)),
    (
        validateFirstPiece(GameState, Player, Row, Col) ->
        (ConfirmedCol is Col, ConfirmedRow is Row);
        (
            nl, write('Must choose a '), write(Player), write(' piece!\n'),
            !,fail
        )
    ).

% READS AND CHECKS THE MOVE LOCATION

validateSecondInput(SelectCol, SelectRow, MoveCol, MoveRow, Player, GameState):-
    write('\nChoose your move:\n'),
    readCol(_C1, MoveCol),
    readRow(_R1, MoveRow),
    (
        checkMoves(GameState, Player, SelectCol, SelectRow, MoveCol, MoveRow)
        ;
        write('\nInvalid move! Try again.\n'), !, fail
    ).


readCol(SelectCol, ConfirmedCol):-
    write('Column: '),
    read(SelectCol),
    checkCol(SelectCol, ConfirmedCol).

readRow(SelectRow, ConfirmedRow):-
    write('Row: '),
    read(SelectRow),
    checkRow(SelectRow, ConfirmedRow).

checkCol(0, ConfirmedCol):- ConfirmedCol=0.
checkCol(1, ConfirmedCol):- ConfirmedCol=1.
checkCol(2, ConfirmedCol):- ConfirmedCol=2.
checkCol(3, ConfirmedCol):- ConfirmedCol=3.
checkCol(4, ConfirmedCol):- ConfirmedCol=4.
checkCol(5, ConfirmedCol):- ConfirmedCol=5.
checkCol(_Col, ConfirmedCol):-
    write('Invalid column\n'),
    write('Select another column:\n'),
    readCol(_Col, ConfirmedCol).

checkRow(0, ConfirmedRow):- ConfirmedRow = 0.
checkRow(1, ConfirmedRow):- ConfirmedRow = 1.
checkRow(2, ConfirmedRow):- ConfirmedRow = 2.
checkRow(3, ConfirmedRow):- ConfirmedRow = 3.
checkRow(4, ConfirmedRow):- ConfirmedRow = 4.
checkRow(5, ConfirmedRow):- ConfirmedRow = 5.
checkRow(_Row, ConfirmedRow):-
    write('Invalid row\n'),
    write('Select another row:\n'),
    readRow(_Row, ConfirmedRow).

