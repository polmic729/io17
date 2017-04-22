## Technologie

* serwer - express.js
* front - czysty HTML + CSS / framework typu Angular, React (do dyskusji czy sie z tym pierdolić)
* baza - MongoDB

## Endpointy

* / - główna aplikacja, forward do /login w przypadku braku zalogowania
* /login - logowanie, forward na /
* /register - rejestracja, forward na /
* /logout - wylogowanie, forward na /login

## Protokół komunikacji

* wiadomości przesyłane przez websocket
* obsługa socketów (serwer i klient) przez socket.io
* konwersacja z daną osobą - pokój o danym id
* pojedynczy komunikat - JSON - { conversation: 'id', message: 'wiadomość', (+ metadane?)}
* jak generować id dla konwersacji (do dyskusji / moje propozycje)
    * user1 i user2 chcą pogadać
    * tworzymy unikalny napis np. concat = "user1||user2"
    * liczymy id = sha256sum(concat)
    * niskie prawdopodobienstwo kolizji
    * łatwo uogólnić na więcej osób doklejając kolejne nicki
    * alternatywnie: w ogóle losować cały hash z randomowych bajtów
* problem: jak autentykować wiadomości odbierane przez websocket?
    * przy zalogowaniu, użytkownik dostaje w cookie od serwera losowy sekret
    * serwer sprawdza przy odbiorze czy sekret zgadza sie z aktualnym sekretem danego nadawcy



