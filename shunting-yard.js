/*
Stack (mit LIFO-Prinzip) sowie Ausgabequeue (mit FIFO-Prinzip) anlegen.
SOLANGE Tokens verfügbar sind:
    Token einlesen.
    WENN Token IST-Zahl:
        Token ZU Ausgabe.
    ENDEWENN
    WENN Token IST-Funktion:
        Token ZU Stack.
    ENDEWENN
    WENN Token IST-Argumenttrennzeichen:
        BIS Stack-Spitze IST öffnende-Klammer:
            Stack-Spitze ZU Ausgabe.
            FEHLER-BEI Stack IST-LEER:
                GRUND (1) Ein falsch platziertes Argumenttrennzeichen.
                GRUND (2) Der schließenden Klammer geht keine öffnende voraus.
            ENDEFEHLER
        ENDEBIS
    ENDEWENN
    WENN Token IST-Operator
        SOLANGE Stack IST-NICHT-LEER UND
                Stack-Spitze IST Operator UND
                (Präzedenz von Token IST-KLEINER Präzedenz von Stack-Spitze ODER
                 Präzedenz von Token IST-GLEICH Präzedenz von Stack-Spitze UND
                 Token IST-linksassoziativ)
            Stack-Spitze ZU Ausgabe.
        ENDESOLANGE
        Token ZU Stack.
    ENDEWENN
    WENN Token IST öffnende-Klammer:
        Token ZU Stack.
    ENDEWENN
    WENN Token IST schließende-Klammer:
        BIS Stack-Spitze IST öffnende-Klammer:
            FEHLER-BEI Stack IST-LEER:
                GRUND (1) Der schließenden Klammer geht keine öffnende voraus.
            ENDEFEHLER
            Stack-Spitze ZU Ausgabe.
        ENDEBIS
        Stack-Spitze (öffnende-Klammer) entfernen
        WENN Stack-Spitze IST-Funktion:
            Stack-Spitze ZU Ausgabe.
        ENDEWENN
    ENDEWENN
ENDESOLANGE
BIS Stack IST-LEER:
    FEHLER-BEI Stack-Spitze IST öffnende-Klammer:
        GRUND (1) Es gibt mehr öffnende als schließende Klammern.
    ENDEFEHLER
    Stack-Spitze ZU Ausgabe.
ENDEBIS
(Quelle: https://de.wikipedia.org/wiki/Shunting-yard-Algorithmus)
*/

let input = [];
const operatorStack = [];
const output = []; 

const userInput = document.querySelector('input.userInput');
const button = document.querySelector('button.button');

const inputDisplay = document.querySelector('.inputDisplay');
const operatorStackDisplay = document.querySelector('.operatorStackDisplay');
const outputDisplay = document.querySelector('.outputDisplay');

function zerlegeUserInput() {
    const userInputString = userInput.value;

    // \d+([.,]\d+)?  => findet Zahlen (auch mit Komma oder Punkt, z.B. 4,6 oder 32)
    // [+\-*/:()]     => findet die Operatoren +, -, *, /, : sowie Klammern ( )
    // g              => kontrolliert den kompletten String, bricht nicht ab, wenn die RegEx erfüllt ist
    const regex = /\d+([.,]\d+)?|[+\-*/:()]/g;

    input = userInputString.match(regex);

    inputDisplay.textContent = JSON.stringify(input);
}

button.addEventListener('click', zerlegeUserInput);