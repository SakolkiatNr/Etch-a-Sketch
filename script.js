// Create a function that generate 16 x 16 divs elements
    // function that create parent node
        // a function that create child node 
        // create childe node 16 times
    // use function to create parent node 16 
let penStatus = true;
let eraStatus = false;
let isDrawing = false;

const gridContainer = document.querySelector('.grid-container');

function draw() {
    gridContainer.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('block') && (penStatus || eraStatus)) {
            isDrawing = true;
            if (penStatus) {
                e.target.classList.add('marked');
                if (rainbowMode || bolderMode || softenMode) {
                    if (rainbowMode) {
                        e.target.style.backgroundColor = `${getRandomHex()}`;
                        e.target.style.opacity = 1;
                    }
                    if (bolderMode) {
                        // set to default color
                        if (!e.target.style.backgroundColor) {
                            e.target.style.backgroundColor = penColorCode;
                            e.target.style.opacity = 0;
                        }
                        e.target.style.opacity = increaseOpacity(e.target);
                    }
                    if (softenMode) {
                        const currentBg = getComputedStyle(e.target).background;
                        // if block background is not NaN
                        if (currentBg !== 'transparent' || currentBg !== 'rgba(0, 0, 0, 0)') {
                            e.target.style.opacity = decreaseOpacity(e.target);
                        }
                    }
                } else {
                    e.target.style.backgroundColor = `${penColorCode}`;
                    e.target.style.opacity = 1;
                }
            }
            if (eraStatus) {
                e.target.classList.remove('marked');
                e.target.style.backgroundColor = '';
            }
        }
    });

    gridContainer.addEventListener('mouseover' ,(e) => {
        if (e.target.classList.contains('block') && isDrawing) {
                if (penStatus) {
                    e.target.classList.add('marked');
                    if (rainbowMode || bolderMode || softenMode) {
                        if (rainbowMode) {
                            e.target.style.backgroundColor = `${getRandomHex()}`;
                            e.target.style.opacity = 1;
                        }
                        if (bolderMode) {
                            // set to default color
                            if (!e.target.style.backgroundColor) {
                                e.target.style.backgroundColor = penColorCode;
                                e.target.style.opacity = 0;
                            }
                            e.target.style.opacity = increaseOpacity(e.target);
                        }
                        if (softenMode) {
                            const currentBg = getComputedStyle(e.target).background;
                            // if block background is not NaN
                            if (currentBg !== 'transparent' || currentBg !== 'rgba(0, 0, 0, 0)') {
                                e.target.style.opacity = decreaseOpacity(e.target);
                            }
                        }
                    } else {
                        e.target.style.backgroundColor = `${penColorCode}`;
                        e.target.style.opacity = 1;
                    }
                }
                if (eraStatus) {
                    e.target.classList.remove('marked');
                    e.target.style.backgroundColor = '';
                }
        } 
    });
    // Stop drawing if mouse up anywhere
    document.addEventListener('mouseup', () => {
            isDrawing = false;
    });
}

function togglePrimaryTool(tool) {
    // if pen clicked -> eraser deactivate
    // if eraser clicked -> pen deactivate
    if (tool === 'pen') {
        penStatus = true;
        eraStatus = false;
        penButton.classList.toggle('activate', penStatus);
        eraButton.classList.remove('activate');
    } else if (tool == 'eraser') {
        eraStatus = true;
        penStatus = false;
        eraButton.classList.toggle('activate', eraStatus);
        penButton.classList.remove('activate');
    }
}

const penButton = document.querySelector('.pen');
const eraButton = document.querySelector('.eraser');
penButton.addEventListener('click', () => togglePrimaryTool('pen'));
eraButton.addEventListener('click', () => togglePrimaryTool('eraser'));

const gridSizeInput = document.querySelector('.grid-size');
const gridDimension = document.querySelector('.grid-dimension');
gridSizeInput.addEventListener('input', createNewGrid);


function createNewGrid() {
    function createGrid(height, width) {

    function createParentNode(row) {
        const target = document.querySelector('.grid-container');
        const parentDiv = document.createElement('div');
        parentDiv.setAttribute('class', 'row');
        parentDiv.setAttribute('id', `row-${row}`);
        target.appendChild(parentDiv);
    }

    function createChildNode(parentID, column) {
        const targetParent = document.querySelector(`#row-${parentID}`);
        const childDiv = document.createElement('div');
        childDiv.setAttribute('class', 'block');
        childDiv.setAttribute('id', `column-${column}`)
        targetParent.appendChild(childDiv);
    }

    for (let i = 1; i <= height; i++) {
        createParentNode(i);
        for (let j = 1; j <= width; j++) {
            createChildNode(i, j);
        }
    }
}
    function displayGridSize() {
        gridDimension.textContent = `${gridSizeInput.value} x ${gridSizeInput.value}`;
    }
    
    function clearGrid() {
        gridContainer.querySelectorAll('.row').forEach(row => row.remove());
    }
    
    function setBlockSize() {
        const gridContainerWidth = gridContainer.clientWidth;
        let blockWidth =  gridContainerWidth / gridSizeInput.value;
        
        gridContainer.querySelectorAll('.block').forEach( (block) => {
            block.style.width = `${blockWidth}px`;
            block.style.height = `${blockWidth}px`;
        })
    }

    displayGridSize();
    clearGrid();
    createGrid(gridSizeInput.value, gridSizeInput.value);
    setBlockSize();
    draw();
}


