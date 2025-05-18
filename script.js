// Create a function that generate 16 x 16 divs elements
    // function that create parent node
        // a function that create child node 
        // create childe node 16 times
    // use function to create parent node 16 

function createParentNode() {
    // parent div
    const target = document.querySelector('.container');
    const parentDiv = document.createElement('div');
    parentDiv.setAttribute('class', 'vertical');
    target.appendChild(parentDiv);

}

createParentNode();

function createChildNode() {
    const targetParent = document.querySelector('.vertical');
    const childDiv = document.createElement('div');
    childDiv.setAttribute('class', 'horizontal');
    targetParent.appendChild(childDiv);
}

createChildNode();
