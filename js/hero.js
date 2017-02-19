hero = {
    takeCoin: function(player, coin) {
        coin.kill();
        console.log('Coin Collected!');
    },
    // Function to handle enemy collisions
    hitEnemy: function(player, enemy){
        if ( player.body.bottom > enemy.body.center.y ) {
            console.log('player killed: '+player.body.bottom+' vs. '+enemy.body.center.y);
            //this.restart();
            hero.playerDeath(player);
        } else {
            console.log('enemy killed: '+player.body.bottom+' vs. '+enemy.body.center.y);
            //enemy.scale.setTo(.25, 1);
            enemy.kill();
            player.body.velocity.y = -300;
        }
    },
    // Function to enter waterblocks
    getWet: function(player, waterblock) {
        console.log('You\'re all wet!');
    },
    playerDeath: function(player){
        player.kill();
        let btn0 = game.add.button(200+game.camera.x, 265, 'button-restart', hero.restart, this, 0, 0, 0);
    },
    // Function to restart the game
    restart: function() {
        game.state.start('main');
    }
}