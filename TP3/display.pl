
initialBoard([
[[green], [white], [black,0], [green,1], [black,0], [green,1]],
[[black,0], [green,1], [green,1], [white,0], [green,1], [white,0]],
[[green,1], [white,0], [black,0], [green,1], [black,0], [green,1]],
[[black,0], [white,0], [green,1], [green,1], [green,1], [white,0]],
[[green,1], [green,1], [green,1], [green,1], [white,0], [black,0]],
[[white,0], [white,0], [black,0], [green,1], [black,0], [green,1]]
]).

midgameBoard([
[[white, 0, green,1], [empty,0], [empty,0], [empty,0], [black,0, white, 0, green, 1], [green,1]],
[[empty,0], [empty,0], [black,0,green,1,green,1], [empty,0], [white,0,green,1], [empty,0]],
[[white,0,green,1], [white,0], [black,0], [empty,0], [black,0], [green,1]],
[[empty,0], [empty,0], [white,0,green,1], [green,1], [black,0,green,1], [empty,0]],
[[empty,0], [green,1], [white,0,green,1], [empty,0], [empty,0], [empty,0]],
[[empty,0], [black,0,white,0], [black,0], [green,1], [black,0], [green,1]]
]).

endgameBoard([
[[empty,0], [empty,0], [empty,0], [white, 0,black,0,green,1,black,0,green,1,green,1,green,1], [empty,0], [empty,0]],
[[empty,0], [empty,0], [empty,0], [empty,0], [empty,0], [empty,0]],
[[white, 0,black,0, black,0,green,1,green,1], [empty,0], [empty,0], [empty,0], [empty,0], [empty,0]],
[[empty,0], [empty,0], [black,0,green,1,green,1,white,0,white,0,green,1,green,1,green,1,green,1], [empty,0], [empty,0], [empty,0]],
[[empty,0], [empty,0], [empty,0], [empty,0], [empty,0], [empty,0]],
[[empty,0], [empty,0], [empty,0], [empty,0], [black,0,green,1,green,1,white,0, white,0,green,1,green,1,green,1,green,1], [empty,0]]
]).

testBoard([
[[green,1], [empty,0], [empty,0], [green,1], [empty,0], [green,1]],
[[empty,0], [empty,0], [white,0,green,1], [empty,0], [empty,0], [empty,0]],
[[empty,0], [empty,0], [empty,0], [empty,0], [empty,0], [green,1]],
[[empty,0], [empty,0], [black,0], [empty,0], [empty,0], [empty,0]],
[[empty,0], [black,0,green,1], [empty,0], [empty,0], [empty,0], [empty,0]],
[[empty,0], [empty,0], [empty,0], [empty,0], [empty,0], [black,0,green,1,green,1,green,1]]]).



symbol(green, S):- S='G'.
symbol(empty, S):- S=' '.

symbol(white, S):- S='W'.
symbol(black, S):- S='B'.

symbol(0, S):- S='  '.
symbol(1, S):- S='1 '.
symbol(2, S):- S='2 '.
symbol(3, S):- S='3 '.
symbol(4, S):- S='4 '.
symbol(5, S):- S='5 '.
symbol(6, S):- S='6 '.
symbol(7, S):- S='7 '.
symbol(8, S):- S='8 '.
symbol(9, S):- S='9 '.
symbol(10, S):- S='10'.
symbol(11, S):- S='11'.
symbol(12, S):- S='12'.
symbol(10, S):- S='13'.
symbol(11, S):- S='14'.
symbol(12, S):- S='15'.
symbol(10, S):- S='16'.



printBoard(B):-
    nl,
    write('     |  0  |  1  |  2  |  3  |  4  |  5  |\n'),
    write('-----|-----|-----|-----|-----|-----|-----|\n'),
    printLines(B, 0).

/*X representa o nmr da linha*/
printLines([], 6).
printLines([H|T], X):-
    write('  '),
    write(X),
    write(' '),
    write(' | '),
    printLinesAux(H),
    nl,
    write('-----|-----|-----|-----|-----|-----|-----|\n'),
    X1 is X + 1,
    printLines(T, X1).

printLinesAux([]).
printLinesAux([H|T]):-
    printCell(H),
    write(' | '),
    printLinesAux(T).

printCell([H|T]):-
    symbol(H,S),
    write(S),
    count(green, [H|T], Counter),
    symbol(Counter, S2),
    write(S2).





