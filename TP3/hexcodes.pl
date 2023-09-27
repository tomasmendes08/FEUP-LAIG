printBoardX(B):-
    nl,
    write('\x250C\\x2500\\x2500\\x2500\\x252C\\x2500\\x2500\\x2500\\x252C\\x2500\\x2500\\x2500\\x252C\\x2500\\x2500\\x2500\\x252C\\x2500\\x2500\\x2500\\x252C\\x2500\\x2500\\x2500\\x252C\\x2500\\x2500\\x2500\\x2510\\n'),
    write('\x2502\   \x2502\ 0 \x2502\ 1 \x2502\ 2 \x2502\ 3 \x2502\ 4 \x2502\ 5 \x2502\\n'),
    write('\x251C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x2524\\n'),
    printLinesX(B, 0).

/*X representa o nmr da linha*/
printLinesX([H], 5):-
    write('\x2502\ '),
    write('5'),
    write(' \x2502\ '),
    printLinesAuxX(H),
    nl,
    write('\x2514\\x2500\\x2500\\x2500\\x2534\\x2500\\x2500\\x2500\\x2534\\x2500\\x2500\\x2500\\x2534\\x2500\\x2500\\x2500\\x2534\\x2500\\x2500\\x2500\\x2534\\x2500\\x2500\\x2500\\x2534\\x2500\\x2500\\x2500\\x2518\\n').

printLinesX([H|T], X):-
    write('\x2502\ '),
    write(X),
    write(' \x2502\ '),
    printLinesAuxX(H),
    nl,
    write('\x251C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x253C\\x2500\\x2500\\x2500\\x2524\\n'),
    X1 is X + 1,
    printLinesX(T, X1).

printLinesAuxX([]).
printLinesAuxX([H|T]):-
    symbol(H, S),
    write(S),
    write(' \x2502\ '),
    printLinesAuxX(T).