////////////////////////////////////
// 0.0 Hero Actions
////////////////////////////////////
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

////////////////////////////////////
// 0.1 Player Actions
////////////////////////////////////
player = {
    keys: function(that){
        if (that.cursor.left.isDown) {
            that.player.body.velocity.x = -200;
            that.player.animations.play('walk', 30, true);
            that.player.scale.x = -1;
            that.emitter.emitParticle();
        } else if (that.cursor.right.isDown) {
            that.player.body.velocity.x = 200;
            that.player.animations.play('walk', 30, true);
            that.player.scale.x = 1;
            that.emitter.emitParticle();
        } else {
           that.player.body.velocity.x = 0;
           that.player.animations.stop(null, true);
        }
        // Make the player jump if he is touching the ground
        if (that.cursor.up.isDown && that.player.body.touching.down) {
           that.player.body.velocity.y = -450;
        }
    },
    collision: function(that){
                // Make the player and the walls collide
        game.physics.arcade.collide(that.player, that.walls);
        // Call the 'takeCoin' function when the player takes a coin
        game.physics.arcade.overlap(that.player, that.coins, hero.takeCoin, null, that);
        // Call the 'restart' function when the player touches the lava
        game.physics.arcade.overlap(that.player, that.lava, hero.playerDeath, null, that);
        // Call the 'hitEnemy' function when the player takes a coin
        game.physics.arcade.collide(that.player, that.enemies, hero.hitEnemy, null, that);
        // Call the 'getWet' function when the player enters water
        game.physics.arcade.overlap(that.player, that.waterblocks, hero.getWet, null, that);
    }
}
