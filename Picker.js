let canvas, ctx;
let index_x = -1;
let index_y = 0;
let spacing = 50;


document.addEventListener("DOMContentLoaded", (event) => {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = 500;
    canvas.height = 500;
});


function Pick() {
    spacing = document.getElementById('spacing-i').value;

    if (index_x % ((500/spacing)-1) == 0 && index_x > 0) {
        index_x = -1;
        index_y++;
    }
    index_x++;
    ctx.fillStyle = document.getElementById("picker").value;
    ctx.fillRect(index_x * spacing, index_y * spacing, spacing, spacing);

}

function HexToRGB(value) {
    let r = parseInt(value.slice(1,3), 16);
    let g = parseInt(value.slice(3,5), 16);
    let b = parseInt(value.slice(5,7), 16);
    console.log(r,g,b);
}

function Save() {
    // let img = canvas.toDataURL('image/png');
    // document.write('<img src="'+img+'"/>');
    document.getElementById('final').src = canvas.toDataURL();
}

function Clear() {
    index_x = -1;
    index_y = 0;
    ctx.clearRect(0, 0, 500, 500);
}