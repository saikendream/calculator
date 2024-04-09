// SELECTORS

const textField = document.querySelector("#digits");

// FORCE CARET TO THE END OF INPUT
// https://phuoc.ng/collection/html-dom/move-the-cursor-to-the-end-of-a-content-editable-element/

function forceCaret () {
    const range = document.createRange(); // Sets the RANGE
    const selection = window.getSelection(); // Watches the selection
    range.setStart(textField, textField.childNodes.length); // Sets the start and end
    range.collapse(true); // Sets the endpoint = start point
    selection.removeAllRanges(); // Delete all ranges
    selection.addRange(range); // Sets the new range to the SELECTION
};

// IGNORE WHITESPACES AND LETTERS

textField.addEventListener("input", function(e) {
    let pattern = /[\sa-zA-Z]+/g; // Sets the pattern to grab every alphabet and space character
    textField.textContent = textField.textContent.replace(pattern, ''); // Erases what matches PATTERN
    forceCaret();
});