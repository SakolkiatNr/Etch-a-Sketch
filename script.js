// Create a function that generate 16 x 16 divs elements
    // function that create parent node
        // a function that create child node 
        // create childe node 16 times
    // use function to create parent node 16 

function createGrid(height, width) {

    function createParentNode(row) {
        const target = document.querySelector('.container');
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

function draw() {
    let isDrawing = false;
    const blocks = document.querySelectorAll('.block');
    blocks.forEach((block) => {

        block.addEventListener('mousedown', () => {
            if (penStatus) {
                isDrawing = true;
                block.classList.add('marked');
            }
        });
        
        block.addEventListener('mousemove', () => {
            if (isDrawing) {
                block.classList.add('marked');
            }
        }) 
    })
    // Stop drawing if mouse up anywhere
    document.addEventListener('mouseup', () => {
            isDrawing = false;
    });
}


const penButton = document.querySelector('.pen');
penButton.addEventListener('click', () => {
    penButton.classList.toggle('activate');
    penStatus = penButton.classList.contains('activate'); //return Boolean
});

draw();

// click button
    // toggle to activate
        // while activate
            // click, mousedown