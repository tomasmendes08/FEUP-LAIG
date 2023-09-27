% BOT MOVES


% BOT - LEVEL 1

choose_move(GameState, Player, 1, Move):-
  valid_moves(GameState, Player, ListOfMoves),
  length(ListOfMoves, Length),
  random(0, Length, Choice),
  nth0(Choice, ListOfMoves, Move).

% BOT - LEVEL 2

choose_move(GameState, Player, 2, Move):-
  valid_moves(GameState, Player, ListOfMoves),
  bestMove(GameState, ListOfMoves, Move, Player).

% SEES WHAT MOVE OUT OF THE POSSIBLE GET THE MOST POINTS

bestMove(GameState, ListOfMoves, BestMove, Player):-
  setof(Value-NextGameState-Move,(member(Move, ListOfMoves), botTestMove(GameState, Move, NextGameState),value(NextGameState, Player, Value)) , MoveValues),
  reverse(MoveValues, Reversed),
  nth0(0, Reversed, NiceMove),
  NiceMove = Value-_-BestMove.
  

botTestMove(GameState, Move, NextGameState):-
    nth0(0, Move, SelectCol),
    nth0(1, Move, SelectRow),
    nth0(2, Move, MoveCol),
    nth0(3, Move, MoveRow),
    movePiece(GameState, SelectCol, SelectRow, MoveCol, MoveRow, NextGameState).