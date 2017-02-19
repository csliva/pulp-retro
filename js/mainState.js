////////////////////////////////////
// 0.0 Main Gameplay state
////////////////////////////////////
var mainState = {
    preload: function(){
        var theme = 'theme0';
        game.load.image('player', 'assets/'+theme+'-player.png');
        game.load.image('wall', 'assets/'+theme+'-wall.png');
        game.load.image('coin', 'assets/'+theme+'-coin-c.png');
        game.load.image('lava', 'assets/'+theme+'-lava.png');
        game.load.image('enemy', 'assets/'+theme+'-enemy.png'); 
        game.load.image('water', 'assets/'+theme+'-water.png');
        game.load.image('floor-center', 'assets/floor-center.png');
        game.load.image('floor-left', 'assets/floor-left-edge.png');
        game.load.image('floor-right', 'assets/floor-right-edge.png');
        game.load.image('floor-single', 'assets/floor-single.png');
        game.load.image('floor-single-down', 'assets/floor-single-down.png');
        game.load.image('floor-single-bottom', 'assets/floor-single-bottom.png');
        game.load.image('button-restart', 'assets/button-restart.png');
        
    },
    create: function(){
        //enable FPS
        game.time.advancedTiming = true;

        ////////////////////////////////////
        // GENERAL WORLD STUFF
        ////////////////////////////////////

        // Set the background color to blue
        game.stage.backgroundColor = '#45CCFF';
        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Add the physics engine to all game objects
        game.world.enableBody = true;

        ////////////////////////////////////
        // CONTROL KEYMAPPING
        ////////////////////////////////////

        // Variable to store the arrow key pressed
        this.cursor = game.input.keyboard.createCursorKeys();
        this.powerKey = game.input.keyboard.addKey(Phaser.Keyboard.X);


        ////////////////////////////////////
        // WORLD OBJECTS & ACTORS
        ////////////////////////////////////

        //

        // Create the player in the middle of the game
        this.player = game.add.sprite(70, 100, 'player');
        //resize player
        // Add gravity to make it fall
        this.player.body.gravity.y = 1200;
        this.player.body.bounce.setTo(0.25, 0.25);

        // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.lava = game.add.group();
        this.enemies = game.add.group();
        this.invisiblocks = game.add.group();
        this.waterblocks = game.add.group();

        var enemyMov = true;

        // Design the level. x = wall, o = coin, ! = lava.
        var level = [
            ////////////////////////////////////////////////////////////
            // MAP
            ////////////////////////////////////////////////////////////
            'xxxxxxxxxxxxxxxxxxxxxxxx!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '!      !                !xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '!                       !xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            '!      o                !xxxxxxx      o   xxxxxxxxxxxxxxxx',
            '!                                              xxxxxxxxxxx',
            '!      !               ?       *                 ?      xx',
            'x      !  *   ?         xxxxxxxxxxxxxxxxxxxxxxxxx      xxx',
            'x      abbc!!d          xxx                             xx',
            'x            e          !xx   ?  *    ?                 xx',
            'xabbc        fbbbbbc o  !xx    xxxxxxx   *       ?      xx',
            '!         !             !xx         xxxxxxxxxxxxx       xx',
            '!         !     o      x!xxx o                           x',
            '! o                     !xx  *     ?                xxxxxx',
            '!          xx        xxxxxxxxxxxxxx                      x',
            '!          o            xx                               x',
            '!      ! *     x        xx              xxxxxx           x',
            'x~~~xxx!xxxxxxxx!!!!!!!!xx                               x',
            'x~~~xxxxxxxxxxxx!!!!!!!!xx ?   *  x              *   ?   x',
            'x~~~~~~~~~~~~~xx!!!!!!!!xx  xxxxxxx!!!!!!!!xxxxxxxxxx  o x',
            'x~~~~~~~~~~~~~xx!!!!!!!!xxo xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'xxxxxxxxxxxxxxxx!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
        ];

        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(24*j, 24*i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }

                else if (level[i][j] == 'a') {
                    var wall = game.add.sprite(24*j, 24*i, 'floor-left');
                    wall.body.setSize(24, 24, 0,1);
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }
                 else if (level[i][j] == 'b') {
                    var wall = game.add.sprite(24*j, 24*i, 'floor-center');
                    wall.body.setSize(24, 24, 0,1);
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }
                 else if (level[i][j] == 'c') {
                    var wall = game.add.sprite(24*j, 24*i, 'floor-right');
                    wall.body.setSize(24, 24, 0,1);
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }
                 else if (level[i][j] == 'd') {
                    var wall = game.add.sprite(24*j, 24*i, 'floor-single');
                    wall.body.setSize(24, 24, 0,1);
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }
                else if (level[i][j] == 'e') {
                    var wall = game.add.sprite(24*j, 24*i, 'floor-single-down');
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }
                else if (level[i][j] == 'f') {
                    var wall = game.add.sprite(24*j, 24*i, 'floor-single-bottom');
                    this.walls.add(wall);
                    wall.body.immovable = true; 
                }

                // Create a coin and add it to the 'coins' group
                else if (level[i][j] == 'o') {
                    var coin = game.add.sprite(24*j, 24*i, 'coin');
                    this.coins.add(coin);
                }

                // Create a lava and add it to the 'lava' group
                else if (level[i][j] == '!') {
                    var lava = game.add.sprite(24*j, 24*i, 'lava');
                    this.lava.add(lava);
                    lava.body.immovable = true; 
                }
                // Create an invisiblock and add it to the 'invisiblocks' group
                else if (level[i][j] == '?') {
                    var invisiblock = game.add.sprite(24*j, 24*i);
                    this.invisiblocks.add(invisiblock);
                    invisiblock.body.immovable = true; 
                }
                // Create a waterblock and add it to the 'waterblocks' group
                else if (level[i][j] == '~') {
                    var waterblock = game.add.sprite(24*j, 24*i, 'water');
                    this.waterblocks.add(waterblock);
                    waterblock.body.immovable = true; 
                }
                // Create an enemy and add it to the 'enemies' group
                else if (level[i][j] == '*') {
                    var enemy = game.add.sprite(24*j, 24*i, 'enemy');

                    // Add gravity to make it fall
                    enemy.body.gravity.y = 500;
                    // start velocity
                    enemy.body.velocity.x = 100;
                    enemy.body.bounce.setTo(1, 0);

                    this.enemies.add(enemy);
                }
            }
        }


        ////////////////////////////////////
        // CAMERA STUFF
        ////////////////////////////////////

        // Make the world larger than the actual canvas
        game.world.setBounds(0, 0, 1392, 504);
        //registration point
        this.player.anchor.setTo(0.5, 0.5); 
        // Camera type 
        game.camera.follow(this.player, Phaser.Camera.FOLLOW_PLATFORMER);

    },
    update: function(){
        //////////////////////////
        //  Player 
        //////////////////////////

        //all this and that updated and able to pass to different scopes
        let that = this;

        // collision handling functions
        player.collision(that);
        // Move the player when an arrow key is pressed
        player.keys(that);

        /////////////////////////
        //  Enemies 
        //////////////////////////

        // Make the enemies and the walls collide
        game.physics.arcade.collide(this.enemies, this.walls);
        // Make the enemies and the invisiblocks collide
        game.physics.arcade.collide(this.enemies, this.invisiblocks);
        // Make the enemies and the walls collide
        game.physics.arcade.collide(this.enemies, this.lava);

        // update position of each enemy
        this.enemies.forEach(function(enemy){
            // do update
        });

        //FPS
        game.debug.text(game.time.fps || '--', 2, 14, "#00ff00"); 

    }
}
game.state.add('main', mainState);  


