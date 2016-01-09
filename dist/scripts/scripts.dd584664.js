"use strict";angular.module("snakesAndLadderApp",["ngCookies","ngRoute","ngSanitize","ngTouch"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl as main"}).otherwise({redirectTo:"/"})}]).config(["$sceDelegateProvider",function(a){a.resourceUrlWhitelist(["self",/(mp3|ogg)$/])}]),angular.module("snakesAndLadderApp").factory("board",function(){var a={},b=[[100,60,98,97,47,95,94,93,92,91],[81,82,83,84,85,86,87,49,89,90],[80,79,78,77,6,75,74,73,72,92],[61,62,20,64,65,66,67,68,69,70],[60,59,58,57,98,55,54,11,52,51],[41,42,43,44,45,74,47,48,49,50],[78,39,38,37,3,35,34,33,32,69],[21,22,23,24,25,26,27,9,29,30],[20,19,18,43,16,15,14,13,33,11],[1,2,3,4,27,6,7,8,9,10]],c=[[100,99,98,97,96,95,94,93,92,91],[81,82,83,84,85,86,87,88,89,90],[80,79,78,77,76,75,74,73,72,71],[61,62,63,64,65,66,67,68,69,70],[60,59,58,57,56,55,54,53,52,51],[41,42,43,44,45,46,47,48,49,50],[40,39,38,37,36,35,34,33,32,31],[21,22,23,24,25,26,27,28,29,30],[20,19,18,17,16,15,14,13,12,11],[1,2,3,4,5,6,7,8,9,10]];return a.getBoardPostions=function(){return c},a.getCoordinates=function(a){var b=_.flatten(c),d=b.indexOf(a),e=parseInt(d/10),f=d%10;return{x:e,y:f}},a.getMoveValue=function(c){var d=a.getCoordinates(c);return b[d.x][d.y]},a}),angular.module("snakesAndLadderApp").service("player",["$timeout",function(a){var b=this,c=-1;b.initPlayer=function(a){return c+=1,{name:a,id:c,position:0}};var d=function(b,c){a(function(){var a=".player-pos-player-"+b.id,d=".board-cell-"+c;$(a).css($(d).offset())},1)};b.sizePlayerUI=function(){a(function(){$(".player-box").width($(".board-cell").outerWidth()-2),$(".player-box").height($(".board-cell").outerHeight()-2),$(".dice-box").width($(".board-cell").outerWidth()-2),$(".dice-box").height($(".board-cell").outerHeight()-2)},1)},b.setPostion=function(a,b){a.position=b,d(a,b)}}]),angular.module("snakesAndLadderApp").service("dice",function(){var a=this,b=function(a,b){return Math.floor(Math.random()*(b-a+1))+a};a.getDiceValue=function(){return b(1,6)},a.getClass=function(a){return"dice-val-"+a}}),angular.module("snakesAndLadderApp").service("wait",["$timeout",function(a){var b=this;b.For=function(b){var c=new Promise(function(c){a(function(){c(!0)},b)});return c}}]),angular.module("snakesAndLadderApp").controller("MainCtrl",["board","dice","player","wait","$timeout",function(a,b,c,d,e){var f=this;f.numberOfPlayers=2,f.boardPositions=a.getBoardPostions(),f.diceValue=b.getDiceValue(),f.players=[],f.currentPlayer={},f.freezeUI=!1,f.diceClass="dice-anime",f.gameStarted=!1,f.gameEnded=!1,f.whoWon={},f.soundUrl="../audio/intro_minion.mp3",f.audioOn=!0;var g=0,h=function(a){for(var b=[],d=0;a>d;++d)b.push(c.initPlayer("player"+d));return b};f.initGame=function(){f.gameStarted=!0,f.gameEnded=!1,f.players=h(f.numberOfPlayers),f.currentPlayer=f.players[g],$(window).resize(i),i(),$(".audio-player").get(0).pause()},f.toggleAudio=function(){f.audioOn?($(".audio-player").get(0).pause(),f.audioOn=!1):(f.audioOn=!0,$(".audio-player").get(0).play())};var i=function(){_.forEach(f.players,function(a){c.setPostion(a,a.position)}),c.sizePlayerUI(),d.For(1).then(function(){angular.element(".minion-player-"+g).css("border","1px solid black")})},j=function(a){return g+=1,g>f.players.length-1&&(g=0),f.currentPlayer=f.players[g],angular.element(".minion-box").css("border","none"),a},k=function(){return f.diceClass="dice-anime",d.For(500).then(function(){f.diceValue=b.getDiceValue(),f.diceClass=b.getClass(f.diceValue),l(f.diceValue+f.currentPlayer.position)})},l=function(a){a>=100&&(a=100,console.log(f.currentPlayer.name+" Won !"),f.whoWon=f.currentPlayer,f.gameEnded=!0,f.soundUrl="../audio/win_minion.mp3",e(function(){$(".audio-player").get(0).load()},1)),c.setPostion(f.currentPlayer,a)},m=function(b){var c=f.currentPlayer.position,d=a.getMoveValue(c);return l(d),b};f.getClass=function(a,b){return a+b},f.runGame=function(){f.freezeUI||f.gameEnded||(f.freezeUI=!0,k().then(function(){d.For(1e3).then(m).then(j).then(function(){f.freezeUI=!1,angular.element(".minion-player-"+g).css("border","1px solid black")})}))}}]);