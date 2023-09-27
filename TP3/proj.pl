:- use_module(library('lists')).
:- use_module(library('random')).
:-consult('play.pl').
:-consult('display.pl').
:-consult('input.pl').
:-consult('utils.pl').
:-consult('bot.pl').

%Para começar dar load do proj.pl e usar comando play.

play:-
    write('\33\[2J'),
    write('\n      WELCOME TO GREENER!     \n\n\n'),
    write('1. Play Player vs Player\n'),
    write('2. Play Player vs BotEasy\n'),
    write('3. Play Player vs BotHard\n'),
    write('4. Play Bot vs Bot\n'),
    read(Selection),
    (
    Selection is 1,
    start
    ;
    Selection is 2,
    startPvsBotEasy
    ;
    Selection is 3,
    startPvsBotHard
    ;
    Selection is 4,
    startBotvsBot
    ;
    true
    ).

