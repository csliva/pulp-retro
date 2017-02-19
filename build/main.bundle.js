/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	__webpack_require__(1);
	__webpack_require__(2);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	////////////////////////////////////
	// 0.1 Menu State - Start Screen
	////////////////////////////////////
	var menuState = {
	    preload: function preload() {
	        game.load.image('text-welcome', 'assets/text-welcome.png');
	        game.load.image('start-button', 'assets/button-start.png');
	    },
	    create: function create() {
	        // Set the background color to blue
	        game.stage.backgroundColor = '#45CCFF';
	        var fauxlevel = [];
	        // Text & Buttons
	        game.add.sprite(100, 96, 'text-welcome');
	        var btn0 = game.add.button(200, 265, 'start-button', this.startGame, this, 0, 0, 0);
	    },
	    update: function update() {},
	    startGame: function startGame() {
	        game.state.start('main');
	    }
	};
	
	game.state.add('menu', menuState);
	game.state.start('menu');

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	////////////////////////////////////
	// 0.0 Main Gameplay state
	////////////////////////////////////
	var player = __webpack_require__(3);
	var mainState = {
	        preload: function preload() {
	                var theme = 'theme0';
	                game.load.image('player', 'assets/' + theme + '-player.png');
	                game.load.image('wall', 'assets/' + theme + '-wall.png');
	                game.load.image('coin', 'assets/' + theme + '-coin-c.png');
	                game.load.image('lava', 'assets/' + theme + '-lava.png');
	                game.load.image('enemy', 'assets/' + theme + '-enemy.png');
	                game.load.image('water', 'assets/' + theme + '-water.png');
	                game.load.image('button-restart', 'assets/button-restart.png');
	        },
	        create: function create() {
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
	
	                this.hitboxes = game.add.group();
	                this.hitboxes.enableBody = true;
	                this.player.addChild(hitboxes);
	
	                var enemyMov = true;
	
	                // Design the level. x = wall, o = coin, ! = lava.
	                var level = [
	                ////////////////////////////////////////////////////////////
	                // MAP
	                ////////////////////////////////////////////////////////////
	                'xxxxxxxxxxxxxxxxxxxxxxxx!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '!      !                !xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '!                       !xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '!      o                !xxxxxxx      o   xxxxxxxxxxxxxxxx', '!                                              xxxxxxxxxxx', '!      !               ?       *                 ?      xx', 'x      !  *   ?         xxxxxxxxxxxxxxxxxxxxxxxxx      xxx', 'x      xxxx!!x          xxx                             xx', 'x            x          !xx   ?  *    ?                 xx', 'xxxxx        xxxxxxx o  !xx    xxxxxxx   *       ?      xx', '!         !             !xx         xxxxxxxxxxxxx       xx', '!         !     o      x!xxx o                           x', '! o                     !xx  *     ?                xxxxxx', '!          xx        xxxxxxxxxxxxxx                      x', '!          o            xx                               x', '!      ! *     x        xx              xxxxxx           x', 'x~~~xxx!xxxxxxxx!!!!!!!!xx                               x', 'x~~~xxxxxxxxxxxx!!!!!!!!xx ?   *  x              *   ?   x', 'x~~~~~~~~~~~~~xx!!!!!!!!xx  xxxxxxx!!!!!!!!xxxxxxxxxx  o x', 'x~~~~~~~~~~~~~xx!!!!!!!!xxo xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx!!!!!!!!xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'];
	
	                // Create the level by going through the array
	                for (var i = 0; i < level.length; i++) {
	                        for (var j = 0; j < level[i].length; j++) {
	
	                                // Create a wall and add it to the 'walls' group
	                                if (level[i][j] == 'x') {
	                                        var wall = game.add.sprite(24 * j, 24 * i, 'wall');
	                                        this.walls.add(wall);
	                                        wall.body.immovable = true;
	                                }
	
	                                // Create a coin and add it to the 'coins' group
	                                else if (level[i][j] == 'o') {
	                                                var coin = game.add.sprite(24 * j, 24 * i, 'coin');
	                                                this.coins.add(coin);
	                                        }
	
	                                        // Create a lava and add it to the 'lava' group
	                                        else if (level[i][j] == '!') {
	                                                        var lava = game.add.sprite(24 * j, 24 * i, 'lava');
	                                                        this.lava.add(lava);
	                                                        lava.body.immovable = true;
	                                                }
	                                                // Create an invisiblock and add it to the 'invisiblocks' group
	                                                else if (level[i][j] == '?') {
	                                                                var invisiblock = game.add.sprite(24 * j, 24 * i);
	                                                                this.invisiblocks.add(invisiblock);
	                                                                invisiblock.body.immovable = true;
	                                                        }
	                                                        // Create a waterblock and add it to the 'waterblocks' group
	                                                        else if (level[i][j] == '~') {
	                                                                        var waterblock = game.add.sprite(24 * j, 24 * i, 'water');
	                                                                        this.waterblocks.add(waterblock);
	                                                                        waterblock.body.immovable = true;
	                                                                }
	                                                                // Create an enemy and add it to the 'enemies' group
	                                                                else if (level[i][j] == '*') {
	                                                                                var enemy = game.add.sprite(24 * j, 24 * i, 'enemy');
	
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
	        update: function update() {
	                //////////////////////////
	                //  Player 
	                //////////////////////////
	
	                //all this and that updated and able to pass to different scopes
	                var that = this;
	
	                // collision handling functions
	                player.actions.collision(that);
	                // Move the player when an arrow key is pressed
	                player.actions.keys(that);
	
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
	                this.enemies.forEach(function (enemy) {
	                        // do update
	                });
	
	                //FPS
	                game.debug.text(game.time.fps || '--', 2, 14, "#00ff00");
	        }
	};
	game.state.add('main', mainState);

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	////////////////////////////////////
	// 0.0 Player Actions
	////////////////////////////////////
	var hero = __webpack_require__(4);
	exports.actions = {
	    keys: function keys(that) {
	        if (that.cursor.left.isDown) {
	            that.player.body.velocity.x = -200;
	        } else if (that.cursor.right.isDown) {
	            that.player.body.velocity.x = 200;
	        } else {
	            that.player.body.velocity.x = 0;
	        }
	        // Make the player jump if he is touching the ground
	        if (that.cursor.up.isDown && that.player.body.touching.down) {
	            that.player.body.velocity.y = -450;
	        }
	        //Add a sprint
	        if (that.powerKey.isDown && that.cursor.left.isDown) {
	            that.player.body.velocity.y = 0;
	            that.player.body.velocity.x = -300;
	        } else if (that.powerKey.isDown && that.cursor.right.isDown) {
	            that.player.body.velocity.x = 300;
	        }
	    },
	    collision: function collision(that) {
	        // Make the player and the walls collide
	        game.physics.arcade.collide(that.player, that.walls);
	        // Call the 'takeCoin' function when the player takes a coin
	        game.physics.arcade.overlap(that.player, that.coins, hero.actions.takeCoin, null, that);
	        // Call the 'restart' function when the player touches the lava
	        game.physics.arcade.overlap(that.player, that.lava, hero.actions.playerDeath, null, that);
	        // Call the 'hitEnemy' function when the player takes a coin
	        game.physics.arcade.collide(that.player, that.enemies, hero.actions.hitEnemy, null, that);
	        // Call the 'getWet' function when the player enters water
	        game.physics.arcade.overlap(that.player, that.waterblocks, hero.actions.getWet, null, that);
	    }
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	exports.actions = {
	    takeCoin: function takeCoin(player, coin) {
	        coin.kill();
	        console.log('Coin Collected!');
	    },
	    // Function to handle enemy collisions
	    hitEnemy: function hitEnemy(player, enemy) {
	        if (player.body.bottom > enemy.body.center.y) {
	            console.log('player killed: ' + player.body.bottom + ' vs. ' + enemy.body.center.y);
	            //this.restart();
	            exports.actions.playerDeath(player);
	        } else {
	            console.log('enemy killed: ' + player.body.bottom + ' vs. ' + enemy.body.center.y);
	            //enemy.scale.setTo(.25, 1);
	            enemy.kill();
	            player.body.velocity.y = -300;
	        }
	    },
	    // Function to enter waterblocks
	    getWet: function getWet(player, waterblock) {
	        console.log('You\'re all wet!');
	    },
	    playerDeath: function playerDeath(player) {
	        player.kill();
	        var btn0 = game.add.button(200 + game.camera.x, 265, 'button-restart', exports.actions.restart, this, 0, 0, 0);
	    },
	    // Function to restart the game
	    restart: function restart() {
	        game.state.start('main');
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=main.bundle.js.map