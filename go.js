let canvas, ctx;
let Dragging = false;
let black = true;
let stones = [];
let grid = [];
let res = 13;
let lastposX = null;
let lastposY = null;
let p1, p2;
let scoreP1 = 0, scoreP2 = 0;
const letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];


window.addEventListener('load', (event) => {
    ctx.textBaseline = "top";
    ctx.font = "15px Roboto Mono";
    DrawGrid();
});

document.addEventListener("DOMContentLoaded", (event) => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    p1 = document.getElementById('p1');
    p2 = document.getElementById('p2');
    canvas.width = 500;
    canvas.height = 500;

    for (let y = 0; y < 13; y++) {
        grid.push([]);
        for (let x = 0; x < 13; x++) {
            grid[y].push({x: (31*x)+40, y:  (31*y)+40});
        }
    }

    for (let i = 0; i < 150; i++) {
        stones.push(new Stone(15, 195, true));
        stones.push(new Stone(15, 226, false));

        stones[i].draw();
        stones[i+1].draw();
    }


    canvas.addEventListener('mousedown', (event) => {
        const mPos = getCursorPosition(canvas, event);
        for (let i = 0; i < stones.length; i++) {
            if (GetDistance(mPos.x,mPos.y, stones[i].x, stones[i].y) <= 10) {
                stones[i].dragging = true;
                Dragging = true;
                lastposX = mPos.x;
                lastposY = mPos.y;
                break;
            }
        }
    });

    canvas.addEventListener('mouseup', (event) => {
        for (let i = 0; i < stones.length; i++) {
            if(stones[i].dragging) {
                if (stones[i].x >= 450 || stones[i].y >= 450) {
                    if (stones[i].black) {
                        scoreP2++;
                        p2.innerHTML = scoreP2;
                    } else {
                        scoreP1++;
                        p1.innerHTML = scoreP1;
                    }
                    stones.splice(i, 1);
                }
                for (let y = 0; y < res; y++) {
                    for (let x = 0; x < res; x++) {
                        if (GetDistance(grid[x][y].x, grid[x][y].y, stones[i].x, stones[i].y) <= 20) {
                            stones[i].x = grid[x][y].x;
                            stones[i].y = grid[x][y].y;
                            break;
                        }
                    }
                }
                stones[i].dragging = false;
                Dragging = false;
                break;
            }
        }
        Clear();
        DrawGrid();
        for (let i = 0; i < stones.length; i++) {

            stones[i].draw();
    
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (Dragging) {
            const mPos = getCursorPosition(canvas, event);
            let dx = mPos.x - lastposX;
            let dy = mPos.y - lastposY;
            
            for (let i = 0; i < stones.length; i++) {
                if (stones[i].dragging){
                    stones[i].x+=dx;
                    stones[i].y+=dy;
                }
            }

            Clear();
            DrawGrid();
            for (let i = 0; i < stones.length; i++) {

                stones[i].draw();
        
            }
            lastposX = mPos.x;
            lastposY = mPos.y;
        }

    });
});

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const pos = {x: event.clientX - rect.left, y: event.clientY - rect.top}; 
    return pos;
}
function DrawCircle(x, y, black) {
    ctx.beginPath();
    
    if (black) {
        ctx.arc(x, y, 8, 2 * Math.PI, false);
        ctx.fillStyle = "black";
        ctx.fill();
    } else {
        ctx.arc(x, y, 6, 2 * Math.PI, false);
        ctx.fillStyle = "white";
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.stroke();
    }
}
function DrawGrid(){
    for (let x = 0; x < res; x++) {
        ctx.beginPath();
        ctx.moveTo((31*x)+40, 40);
        ctx.lineTo((31*x)+40, (31*(res-1))+40);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(letters[x], (31*x)+35, 20);
    }
    for (let y = 0; y < res; y++) {
        ctx.beginPath();
        ctx.moveTo(40, (31*y)+40);
        ctx.lineTo((31*(res-1))+40, (31*y)+40);
        ctx.lineWidth = 2;
        ctx.strokeStyle = "grey";
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.fillText(letters[y], 422, (31*y)+34);
    }
    
}
function Clear() {
    ctx.clearRect(0, 0, 500, 500);
}
function GetDistance(x1,y1,x2,y2) {
    return Math.sqrt(((x2-x1) ** 2) + ((y2-y1) ** 2));
}

class Stone {
    constructor(x, y, black) {
        this.x = x;
        this.y = y;
        this.black = black;
        this.dragging = false;
    }
    draw() {
        
        DrawCircle(this.x, this.y, this.black);
    }
}