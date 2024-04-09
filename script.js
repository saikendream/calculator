// SELECTORS

const textField = document.querySelector("#digits");

// IGNORE WHITESPACES AND LETTERS

textField.addEventListener("input", function(e) {
    console.log("onlyNums has been fired");
    console.log("input is " + textField.textContent);
    let pattern = /[\sa-zA-Z]+/g;
    textField.textContent = textField.textContent.replace(pattern, '');
});