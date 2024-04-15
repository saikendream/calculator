// SELECTORS

const textField = document.querySelector("#digits");
const inputNumA = document.querySelector("#n1");
const clearBtn = document.querySelector("#c-btn");
const plusBtn = document.querySelector("#pl-btn");
const minusBtn = document.querySelector("#mn-btn");
const timesBtn = document.querySelector("#mp-btn");
const obelusBtn = document.querySelector("#dv-btn");
const equalBtn = document.querySelector("#eq-btn");

// VARIABLES

let n1 = 0;
let n2 = 0;
let op = "";

// MATH ICON

const i = document.createElement("i");
i.classList.add("fa-solid");

// PAGE EFFECTS

function inputError() {
    const errorMsg = document.createElement("p");
    errorMsg.classList.add("error");
    errorMsg.textContent = "Operation invalid";
    document.body.appendChild(errorMsg);
    textField.classList.add("invalid");
    setTimeout(() => {
        errorMsg.classList.add("visible");
        setTimeout(() => {
            textField.classList.remove("invalid");
            errorMsg.classList.remove("visible");
            setTimeout(() => { errorMsg.remove(); }, 1000);
        }, 1000);
    }, 50);
};

// DIGITS

function typeDigit(e) {
    const pattern = new RegExp("[^0-9\,\.\-]"); // Sets the pattern to grab every number

    if(pattern.test(e.key)) {
        //ignores invalid digits
    } else if(n1 === 0) {
        if(textField.textContent == "") {
            const numA = document.createElement("span");
            numA.setAttribute("id", "n1");
            numA.textContent = e.key;
            textField.appendChild(numA);
        } else {
            document.getElementById("n1").textContent += e.key
        };
    } else {
        if(!!document.getElementById("n2")) {
            document.getElementById("n2").textContent += e.key
        } else {
            const numB = document.createElement("span");
            numB.setAttribute("id", "n2");
            numB.textContent = e.key;
            textField.appendChild(numB);
        };
    };
};

window.addEventListener('keydown', typeDigit)

// OPERATORS

function fillVariables() {
    console.log("fillVariables running")
    if(n1 == 0) {
        n1 = +textField.textContent;
        console.log(`n1 is ${n1}, a ${typeof n1}`);
    } else if(op != "") {
        n2 = +document.getElementById("n2").textContent;
        console.log(`n2 is ${n2}, a ${typeof n2}`);
    } else { console.log("n1 is filled") };
};

function addNum(n1, n2) {
    let result = n1 + n2;
};

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

textField.addEventListener("click", function(e) {
    console.log("textField clicked");
    textField.focus();
});

/*
textField.addEventListener("input", function(e) {
    const pattern = new RegExp("[^0-9\,\.\-]"); // Sets the pattern to grab every number
    if(n1 == 0) {
        inputNumA.textContent = inputNumA.textContent.replace(pattern, ''); // Ignores every character but digits
    } else {
        let selectedInput = window.getSelection();
        let node = selectedInput.focusNode.parentNode;
        let fullInput = node.innerHTML;

        const inputNumB = document.createElement("span");
        inputNumB.setAttribute("id", "n2")


        node.replaceWith(inputNumB);
        inputNumB.textContent = inputNumB.textContent.replace(pattern, ''); // Ignores every character but digits
    };
    forceCaret(); // Force caret to the end of the input value
});
*/

// BUTTONS

clearBtn.addEventListener("click", function(e) {
    console.log('CLEAR clicked');
    textField.innerHTML = "";
    n1 = 0;
    n2 = 0;
    op = "";
});

plusBtn.addEventListener("click", function(e) {
    console.log('PLUS clicked');
    op = "plus"
    if(textField.innerHTML === '') {
        inputError();
    } else {
        console.log("Function runing");
        fillVariables();
        i.classList.add("fa-plus");
        textField.appendChild(i);
    };
});


// This idea is not working. I'll try another method.

/*
    const i = document.createElement("i");
    i.classList.add("fa-solid");

if(!isNaN(e.data)) {
        console.log("Input is a number");
        n1.textContent += e.data;
        textField.textContent = textField.textContent.replace(isNum, '');
        textField.appendChild(n1);
    } else if(e.data == "+") {
        // textField.textContent = textField.textContent.replace("+", '');
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
    } else { console.log('error'); textField.textContent = textField.textContent.replace(pattern, ''); };
    
    else if(isNum.test(e.data)) {
        console.log("e.data is a number");
        const n = document.createElement("span");
        n.textContent = e.data;

        textField.appendChild(n);
        textField.textContent = ''; // Erases what matches PATTERN
        forceCaret();
    } else if(pattern.test(e.data)) {
        textField.textContent = '';
        forceCaret();
    };
    
*/