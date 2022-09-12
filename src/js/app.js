
class Timer {
    constructor () {
        this.isRunning = false;
        this.startTime = 0;
        this.overallTime = 0;
    }

    _getTimeElapsedSinceLastStart () {
        if (!this.startTime) {
        return 0;
        }

        return Date.now() - this.startTime;
    }

    start () {
        if (this.isRunning) {
        return console.error('Timer is already running');
        }

        this.isRunning = true;

        this.startTime = Date.now();
    }

    stop () {
        if (!this.isRunning) {
        return console.error('Timer is already stopped');
        }

        this.isRunning = false;

        this.overallTime = this.overallTime + this._getTimeElapsedSinceLastStart();
    }

    reset () {
        this.overallTime = 0;

        if (this.isRunning) {
        this.startTime = Date.now();
        return;
        }

        this.startTime = 0;
    }

    getTime () {
        if (!this.startTime) {
        return 0;
        }

        if (this.isRunning) {
        return this.overallTime + this._getTimeElapsedSinceLastStart();
        }

        return this.overallTime;
    }
}




// init main variables
const bars = document.querySelector(".bars");
var barsArr;
var barArray = [], correctArray = [];
let sortSpeed = 30;
let algorithemChoice, dencityCoice = "100";
let aboart = false;
let barAmount = 100, pxDencity = "9px", barWidth = "solid white 1px";
let scrambleType = "random";
var mute = true;
let timeout;
const context = new AudioContext();


document.getElementById("algorithemError").style.visibility = "hidden";
barArray = reset();
setDescripton("none");

// set the timer atributes and functions
const timer = new Timer();
setInterval(() => { 
    const timeInSeconds = (timer.getTime() / 1000).toFixed(1);
    document.getElementById('timer').innerText = "" + timeInSeconds;
    }, 100);



/**
 * initializes the arrays for the bars and the divs for drawing the bars
 * @param {number} barAmount amount of bars to display
 * @param {string} pxDencity width of each bar in pixels
 */
function init(barAmount, pxDencity, barBorder) {
    // create the bars
    for (let i = 0; i < barAmount; i++) { 
        const bar = document.createElement("div");
        bar.style.width = pxDencity;
        bar.style.borderLeft = barBorder;
        bars.appendChild(bar);
    }

    barsArr = Array.from(document.querySelectorAll(".bars div"));

    // create the bars with the specified height
    for (let i = 1; i < barsArr.length; i++) { 
        barArray.push(i*500 / barAmount); 
        correctArray[i - 1] = (i*500 / barAmount); 
    }
    return barArray;
}



