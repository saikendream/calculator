// SELECTORS

const textField = document.querySelector("#digits");

// FORCE CARET TO THE END OF INPUT (https://phuoc.ng/collection/html-dom/move-the-cursor-to-the-end-of-a-content-editable-element/)

function forceCaret () {
    const range = document.createRange(); // Sets the RANGE
    const selection = window.getSelection(); // Watches the selection
    range.setStart(textField, textField.childNodes.length); // Sets the start and end
    range.collapse(true); // Sets the endpoint = start point
    selection.removeAllRanges(); // Delete all ranges
    selection.addRange(range); // Sets the new range to the SELECTION
};
 
// DIV INPUT MANIPULATION

textField.addEventListener("input", function(e) {
    let pattern = new RegExp("[^0-9]"); // Sets the pattern to grab every alphabet and space character
    let isNum = new RegExp("[0-9]");
    const i = document.createElement("i");
    i.classList.add("fa-solid")
    if(e.data == "+") {
        textField.textContent = textField.textContent.replace("+", '');
        i.classList.add("fa-plus");
        textField.appendChild(i);
    } else if(e.data == "-") {
        textField.textContent = textField.textContent.replace("-", '');
        i.classList.add("fa-minus");
        textField.appendChild(i);
        //textField.innerHTML = textField.innerHTML.replace('-', '<i class="fa-solid fa-minus"></i>');
    } else if(e.data == "*") {
        i.classList.add("fa-xmark");
        textField.appendChild(i);
        //textField.innerHTML = textField.innerHTML.replace('*', '<i class="fa-solid fa-xmark"></i>');
    } else if(e.data == "/") {
        i.classList.add("fa-divide");
        textField.appendChild(i);
        //textField.innerHTML = textField.innerHTML.replace('/', '<i class="fa-solid fa-divide"></i>');
    } else { textField.textContent = textField.textContent.replace(pattern, ''); };
    
    /* else if(isNum.test(e.data)) {
        console.log("e.data is a number");
        const n = document.createElement("span");
        n.textContent = e.data;

        textField.appendChild(n);
        textField.textContent = ''; // Erases what matches PATTERN
        forceCaret();
    } else if(pattern.test(e.data)) {
        textField.textContent = '';
        forceCaret();
    }; */
    
    forceCaret();
});