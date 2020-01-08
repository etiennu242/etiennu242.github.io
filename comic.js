var i = 1;
var imgs = ['img/comic/1.jpg','img/comic/2.jpg', 'img/comic/3.jpg', 'img/comic/4.jpg', 'img/comic/5.jpg', 'img/comic/6.jpg', 'img/comic/7.jpg', 'img/comic/8.jpg', 'img/comic/9.jpg', 'img/comic/10.jpg', 'img/comic/11.jpg', 'img/comic/12.jpg', 'img/comic/13.jpg', 'img/comic/14.jpg', 'img/comic/15.jpg', 'img/comic/16.jpg', 'img/comic/17.jpg', 'img/comic/18.jpg', 'img/comic/19.jpg', 'img/comic/20.jpg', 'img/comic/21.jpg', 'img/comic/22.jpg', 'img/comic/23.jpg', 'img/comic/24.jpg', 'img/comic/25.jpg', 'img/comic/26.jpg'];


function slider(act) {
    if(act === '>'){
        if(i !== imgs.length - 1){
            i++;
        }
    } else if (i > 0){
        i--;
    }
    document.getElementById('comic').src = imgs[i];
    document.getElementById('page-counter').innerHTML = ('Page ' + (i+1));
}

document.onkeydown = function(key) {
    if (key.keyCode === 37) {
        slider('<');
    }
    if (key.keyCode === 39) {
        slider('>');
    }
}
