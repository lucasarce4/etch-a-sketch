
function rgb(){ 
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);
    let color = `rgb(${r},${g},${b})`;
    return color;
}


function mouseOver(color){
    const pixels = document.querySelectorAll('.pixels');
    pixels.forEach(el =>{
        el.addEventListener('mouseover', ()=>{
            if(color == 'rgb'){
                el.style.background = rgb();
            }else if(color == 'white'){
                el.style.background = '';
            }else {
                el.style.background = color;
            }
        })
    })
}



function startDrawing (color){
    const drawBoard = document.querySelector('.drawBoard');
    const inputSize = document.querySelector('#rangeInput');
    if(color != 'white'){
        createDivs(inputSize);
    }
    drawBoard.addEventListener('mouseenter', ()=> {
        mouseOver(color);   
    })
}

    
startDrawing('black');


function createDivs(inputSize){
    clear();
    for(let i=0;i<inputSize.value*inputSize.value;i++){
        const drawBoard = document.querySelector('.drawBoard');
        const div = document.createElement('div');
        div.classList.add('pixels')
        let columns = inputSize.value;
        drawBoard.style.gridTemplateColumns = `repeat(${columns} ,auto)`;
        drawBoard.appendChild(div);
    }
}

function clear(){
    const drawBoard = document.querySelector('.drawBoard');
     while(drawBoard.firstChild){
    drawBoard.removeChild(drawBoard.firstChild);
    }
}

function clearButton(){
    const button = document.querySelector('#clear');
    button.addEventListener('click', ()=>{
        clear ();
        startDrawing('black');
    })
}
clearButton();

function changeSize() {
    const input = document.querySelector('#rangeInput');
    input.addEventListener('click',()=>{
        startDrawing('black');
    })
}
changeSize();

function colorPicker(){
    const buttons = document.querySelectorAll('.buttons');
    buttons.forEach((button) => {
        button.addEventListener('click', ()=>{
            let color = button.value;
            switch (color){
                case 'black':
                    startDrawing(color);
                    break;
                case 'rgb':
                    startDrawing('rgb');
                    break;
                case 'erase':
                    startDrawing('white');
                    break;
            }
        })
})
}
colorPicker();


const pickr = Pickr.create({
    el: '.color-picker',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: [
        'rgba(244, 67, 54, 1)',
        'rgba(233, 30, 99, 0.95)',
        'rgba(156, 39, 176, 0.9)',
        'rgba(103, 58, 183, 0.85)',
        'rgba(255, 193, 7, 1)'
    ],

    components: {

        // Main components
        preview: true,
        opacity: true,
        hue: true,

        // Input / output Options
        interaction: {
            rgba: true,
            input: true,
            save: true
        }
    }
});


pickr.on('change', (color, source, instance) => {
    const colorRGBA = color.toRGBA().toString();
    startDrawing(colorRGBA);
})
