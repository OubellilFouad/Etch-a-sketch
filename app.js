let global = document.getElementById("global");
let defaultType = "fill";
let type = defaultType;

const drawBox = document.createElement("div");
const sizeInp = document.createElement("input");
const fillbtn = document.createElement("btn");
const rainbowBtn = document.createElement("btn");
const eraserBtn = document.createElement("btn");

sizeInp.classList.add("range");
sizeInp.setAttribute('type','range');
console.log(sizeInp.value);
sizeInp.setAttribute('value',16);
sizeInp.setAttribute('min',1);
sizeInp.setAttribute('max',64);

drawBox.classList.add("box");

fillbtn.classList.add("button");
fillbtn.classList.add("active");
fillbtn.setAttribute("data-type","fill");
fillbtn.textContent = "Color fill";

eraserBtn.classList.add("button");
eraserBtn.setAttribute("data-type","erase");
eraserBtn.textContent = "Eraser";

rainbowBtn.classList.add("button");
rainbowBtn.setAttribute("data-type","rainbow");
rainbowBtn.textContent = "Rainbow mode";



global.appendChild(fillbtn);
global.appendChild(rainbowBtn);
global.appendChild(eraserBtn);
global.appendChild(sizeInp);
global.appendChild(drawBox);


let buttons = document.querySelectorAll(".button");
buttons.forEach((button)=>{
    button.addEventListener("click",function(){
        let current = document.querySelector(".active");
        current.classList.remove("active");
        button.classList.add("active");
        type = button.getAttribute("data-type");
    })
})

function setUpBox(size){
    let repeater = size*size;
    for(let i = 0;i<repeater;i++){
        window["pixel"+i] = document.createElement("div");
        window["pixel"+i].classList.add("pixel");
        window["pixel"+i].style.cssText = `width: ${200/size}px;height: ${200/size}px;`
        drawBox.appendChild(window["pixel"+i]);
    } 
}

function draw(size){
    for(let i = 0;i<size*size;i++){
        window["pixel"+i].addEventListener("mouseenter",()=>{
            window["pixel"+i].style.backgroundColor = "red";
        })
    }
}
function erase(size){
    for(let i = 0;i<size*size;i++){
        window["pixel"+i].addEventListener("mouseenter",()=>{
            window["pixel"+i].style.backgroundColor = "transparent";
        })
    }
}
function rainbow(size){
    for(let i = 0;i<size*size;i++){
        let R = Math.floor(Math.random()*255);
        let G = Math.floor(Math.random()*255);
        let B = Math.floor(Math.random()*255);
        window["pixel"+i].addEventListener("mouseenter",()=>{
            window["pixel"+i].style.backgroundColor = `rgb(${R},${G},${B})`;
        })
    }
}
function reset(){
    drawBox.textContent = '';
}

setUpBox(16);
// draw(16);
// erase(16);
// rainbow(16);
window.addEventListener('load',function(){
    draw(sizeInp.value);
})
sizeInp.addEventListener('mousemove',()=>{
    sizeInp.setAttribute('data-value',sizeInp.value);
})
global.addEventListener('click',()=>{
    switch(type){
        case 'fill':
            reset();
            setUpBox(sizeInp.value);
            draw(sizeInp.value);
            break;
        case 'rainbow':
            reset();
            setUpBox(sizeInp.value);
            rainbow(sizeInp.value);
            break;
        case 'erase':
            erase(sizeInp.value);
            break;
        default : 
            draw(sizeInp.value);
    }
})