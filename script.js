// Create a function that generate 16 x 16 divs elements
    // function that create parent node
        // a function that create child node 
        // create childe node 16 times
    // use function to create parent node 16 

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

createGrid(16,16);

let penStatus = false;
let eraStatus = false;
let isDrawing = false;

function draw() {
    const gridContainer = document.querySelector('.grid-container');
    
    gridContainer.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('block')) {
            if (penStatus || eraStatus) {
                isDrawing = true;
                if (penStatus) block.classList.add('marked');
                if (eraStatus) block.classList.remove('marked');
            }
        }
    })



    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block) => {

        // block.addEventListener('mousedown', () => {
        //     if (penStatus || eraStatus) {
        //         isDrawing = true;

        //         if (penStatus) {
        //             block.classList.add('marked');
        //         } 
        //         if (eraStatus) {
        //             block.classList.remove('marked');
        //         }
        //     }
        // });
        
        block.addEventListener('mousemove', () => {
            if (isDrawing) {
                if (penStatus) {
                    block.classList.add('marked');
                }
                if (eraStatus) {
                    block.classList.remove('marked')
                }
            }
        }) 
    })
    // Stop drawing if mouse up anywhere
    document.addEventListener('mouseup', () => {
            isDrawing = false;
    });
}

// if pen clicked -> eraser deactivate
// if eraser clicked -> pen deactivate
const penButton = document.querySelector('.pen');
const eraButton = document.querySelector('.eraser');

penButton.addEventListener('click', () => {
    penButton.classList.toggle('activate');
    eraButton.classList.remove('activate');
    penStatus = penButton.classList.contains('activate');
    eraStatus = false;
});
eraButton.addEventListener('click', () => {
    eraButton.classList.toggle('activate');
    penButton.classList.remove('activate');
    eraStatus = eraButton.classList.contains('activate');
    penStatus = false;
})

draw();

