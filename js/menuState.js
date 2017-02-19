////////////////////////////////////
// 0.1 Menu State - Start Screen
////////////////////////////////////
var menuState = {
    preload: function(){ 
        game.load.image('text-welcome', 'assets/text-welcome.png');
        game.load.image('start-button', 'assets/button-start.png');
    },
    create: function(){
        // Set the background color to blue
        game.stage.backgroundColor = '#45CCFF';
        var fauxlevel = [];
        // Text & Buttons
        game.add.sprite(100, 96, 'text-welcome')
        let btn0 = game.add.button(200, 265, 'start-button', this.startGame, this, 0, 0, 0);
    },
    update: function(){

    },
    startGame: function(){
        game.state.start('main');
    }
}

game.state.add('menu', menuState);
game.state.start('menu');