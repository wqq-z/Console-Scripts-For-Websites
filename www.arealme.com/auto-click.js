// Configurable timeout in milliseconds before each click
let clickTimeout = 120; // Set to the lowest threshold for near-instant click (0.1 ms)

// NULL the timeout early click
clickTimeout = clickTimeout + 30
// Function to simulate a mousedown event on the target element with minimal delay
function simulateClickOnElement(element) {
    if (clickTimeout > 0) {
        setTimeout(() => {
            element.dispatchEvent(new Event('mousedown'));
            console.log("Dispatched mousedown event on .tfny-circleGreen element after timeout.");
        }, clickTimeout);
    } else {
        element.dispatchEvent(new Event('mousedown'));
        console.log("Dispatched immediate mousedown event on .tfny-circleGreen element.");
    }
}

// Observer callback to detect the appearance or toggle of .tfny-circleGreen
const observerCallback = function(mutationsList) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' || mutation.type === 'attributes') {
            const targetElement = document.querySelector('.tfny-circleGreen');
            if (targetElement) {
                simulateClickOnElement(targetElement);
                break; // Avoid redundant clicks within the same mutation cycle
            }
        }
    }
};

// Set up a MutationObserver to monitor the document body for class changes and new nodes
const observer = new MutationObserver(observerCallback);

// Start observing the document body for both new nodes (childList) and attribute changes on class
observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

console.log("Observer started, waiting for .tfny-circleGreen to appear or toggle.");


/* 
For some reason it clicks 20 - 30ms earlyer than expected
added a check funtion to prevent this but it doesnt works

Welp fixing it i had added to clickTimeout 30ms to deny this err.

Tested in: Firefox, Win 11
*/
