// SELECTORS

const textField = document.querySelector("#digits");

// IGNORE WHITESPACES AND LETTERS

textField.addEventListener("input", function(e) {
    let pattern = /[\sa-zA-Z]+/g;
    this.value = this.value.replace(pattern, '');
});