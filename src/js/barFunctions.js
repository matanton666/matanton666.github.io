

/**
 * draws the bars on the page from the array
 */
function drawBars(array){
    array.forEach((bar, index) => {
        barsArr[index].classList.add("singleBar");
        barsArr[index].style.height = `${bar}px`
    });
}


// remove bars from screen
function removeBars(array){
    array.forEach((bar, index) => {
        barsArr[index].classList.remove("singleBar");
    });
}


/**
 * waits the specified amount of time given in milliseconds
 * @param {number} ms 
 * @returns none
 */
const sleep = async (ms) => {
    return new Promise((resolve) => {setTimeout(resolve, ms);});
};


/**
 * shuffles the elements in the bar array
 * @param {Array} Arr 
 * @returns shuffled array
 */
function shuffle(Arr){
    Arr.sort(() => Math.random() - 0.5);
    return Arr;
}


// colors all bars in purple and then in green
async function afterSort(arr){
    if (!aboart){
        for(let i = 0; i < arr.length; i++) {
            barsArr[i].style.backgroundColor = "darkblue";
            await sleep(0);
            if (aboart){return arr;}
            
        }
        for(let i = 0; i < arr.length; i++) {
            barsArr[i].style.backgroundColor = "green";
            await sleep(0);
            if (aboart){return arr;}    
        }
    }
}


/**
 * updates the position of all of the bars from the array to the screen
 * @param {array} arr array of bar elements
 */
async function updateBarPositions(arr, speed=sortSpeed){
    drawBars(arr);
    await sleep(speed);
    removeBars(arr);
}



function halfShuffle(arr){
    let newArr = []
    arr = shuffle(arr);
    const half = Math.floor(arr.length / 2);
    let secondHalf = arr.splice(-half);
    arr = sort(arr);

    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i]);
        newArr.push(secondHalf[i]);
    }

    newArr = newArr.filter(e => e !== undefined);
    console.log(newArr);
    // secondHalf = shuffle(secondHalf);
    return newArr;
}



function unique(arr){
    arr = sort(arr);
    const half = Math.floor(arr.length / 1.01);
    const secondHalf = arr.splice(0, half);
    console.log(arr.concat(secondHalf));
    arr = sort(arr).reverse();
    return arr.concat(secondHalf);
}


// sets the type of scramble to the chosen one 
function setScrambleType(arr){
    switch(scrambleType){
        case "random":
            return shuffle(arr);
        
        case "half":
            return halfShuffle(arr); 
        
        case "reverse": 
            return arr.reverse();
        
        case "unique":
            return unique(arr); 
    }
}





/**
 removes all the divs from the html script
  of the bars (used for setting new amounts of bars)
 */
function removeDivs() {
    let first = bars.firstChild;
    while(first) {
        first.remove();
        first = bars.firstChild;
    }
}




/**
 * checks if a certain bar is in the correct place in the list and colors it red
 * @param {number} index index of the bar 
 * @param {number} bar value in the index
 */
function checkIfInPlace(index, bar) {
    if (correctArray[index] == bar) {
        colorBar(index, "green");
    }
}


// collors all ars in black
function colorAllBlack(arr) {
    arr.forEach((bar, index) => {
        barsArr[index].style.backgroundColor = "black";
    });
}


/**
 * colors a single bar in the given color
 * @param {number} index index of the bar 
 * @param {string} color the wanted color
 */
async function colorBar(index, color){
    if (!mute){ playSound(index);}
    barsArr[index].style.backgroundColor = color;
}


// sorts a array using shell sort function (instant sort)
function sort(arr) {
    // this is a combination of comb sort and insertion sort, starting with comb and when its close to being sorted it goes to insertion
	let n = arr.length;
	//With this, the gap starts as half of the array length, and then half of that every time
	for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))
	{
		//Do a insertion sort for each of the section the gap ends up dividing
		for (let i = gap; i < n; i += 1)
		{
			//We store the current varible
			let temp = arr[i];
			
			//This is the insection sort to sort the section into order
			let j;
			for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)
			{
				arr[j] = arr[j-gap];
			}
			arr[j] = temp;
		}
	}

	return arr;
}


/**
 * resets the array to have the specified number of elements in order
 * @param {array} arr the array to reset
 * @returns array reset
 */
const resetArray = (arr) => {
    let length = arr.length - 1;
    arr = [];
    for (let i = 1; i < length; i++) { 
        arr.push(i*500 / barAmount);
    }
    return arr;
};


// uses the correct array to check if the array is sorted
const checkArraySorted = (arr) => {
    for(let i = 0; i < arr.length; i++) {
        if (correctArray[i] != arr[i]){return false;}
    }
    return true;
}


/**
 * gets the pitch of sound to play according to the bar height
 * @param {number} i the index of the bar  
 */
async function playSound(i){
    let pitch = barsArr[i].style.height;
    pitch = parseInt(pitch.match(/\d+/)[0]) // get only numbers
    loadSample("./src/sound/short-beep-sound-effect_vZ2ban22.mp3")
  .then(sample => playSample(sample, (pitch / 2000) + 0.4)); // 2000 and 0.4 can be tuned for better sound
}




/*
async function inSortArangeBars(index, arr){
    colorBar(j, "red");
    colorBar(j - gap, "blue");

    await updateBarPositions(arr);
    if (aboart){return arr;}

    colorBar(j, "black");
    colorBar(j - gap, "black");
    checkIfInPlace(j, arr[j]);


        if (aboart){return arr;}
        colorBar(i, "red");
        await updateBarPositions(arr);
        colorBar(i, "black");
}
*/
