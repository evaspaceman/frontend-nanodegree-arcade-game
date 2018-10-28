// Code based upon webinar with Llon

// Whole-script strict mode syntax
'use strict';
let game = true;

// Enemies our player must avoid
class Enemy {
    constructor(x, y) {
    // Variables applied to each of our instances go here,
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.x=x;
        this.y=y;
        this.sprite = 'images/enemy-bug.png';
        this.height = 65;
        this.width = 95;
        this.collision = false;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x += 101 * dt;

        if (this.x > ctx.canvas.width + this.width) {
            this.x = -202 * Math.floor(Math.random() * 4) +1; // random number (1-4)
        } else {
            this.x += 101 * dt;
        }

        // check for collision between player & bug
        if (collision(player.x, player.y, player.width, player.height, this.x, this.y, this.height, this.width)) {
            this.collision = true;
        
            // Reset player position
            if (player) {
                player.x = 202;
                player.y = 404;
            }
        } else {
            this.collision = false;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

// Player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, sprite) {
        this.x = x;
        this.y = y;
        this.sprite = sprite;;
        this.height = 75;
        this.width = 65;
    }

    update(dt) {
        if (game && player.y < 40) {
            game = false;
            winner();
        }
    }

    handleInput(direction){
        const blockWidth = 101;
        const blockHeight = 83;
        if (direction === 'left' && this.x - blockWidth >= 0){
            this.x -= blockWidth;
        } else if (direction === 'right' && this.x + blockWidth < 5 * blockWidth){
            this.x += blockWidth;
        } else if (direction === 'down' && this.y + blockHeight < 5 * blockHeight){
            this.y += blockHeight;
        } else if (direction === 'up' && this.y - blockHeight > -blockHeight){
            this.y -= blockHeight;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// variable definitions
const enemyPosition = [62, 144, 228];
const player = new Player(202, 404, 'images/char-boy.png');
let allEnemies = enemyPosition.map((y, index) => {
    return new Enemy( (-202 * (index + 1)), y);
});

// Collision function determines when the enemy and player intersect
function collision(px, py, pw, ph, ex, ey, ew, eh) {
    return (Math.abs(px - ex) * 2 < pw + ew) && (Math.abs(py - ey) * 2 < ph + eh);
}

// winner function calls winner modal and calls for game reset
let winner = function() {
    var winModal = document.querySelector('.winModal');
    winModal.classList.remove('hidden');
    allEnemies = [];
    resetGame();
};

// Game reset function
function resetGame() {
    var restart = document.getElementById('restart');
    var winModal = document.querySelector('.winModal');
    restart.addEventListener("click", function() {
        winModal.classList.add('hidden');
        location.reload(false);
    });
};
