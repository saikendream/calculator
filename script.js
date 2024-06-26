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
    const pattern = new RegExp("[^0-9\.\-]"); // Sets the pattern to grab every number

    if(pattern.test(e.key)) {
        //ignores invalid digits
    } else if(n1 === 0 || op == "") {
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
    if(n1 == 0) {
        n1 = +textField.textContent;
    } else if(op != "") {
        n2 = +document.getElementById("n2").textContent;
    };
};

function addNum(n1, n2) {
    return n1 + n2;
};

function subNum(n1, n2) {
    return n1 - n2;
};

function mulNum(n1, n2) {
    return n1 * n2;
};

function divNum(n1, n2) {
    return n1 / n2;
};
 
// DIV INPUT MANIPULATION

textField.addEventListener("click", function(e) {
    textField.focus();
});

function showResults(number) {
    let onGoing = true;
    op = "";

    if(!!document.getElementById("history")) {
        // Creates RESULT element
        const res = document.createElement("div");
        res.classList.add("result");
        res.textContent = document.getElementById("n1").textContent;
        document.getElementById("history").lastChild.appendChild(res);

        const operation = document.createElement("div");
        operation.classList.add("operation");
        const equation = document.createElement("div");
        equation.classList.add("equation")
        document.getElementById("n1").removeAttribute('id');
        document.getElementById("n2").removeAttribute('id');
        equation.innerHTML = textField.innerHTML;
        operation.appendChild(equation);
        document.getElementById("history").appendChild(operation);

        // Updates INPUT to result
        textField.innerHTML = `<span id="n1">${number}</span>`;
    } else {
        // Creates history board
        const historyBoard = document.createElement("div");
        historyBoard.id = "history"
        const operation = document.createElement("div");
        operation.classList.add("operation");
        const equation = document.createElement("div");
        equation.classList.add("equation")
        document.getElementById("n1").removeAttribute('id');
        document.getElementById("n2").removeAttribute('id');
        equation.innerHTML = textField.innerHTML;
        operation.appendChild(equation);
        historyBoard.appendChild(operation);
        document.body.appendChild(historyBoard);

        // Updates INPUT to result
        textField.innerHTML = `<span id="n1">${number}</span>`;
    }
};

function removeOperator() {
    if(i.classList.length > 1) { // If item has more than ONE class
        let lastClass = i.classList.length - 1; // Gets last class index
        i.classList.remove(i.classList[lastClass]); // Removes last class
    }
};

// MATH

function calculate(operation, func) {
    if(textField.innerHTML === '') {
        inputError();
    } else if(op !== operation && op !== "") {
        fillVariables();
        if(op == "plus") {
            n1 = addNum(n1, n2);
        } else if(op == "minus") {
            n1 = subNum(n1, n2);
        } else if(op == "xmark") {
            n1 = mulNum(n1, n2);
        } else if(op == "divide") {
            n1 = divNum(n1, n2);
        } else { inputError(); };
        showResults(n1);
        removeOperator();
        i.classList.add(`fa-${operation}`);
        textField.appendChild(i);
        fillVariables();
        op = operation;
    } else if(document.getElementById("n2")) {
        if(document.getElementById("n2").textContent !== "") {
            fillVariables();
            n1 = func(n1, n2);
            showResults(n1);
            removeOperator();
            i.classList.add(`fa-${operation}`);
            textField.appendChild(i);
            op = operation;
        };
    } else {
        fillVariables();
        removeOperator();
        i.classList.add(`fa-${operation}`);
        textField.appendChild(i);
        op = operation;
    };
};

// BUTTONS

clearBtn.addEventListener("click", function(e) {
    textField.innerHTML = "";
    if(document.getElementById("history")) {
        document.getElementById("history").remove()
    };
    n1 = 0;
    n2 = 0;
    op = "";
});

equalBtn.addEventListener("click", function(e) {
    fillVariables();

    if(op == "plus") {
        n1 = addNum(n1, n2);
        showResults(n1);
    } else if(op == "minus") {
        n1 = subNum(n1, n2);
        showResults(n1);
    } else if(op == "xmark") {
        n1 = mulNum(n1, n2);
        showResults(n1);
    } else if(op == "divide") {
        n1 = divNum(n1, n2);
        showResults(n1);
    } 
});

plusBtn.addEventListener("click", function(e) { calculate("plus", addNum); });
minusBtn.addEventListener("click", function(e) { calculate("minus", subNum) });
timesBtn.addEventListener("click", function(e) { calculate("xmark", mulNum) });
obelusBtn.addEventListener("click", function(e) { calculate("divide", divNum) });