class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }

      redDuck = createSprite(200, 500);
      redDuck.addImage(redDuckImg);
      redDuck.scale = 0.3;

      blueDuck = createSprite(1200, 500);
      blueDuck.addImage(blueDuckImg);
      blueDuck.scale = 0.3;

      ducks = [redDuck, blueDuck];
    }

    play(){
      form.hide();

      Player.getPlayerInfo();

      if(allPlayers !== undefined){
        background(grass);

        image(burrowImg, 400, 200, 125, 60);
        image(burrowImg, 650, 200, 125, 60);
        image(burrowImg, 900, 200, 125, 60);
        image(burrowImg, 400, 400, 125, 60);
        image(burrowImg, 650, 400, 125, 60);
        image(burrowImg, 900, 400, 125, 60);
        image(burrowImg, 400, 600, 125, 60);
        image(burrowImg, 650, 600, 125, 60);
        image(burrowImg, 900, 600, 125, 60);

        var index = 0;

        var x = 1000;
        var y = 50;

        for(var plr in allPlayers){
          index = index + 1;
          y = y + 50;
          stroke("black");
          fill("black");
          textSize(25);
          text(allPlayers[plr].name + " : " + allPlayers[plr].score, x, y);
        }

        for(var plr in allPlayers){

          if(player.index === 1){
            if(keyDown(LEFT_ARROW)){
              redDuck.x = redDuck.x - 5;
            }
            if(keyDown(RIGHT_ARROW)){
              redDuck.x = redDuck.x + 5;
            }
            if(keyDown(UP_ARROW)){
              redDuck.y = redDuck.y - 5;
            }
            if(keyDown(DOWN_ARROW)){
              redDuck.y = redDuck.y + 5;
            }
            redDuck.bounceOff(rGrp, player.redDuckr);
            redDuck.bounceOff(bGrp, player.redDuckb);
          }
          else if(player.index === 2){
            if(keyDown(LEFT_ARROW)){
              blueDuck.x = blueDuck.x - 5;
            }
            if(keyDown(RIGHT_ARROW)){
              blueDuck.x = blueDuck.x + 5;
            }
            if(keyDown(UP_ARROW)){
              blueDuck.y = blueDuck.y - 5;
            }
            if(keyDown(DOWN_ARROW)){
              blueDuck.y = blueDuck.y + 5;
            }
            blueDuck.bounceOff(bGrp, player.blueDuckb);
            blueDuck.bounceOff(rGrp, player.blueDuckr);
          }
        }
      }
      drawSprites();
    }

    end(){
      console.log("Game Over");

    }

    showWorms(){
      var x = [450, 700, 950];
      var y = [200, 400, 600];
      var color = Math.round(random(1, 2));
      var positionX = Math.round(random(0, 2));
      var positionY = Math.round(random(0, 2));
      if(frameCount%20 === 0){
        if(color === 1){
          bWorm = createSprite(x[positionX], y[positionY], 10, 10);
          bWorm.addImage(blueWorm);
          bWorm.scale = 0.15;
          bWorm.lifetime = 100;
          bGrp.add(bWorm);
        }
        else if(color === 2){
          rWorm = createSprite(x[positionX], y[positionY], 10, 10);
          rWorm.addImage(redWorm);
          rWorm.scale = 0.11;
          rWorm.lifetime = 100;
          rGrp.add(rWorm);
        }
      }
    }

    /*setRanks(){
      Player.getPlayerInfo();
      var score1, score2;
      var index = 0;
      for(var plr in allPlayers){
        if(plr === 1){
          score1 = allPlayers[plr].score;
        }
        else if(plr === 2){
          score2 = allPlayers[plr].score;
        }
      }
      if(score1 > score2){
        textSize(50);
        text("PLAYER 1 WON!", displayWidth/2 - 50, displayHeight/2);
      }
      else if(score2 > score1){
        textSize(50);
        text("PLAYER 2 WON!", displayWidth/2 - 50, displayHeight/2);
      }
    }*/

    /*displayRanks(){
      camera.position.x = 0;
      camera.position.y = 0;

      Player.getPlayerInfo();

      for(var plr in allPlayers){
        if(allPlayers[plr].rank === 1){
          text("Winner: " + allPlayers[plr].name, 0, 85);
        }
  
        else if(allPlayers[plr].rank === 2){
          text("Loser " + allPlayers[plr].name, 0, 200);
        }
      }
    }*/
}