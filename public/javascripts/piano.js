
wkeyboard = ['z','x','c','v','b','n','m',',','.','/','q','w','e','r','t','y','u','i','o','p','['];
bkeyboard = ['s','d','g','h','j','l',';','2','3','4','6','7','9','0','-'];
wkeycodes = [90, 88, 67, 86, 66, 78, 77, 188, 190, 191, 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 219]
bkeycodes = [83, 68, 71, 72, 74, 76, 186, 50, 51, 52, 54, 55, 57, 48, 189];


//set volume 
let vol = 0.5;
document.getElementById('volume').oninput = function(){
    document.getElementById('showVolume').innerHTML = 'Volume: ' + (this.value*10) + '%';
    vol = this.value/10
}


//generate white keys
for (let i=0;i<21;i++){
    let w = document.getElementById('whitekeys').appendChild(document.createElement('div'));
    w.setAttribute('class', 'white');
    w.setAttribute('id', `w${i}`);
    w.addEventListener
    let keyrefdiv = w.appendChild(document.createElement('div'));
    keyrefdiv.setAttribute('class', 'whitekeyboard');
    keyrefdiv.appendChild(document.createElement('p')).innerHTML = wkeyboard[i];
}

//generate black keys
for (let i=1;i<16;i++){
    let b = document.getElementById('blackkeys').appendChild(document.createElement('div'));
    b.setAttribute('class', 'black');
    
    if (i%5===0 || i===2 || i===7 || i===12){  
        b.setAttribute('class', 'black blackspace');
    }
    b.setAttribute('id', `b${i-1}`);
    let keyrefdiv = b.appendChild(document.createElement('div'));
    keyrefdiv.setAttribute('class', 'blackkeyboard');
    keyrefdiv.appendChild(document.createElement('p')).innerHTML = bkeyboard[i-1];
}

let wind;
let bind;
let whitepressed = {};
let blackpressed = {};
let sound = {};
let k;
let isPressed = false

//sound on 
function play(key, file){
    key.classList.add('keypress');
    sound[file] = new Howl({
    // sound = new Howl({
        src:['/audio/'+file],
        volume: vol
    });
    sound[file].play();
    // sound.play();
}

//key down stuff
document.addEventListener('keydown', (event) => {
    k = event.keyCode;
    wind = wkeycodes.indexOf(k);
    bind = bkeycodes.indexOf(k);
    // if (isPressed) return;
    // isPressed = true
   
    if (wind !== -1) {
        let thing = document.getElementById(`w${wind}`);
        if (thing.classList.contains('keypress')){
            return;
        }
        console.log(thing);
        play(thing,`w${wind}.ogg`);
        whitepressed[k]=wind;
    }
    if (bind != -1){
        let thing = document.getElementById(`b${bind}`);
        if (thing.classList.contains('keypress')){
            return;
        }
        console.log(thing);
        play(thing, `b${bind}.ogg`);
        blackpressed[k]=bind;
    }
    let code = String.fromCharCode(k);
    console.log('keydown', code);

},false);
  
//key up stuff
document.addEventListener('keyup', (event) => {
    isPressed = false
    let thing;
    let wpressed = whitepressed[event.keyCode];
    let bpressed = blackpressed[event.keyCode];
     if (wpressed !== undefined) {
        thing = document.getElementById(`w${wpressed}`);
        console.log(thing);
        sound[`w${wpressed}.ogg`].stop();    
        // thing.classList.remove('keypress');
    }
    if (bpressed !== undefined) {
        thing = document.getElementById(`b${bpressed}`);
        console.log(thing);
        sound[`b${bpressed}.ogg`].stop();    
        // thing.classList.remove('keypress');
    }

    // if (wind !== -1) {
    //     thing = document.getElementById(`w${wind}`);
    //     console.log(thing);
    // }
    // if (bind != -1){
    //     thing = document.getElementById(`b${bind}`);
    //     console.log(thing);
    // }
    // sound.stop();
    thing.classList.remove('keypress');
    let code = String.fromCharCode(k);
    console.log('keyup', code);

},false);

let white = document.getElementsByClassName('whitekeyboard');
let black = document.getElementsByClassName('blackkeyboard');
let whitekeys = document.getElementsByClassName('white');
let blackkeys = document.getElementsByClassName('black');
let backimg = 1;
let pressed;

//press white keys with mouse
for (let i=0;i<whitekeys.length;i++){
    let id = whitekeys[i].id;
    whitekeys[i].addEventListener('mousedown', function(){
        whitekeys[i].classList.add('keypress');
        sound = new Howl({
            src:['/audio/'+`w${i}.ogg`],
            volume: vol
        });
        sound.play();
    }, false);
    whitekeys[i].addEventListener('mouseup', function(){
        whitekeys[i].classList.remove('keypress');
        sound.stop();
    }, false);
}

//press black keys with mouse
for (let i=0;i<blackkeys.length;i++){
    let id = blackkeys[i].id;
    blackkeys[i].addEventListener('mousedown', function(){
        blackkeys[i].classList.add('keypress');
        sound = new Howl({
            src:['/audio/'+`b${i}.ogg`],
            volume: vol
        });
        sound.play();
    }, false);
    blackkeys[i].addEventListener('mouseup', function(){
        blackkeys[i].classList.remove('keypress');
        sound.stop();
    }, false);
}

//shows keyboard references
function show(){ 
    document.getElementById('show').style.display = 'none';
    document.getElementById('hide').style.display = 'block';
    
    console.log(white[0]);
    for (let i=0;i<white.length;i++){
        white[i].style.display = 'block';
    }
    for (let j=0;j<black.length;j++){
        black[j].style.display = 'block';
    }
}
document.getElementById('show').addEventListener("click", show, false);

//hides keyboard references
function hide(){
    document.getElementById('show').style.display = 'block';
    document.getElementById('hide').style.display = 'none';

    for (let i=0;i<white.length;i++){
        white[i].style.display = 'none';
        console.log(white[i]);

    }
    for (let j=0;j<black.length;j++){
        black[j].style.display = 'none';
    }
}
document.getElementById('hide').addEventListener("click", hide, false);

//changes background
function background(){
    if (backimg <= 7){
        let path = '/images/' + backimg + '.jpeg';
        document.body.style.backgroundImage = 'url(' + path + ')';
        backimg++;
    }
    else{
        backimg = 1;
        document.body.style.backgroundImage = 'url()';
    }
}
document.getElementById('backgroundbutton').addEventListener('click', background, false);

//open how to popup 
function howto(){
    document.getElementById('popup').style.display = 'block';
}
document.getElementById('howtoplay').addEventListener('click', howto, false);

//close how to popup
function close(){
    document.getElementById('popup').style.display='none';
}
document.getElementById('close').addEventListener('click', close, false);

