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
        childDiv.setAttribute('class', 'column block');
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
