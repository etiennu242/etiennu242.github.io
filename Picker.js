let canvas, ctx;
let index_x = -1;
let index_y = 0;
let spacing = 50;
let isDrawing = false;
let drawingEnabled = false;
let eraser = false;
let animate = false;
let frames = [];
let currentFrame = -1;
let interval;


document.addEventListener("DOMContentLoaded", (event) => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;

    canvas.addEventListener('mousedown', (event) => {
        if(!isDrawing && (drawingEnabled || eraser)) {
            isDrawing = true;
        }
    });
    canvas.addEventListener('mouseup', (event) => {
        if(isDrawing && (drawingEnabled || eraser)) {
            isDrawing = false;
        }
    });

    canvas.addEventListener('mousemove', (event) => {
        if (isDrawing === true) {
            const mPos = getCursorPosition(canvas, event);
            if (drawingEnabled){
                ctx.fillStyle = document.getElementById("picker").value;
                ctx.fillRect(mPos.x-5, mPos.y-5, 10, 10);
            } else if (eraser) {
                ctx.clearRect(mPos.x-10, mPos.y-10, 20, 20);
            }
        }
      });
});


function Pick() {
    ChangeIndexes();

    const clr = HexToRGB(document.getElementById("picker").value);
    ctx.fillStyle = 'rgb(' + clr.r + ',' + clr.g + ',' + clr.b + ')';
    ctx.fillRect(index_x * spacing, index_y * spacing, spacing, spacing);
}

function Generate(){
    Clear();
    const clr = HexToRGB(document.getElementById("picker").value);
    for (let i = 0; i < (500/spacing) * (500/spacing); i++) {
        ChangeIndexes();

        let r = (Math.floor(Math.random() * 256) + clr.r) / 2;
        let g = (Math.floor(Math.random() * 256) + clr.g) / 2;
        let b = (Math.floor(Math.random() * 256) + clr.b) / 2;
        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.fillRect(index_x * spacing, index_y * spacing, spacing, spacing);
    }
}

function ChangeIndexes() {
    if (index_x % ((500/spacing)-1) == 0 && index_x > 0) {
        index_x = -1;
        index_y++;
    }
    index_x++;
}

function HexToRGB(value) {
    let r = parseInt(value.slice(1,3), 16);
    let g = parseInt(value.slice(3,5), 16);
    let b = parseInt(value.slice(5,7), 16);

    const a = {r: r, g: g, b: b};
    return a;
}

function Save() {
    document.getElementById('final').src = canvas.toDataURL();
}

function Clear() {
    index_x = -1;
    index_y = 0;
    ctx.clearRect(0, 0, 500, 500);
}

function setSpacing(i) {
    switch (i) {
        case 1:
            spacing = 250;
            break;
        case 2:
            spacing = 125;
            break;
        case 3:
            spacing = 100;
            break;
        case 4:
            spacing = 50;
            break;
        case 5:
            spacing = 25;
            break;
    
        default:
            break;
    }
}

function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    const pos = {x: event.clientX - rect.left, y: event.clientY - rect.top}; 
    return pos;
}

function Drawing() {
    if (eraser) {
        eraser = false;
    }
    drawingEnabled = !drawingEnabled;
}

function Eraser() {
    if(drawingEnabled) {
        drawingEnabled = false;
    }
    eraser = !eraser;
}

function AddFrame() {
    document.getElementById('final').src = canvas.toDataURL();
    frames.push(canvas.toDataURL());
}

function PlayAnimation() {
    if (animate) {
        animate = false;
        currentFrame = -1;
        clearInterval(interval);
        return;
    } else {
        animate = true;
        interval = setInterval(animation, 100);
        return;
    }
}

function animation() {
    currentFrame++;
    if (currentFrame % frames.length == 0) {
        currentFrame = 0;
    }
    document.getElementById('final').src = frames[currentFrame];

}

