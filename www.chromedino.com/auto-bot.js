(function autoT_RexBot() {
    // Function to simulate a keydown event
    const triggerKeyEvent = (keyCode) => {
        const event = new KeyboardEvent('keydown', {
            key: keyCode === 32 ? ' ' : 'ArrowDown',
            keyCode: keyCode,
            code: keyCode === 32 ? 'Space' : 'ArrowDown',
            which: keyCode,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(event);
    };

    const jump = () => {
        if (Runner.instance_.crashed || Runner.instance_.paused) return;
        triggerKeyEvent(32); // Space key for jump
    };

    const crouch = () => {
        if (Runner.instance_.crashed || Runner.instance_.paused) return;
        triggerKeyEvent(40); // Down arrow key for crouch
    };

    const detectObstacle = () => {
        if (Runner.instance_.horizon.obstacles.length > 0) {
            const obstacle = Runner.instance_.horizon.obstacles[0];
            
            const minDistance = 45 + obstacle.width / 2;
            const isClose = obstacle.xPos < minDistance;
            const isApproaching = obstacle.xPos > 0;

            // Decide whether to jump or crouch based on obstacle height
            if (isClose && isApproaching) {
                if (obstacle.yPos > 70) { // High obstacle, need to jump
                    jump();
                } else { // Low obstacle, need to crouch
                    crouch();
                }
            }
        }
    };

    const intervalId = setInterval(detectObstacle, 10);

    console.log("Bot running! Type `clearInterval(" + intervalId + ");` to stop.");
})();

/*
It Doesnt Works At Expected But it will be fixed soon!
 */