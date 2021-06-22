class Player {
    constructor(){
      this.index = null;
      this.score = 0;
      this.name = null;
      this.rank = null;
    }
  
    getCount(){
      var playerCountRef = database.ref('playerCount');
      playerCountRef.on("value",(data)=>{
        playerCount = data.val();
      })
    }
  
    updateCount(count){
      database.ref('/').update({
        playerCount: count
      });
    }
  
    update(){
      var playerIndex = "players/player" + this.index;
      database.ref(playerIndex).set({
        name:this.name,
        score:this.score,
        rank:this.rank
      });
    }

    static getPlayerInfo(){
      var playerInfoRef = database.ref('players');
      playerInfoRef.on("value", (data) => {
        allPlayers = data.val();
      });
    }

    redDuckr(redDuck, rWorm){
      rWorm.destroy();
      player.score++;
      player.update();
    }

    redDuckb(redDuck, bWorm){
      bWorm.destroy();
      player.score--;
      player.update();
    }

    blueDuckr(blueDuck, rWorm){
      rWorm.destroy();
      player.score--;
      player.update();
    }

    blueDuckb(blueDuck, bWorm){
      bWorm.destroy();
      player.score++;
      player.update();
    }
}