function resetGrid() {
    gridContainer.querySelectorAll('.block').forEach( (block) => {
        block.classList.remove('marked');
        block.style.backgroundColor = '';
    })
}
const reset = document.querySelector('.reset');
reset.addEventListener('click', resetGrid);

// Color-pick feature
const penColorPicker = document.querySelector('.penColor');
const bgColorPicker = document.querySelector('.backgroundColor');
let penColorCode = penColorPicker.value;
let bgColorCode = bgColorPicker.value;

penColorPicker.addEventListener('input', (e) => penColorCode = e.target.value);
bgColorPicker.addEventListener('input', (e) => {
    bgColorCode = e.target.value
    gridContainer.style.backgroundColor = bgColorCode;
});


// rainbow function
    // generate hex function
    // when drawing
    // generate hex
    // if mode is on
    // background color = random hex
    // write css to make botton hover rainbow (animate)
    
// darken color by 10% function
// soften color by 10% function

function getRandomHex() {
    const hexLetters = "0123456789ABCDEF"
    let hexColor = '#';
    for (let i = 0; i < 6; i++) {
        hexColor += hexLetters[Math.floor(Math.random() * hexLetters.length)];
    }
    return hexColor;
}

function toggleMode(mode) {
    // activate one mode at a time
    if (mode === 'rainbow') {
        rainbowMode = true;
        bolderMode = false;
        softenMode = false;
        rainbowButton.classList.toggle('activate');
        bolderButton.classList.remove('activate');
        softenButton.classList.remove('activate');
        if (!rainbowButton.classList.contains('activate')) rainbowMode = false;
        
    } else if (mode === 'bolder') {
        bolderMode = true;
        softenMode = false;
        rainbowMode = false;
        bolderButton.classList.toggle('activate');
        softenButton.classList.remove('activate');
        rainbowButton.classList.remove('activate');
        if (!bolderButton.classList.contains('activate')) bolderMode = false;
        
    } else if (mode === 'soften') {
        softenMode = true;
        bolderMode = false;
        rainbowMode = false;
        softenButton.classList.toggle('activate');
        bolderButton.classList.remove('activate');
        rainbowButton.classList.remove('activate');
        if (!softenButton.classList.contains('activate')) softenMode = false;
    }
    // check mode
    console.log('mode status')
    console.log(`rainbow mode: ${rainbowMode}`)
    console.log(`bolder mode: ${bolderMode}`);
    console.log(`soften mode: ${softenMode}`);
    console.log('');
}

function increaseOpacity(target) {
    // a progressive darkening effect where each interaction darkens the square by 10%
    let currentOpacity = parseFloat(target.style.opacity);
    if (isNaN(currentOpacity)) currentOpacity = 0;
    let newOpacity = Math.min(currentOpacity + 0.05, 1);
    console.log(`Opacity after increased: ${+newOpacity.toFixed(2)}`);
    return +newOpacity.toFixed(2);
}

function decreaseOpacity(target) {
    // a progressive lightening effect where each interaction lighten the square by 10%
    let currentOpacity = parseFloat(target.style.opacity);
    if (isNaN(currentOpacity)) {
        currentOpacity = parseFloat(getComputedStyle(target).opacity);
    };
    console.log(currentOpacity);
    let newOpacity = Math.max(currentOpacity - 0.05, 0);
    console.log(`Opacity after increased: ${+newOpacity.toFixed(2)}`);
    return +newOpacity.toFixed(2);
}

let rainbowMode = false;
let bolderMode = false;
let softenMode = false;
const rainbowButton = document.querySelector('.rainbow');
const bolderButton = document.querySelector('.bolder');
const softenButton = document.querySelector('.soften');
rainbowButton.addEventListener('click', () => toggleMode('rainbow'));
bolderButton.addEventListener('click', () => toggleMode('bolder'));
softenButton.addEventListener('click', () => toggleMode('soften'));
// create mode display using event dispatch
// add button click sound
// only use one mode at a time

createNewGrid();
draw()
