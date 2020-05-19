*** Card management ***

Store and allow to add lines of score for a long living card party

** API **

POST /part {name, players[]} 		Create part(name, players)
POST /part/x/score_line 
PUT /part/x/score_line/y  			
DELETE /part/x/score_line/y 

** screens **
1. Create a new game
2. Load a game

** Prerequisite **
Have a mongo locally installed

** install **
$ npm install

$ node server/app.js
