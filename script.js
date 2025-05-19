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
                e.target.style.backgroundColor = `${penColorCode}`;
            }
            if (eraStatus) {
                e.target.classList.remove('marked');
                e.target.style.backgroundColor = '';
            }
        }
    });

    gridContainer.addEventListener('mousemove' ,(e) => {
        if (e.target.classList.contains('block') && isDrawing) {
                if (penStatus) {
                    e.target.classList.add('marked');
                    e.target.style.backgroundColor = `${penColorCode}`;
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

// Create function that retrieve color data
const penColorPicker = document.querySelector('.penColor');
const bgColorPicker = document.querySelector('.backgroundColor');

let penColorCode = penColorPicker.value;
let bgColorCode = bgColorPicker.value;

penColorPicker.addEventListener('input', (e) => penColorCode = e.target.value);
bgColorPicker.addEventListener('input', (e) => {
    bgColorCode = e.target.value
    gridContainer.style.backgroundColor = bgColorCode;
});

createNewGrid();
draw()
