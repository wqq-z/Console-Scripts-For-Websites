function checkAndClick() {
    const element = document.querySelector(".tfny-circleGreen");
    let delay = 110
    if (element) {
        console.log("found element, waiting to click...");

        setTimeout(() => {
            console.log("click with", delay);
            element.dispatchEvent(new Event('mousedown'));
        }, delay);
    }
}

// Set a recurring check every 1 ms
setInterval(checkAndClick, 1);

/* 
For some reason it doesnt click as required bruh
*/
