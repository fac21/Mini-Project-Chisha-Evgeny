function equal(actual, expected, message) {
    if (actual === expected) {
        const defaultMessage = `Expected ${expected} and received ${actual}`;
        console.info("Pass: " + (message || defaultMessage));
    } else {
        const defaultMessage = `Expected ${expected} but received ${actual} instead`;
        console.error("Fail: " + (message || defaultMessage));
    }
}

function notEqual(actual, expected, message) {
    if (actual !== expected) {
        const defaultMessage = `${expected} is different to ${actual}`;
        console.info("Pass: " + (message || defaultMessage));
    } else {
        const defaultMessage = `${expected} is the same as ${actual}`;
        console.error("Fail: " + (message || defaultMessage));
    }
}

function test(name, testFunction) {
    console.group(name);
    testFunction();
    console.groupEnd(name);
}

test("Test text input displays correctly", () => {
    let selectInput = document.querySelector("#text");
    selectInput.value = "checking";
    let theButton = document.querySelector("#speak");
    theButton.click();
    let result = selectInput.value;
    selectInput.value = '';

    equal(result, "checking");
});