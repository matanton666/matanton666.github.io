// resets the bars on screen, stops the sorting if started
function reset() { 
    aboart = true;
    // reset bars and initialize them
    removeBars(barArray);
    removeDivs();

    barArray = []; 
    barArray = init(barAmount, pxDencity, barWidth);

    barArray = setScrambleType(barArray);
    drawBars(barArray);
    // enable disabled
    document.getElementById("done").style.fontSize = "0px";
    document.getElementById("startBtn").disabled = false;
    document.getElementById("algorithemError").style.visibility = "hidden";

    colorAllBlack(barArray);
    return barArray;
}


function setDescripton(algorithem) {
    const code = document.getElementById("code");
    const name = document.getElementById("sortName");
    const desc = document.getElementById("description");
    if (algorithem == "none"){
        // hide description and code and show site info 
        document.getElementById("more info").style.visibility = "hidden";
        document.getElementById("codeDiv").style.visibility = "hidden";
        document.getElementById("descDiv").style.visibility = "hidden"; 
        document.getElementById("sortName").style.visibility = "hidden"; 
        return 0;
    }
    let obj = algorithm;
    
    switch(algorithem){
        case "bubble":
            obj = bubblesort;
            break;
            
        case "quick":
            obj = quicksort;
            break;
            
        case "selection":
            obj = selection;
            break;
            
        case "cocktail":
            obj = cocktail;
            break;
            
        case "comb":
            obj = comb;
            break;
            
        case "insertion":
            obj = insertion;
            break;
            
        case "heap":
            obj = heap;
            break;
            
        case "shell":
            obj = shell;
            break;
            
        case "merge":
            obj = merge;
            break;
            
        case "count":
            obj = count;
            break;
            
        case "flash":
            obj = flash;
            break;
            
        case "radix":
            obj = radix;
            break;
    }
            
    name.innerHTML = obj.name;
    code.innerHTML = obj.code;
    desc.innerHTML = obj.desc;
    hljs.highlightAll();
    console.log(obj.code);
    document.getElementById("more info").style.visibility = "visible";
    document.getElementById("codeDiv").style.visibility = "visible";
    document.getElementById("descDiv").style.visibility = "visible"; 
    document.getElementById("sortName").style.visibility = "visible"; 
}

// gets the algorithemChoice from the user
function getAlgorithm(){
    document.getElementById("algorithemError").style.visibility = "hidden";
    algorithemChoice = document.getElementById("algorithems").value;
    setDescripton(algorithemChoice);
}



function selectScrambleType(){
    scrambleType = document.getElementById("scrambleType").value;
    barArray = reset();
}





/**
 * gets the number from the sliding bar and updates on screen
 */
 function getBarNum(){
    let slider = document.getElementById("slider");
    let txt = document.getElementById("speedTxt");
    sortSpeed = 300 - (slider.value * 3);
    txt.innerHTML = "sorting speed: " + slider.value;
}


// changes the image on the sound button
function toggleMute(){
    document.getElementById("mute").style.backgroundImage = (mute) ? "url(./src/pictures/speaker.png)" : "url(./src/pictures/volume-mute.png)";
    mute = !mute;
}

// make text bigger untill it gets to the max size
async function popupText(element, max){
    for(let i = 0; i < max; i++){
        if (aboart){return 0};
        element.style.fontSize = i + "px";
        await sleep(0);
    }
}




function loadSample(url){
    return fetch(url)
    .then(response => response.arrayBuffer())
    .then(buffer => context.decodeAudioData(buffer));
}



function playSample(sample, rate) {
    const source = context.createBufferSource();
    source.buffer = sample;
    source.playbackRate.value = rate;
    source.connect(context.destination);
    source.start(0);
}





/**
 * changes the amount of bars on the screen and their thikness.
 * gets the amount from the dencitySelect dropdown menu, removes all bars
 * and their atributes, then sets the new amounts
 * then redraws the bars
 */
 function changeDencity(){
    dencityCoice = document.getElementById("dencitySelect").value; // get choice
    barWidth = "solid white 1px"    
    switch(dencityCoice){
        case "100": 
            barAmount = 100;
            pxDencity = "9px";
            break;
        
        case "250":
            barAmount = 250;
            pxDencity = "3px";
            break;
        
        case "500":
            barAmount = 500;
            pxDencity = "2px";
            barWidth = "solid white 0px"    
            break;
        
        case "50":
            barAmount = 50;
            pxDencity = "19px";
            break;
        
        default:
            alert("Please select a dencity");
            break;
    }
    // draw the bars
    barArray = reset();
}






// when person clicks the start button:
async function startBtn(){ // main function
    // disable things
    popupText(document.getElementById("done"), 2);
    document.getElementById("algorithemError").style.visibility = "hidden";
    document.getElementById("dencitySelect").disabled = true;
    document.getElementById("startBtn").disabled = true;
    document.getElementById("scrambleType").disabled = true;
    aboart = false; // not reset

    timer.reset(); 
    timer.start();

    switch (algorithemChoice) {
        
        case "quick":
            await quickSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;
            
        case "bubble":
            barArray = await bubbleSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "selection": 
            barArray = await selectionSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "comb": 
            barArray = await combSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "insertion": 
            barArray = await insertionSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "heap": 
            barArray = await heapSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;
        
        case "cocktail":
            barArray = await cocktailSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "shell":
            barArray = await shellSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "merge":
            barArray = await mergeSort(barArray, 0, barArray.length);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "count":
            barArray = await countingSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "flash":
            barArray = await flashSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;

        case "radix":
            barArray = await radixSort(barArray);
            afterSort(barArray);
            popupText(document.getElementById("done"), 60);
            break;
            
        default:
            document.getElementById("algorithemError").style.visibility = "visible";
            document.getElementById("startBtn").disabled = false;
            break;
    }
    
    timer.stop();
    // here is what happens after the sort is finished
    drawBars(barArray);
    if (aboart){barArray = reset();}
    document.getElementById("dencitySelect").disabled = false;// renable
    document.getElementById("scrambleType").disabled = false;
}

