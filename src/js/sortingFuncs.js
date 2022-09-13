/* functions to put in sorting functions:
colorBar() - color red ,
updateBarPositions() - update,
colorBar() - color black,
check aboart, 
checkIfInPlace() - check placement
*/



// bubbleSort function
async function bubbleSort(array) { 
    // will always be array length sqared
    let len = array.length;
    let swapped = false;
    for (let i = 0; i < len; i++) { //you can also use "for in", so you don't need the variable "len"
        swapped = false;
        for (let j = 0; j < len - i; j++) {
            colorBar(j, "red");
            await updateBarPositions(array);
            if (array[j] > array[j + 1]) {
                let tmp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = tmp;
                swapped = true;
            }
            colorBar(j, "black");
            if (aboart){return array;}
            checkIfInPlace(j, array[j]);
        }
        if (!swapped) {return array;}
    }
    return array;
};

// comb sort  function
async function combSort(array) { 

    let inc = array.length;
    let swap = true;

    while (!inc == 1 || swap){
        // recalibrate inc
        inc = Math.floor(inc / 1.4);
        if (inc < 1){
            inc = 1;
        }

        swap = false;
        for (let i = 0; i < array.length - inc; i++){
            colorBar(i, "red");
            colorBar(i + inc, "blue");
            await updateBarPositions(array);

            if (array[i] > array[i + inc]) { // swap position
                let tmp = array[i];
                array[i] = array[i + inc];
                array[i + inc] = tmp;
                swap = true;
            }

            colorBar(i, "black");
            colorBar(i + inc, "black");
            if (aboart){return array;}
            checkIfInPlace(i, array[i]);
        }
        if (!swap) {swap = !checkArraySorted(array);}
    }
    return array;
};



// function for the quickSortIterative (swaps the elements)
async function partition(arr, start, end){
    // Taking the last element as the pivot
    const pivotValue = arr[end];
    let pivotIndex = start; 
    
    
    for (let i = start; i < end; i++) {
        colorBar(i, "red");
        colorBar(pivotIndex, "blue");
        await updateBarPositions(arr);
        if (arr[i] < pivotValue) {
            // Swapping elements
            [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
            // Moving to next element
            colorBar(pivotIndex, "black");
            pivotIndex++;
        }
        colorBar(i, "black"); // ? change to "blue" if want more visualisation (use with second black)
        if (aboart){return false;}
    }
    
    // Putting the pivot value in the middle
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
    for (let i = 0; i < arr.length; i++) {
        colorBar(i, "black"); // ? if want more color visualisation unmark 
        checkIfInPlace(i, arr[i]);
    }
    return pivotIndex;
};

// quick sort function 
async function quickSort(arr) {
    // Creating an array that we'll use as a stack, using the push() and pop() functions
    stack = [];
    
    // Adding the entire initial array as an "unsorted subarray"
    stack.push(0);
    stack.push(arr.length - 1);
    
    // There isn't an explicit peek() function
    // The loop repeats as long as we have unsorted subarrays
    while(stack[stack.length - 1] >= 0){
        
        // Extracting the top unsorted subarray
    	end = stack.pop();
        start = stack.pop();
        
        pivotIndex = await partition(arr, start, end);
        
        // If there are unsorted elements to the "left" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex - 1 > start){
            stack.push(start);
            stack.push(pivotIndex - 1);
		}
        
        // If there are unsorted elements to the "right" of the pivot,
        // we add that subarray to the stack so we can sort it later
        if (pivotIndex + 1 < end){
            stack.push(pivotIndex + 1);
            stack.push(end);
        }
        
        if (aboart || checkArraySorted(arr)){return arr;}
    }
}


// selection sort function
async function selectionSort(arr){
    // speed will always be factorial of the array length
    for(let i = 0; i < arr.length; i++){
        let minptr = i;
        for(let j = i+1; j < arr.length; j++){
            colorBar(j, "red");
            await updateBarPositions(arr);
            colorBar(j, "black");
            if(arr[minptr] > arr[j]){
                colorBar(minptr, "black");
                minptr = j;
                colorBar(j, "blue");
            }
            if (aboart){return arr;}
        }
        //swap
        colorBar(minptr, "black");
        let temp = arr[i];
        arr[i] = arr[minptr];
        arr[minptr] = temp;
        checkIfInPlace(i, arr[i]);
    }
    return arr;
}


async function insertionSort (arr) {
    // ? sorting speed varies very much by how much the array is already sorted
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        
        colorBar(i, "blue");
        
        while (j >= 0 && arr[j] > key) {
            colorBar(j, "red");
            await updateBarPositions(arr);
            colorBar(j, "black");
            arr[j + 1] = arr[j];
            j = j - 1;
            
            if (aboart){return arr;}
        }
        
        colorBar(i, "black");
        for (let k = 0; k < i; k++) { // check if in place
            checkIfInPlace(k, arr[k]);
        }
        arr[j + 1] = key;
    }
    return arr;
};


// heap sort functions 
async function buildMaxHeap(arr){
// Get index of the middle element
    let i = Math.floor(arr.length / 2 - 1);
    let j = arr.length - 1;

    // Build a max heap out of
    // All array elements passed in
    while (i >= 0) {
        if (aboart){return arr;}
        colorBar(j, "blue");
        colorBar(j - 1, "blue");
        await heapify(arr, i, arr.length);
        i -= 1;
        j -= 2;
    }
    return arr;
}
  
async function heapify(heap, i, max){
    let index;
    let leftChild;
    let rightChild;
  
    while (i < max) {
        if (aboart){return heap;}
        index = i;
        // Get the left child index and right child index
        // Using the known formula
        leftChild = 2 * i + 1;
        rightChild = leftChild + 1;
        // If the left child is not last element 
        // And its value is bigger
        if (leftChild < max && heap[leftChild] > heap[index]) {
            index = leftChild;
        }
        // If the right child is not last element 
        // And its value is bigger
        if (rightChild < max && heap[rightChild] > heap[index]) {
            index = rightChild;
        }
        // If none of the above conditions is true
        // Just return
        if (index === i) {
            return heap;
        }
        
        // Else swap elements
        colorBar(i, "red");
        await updateBarPositions(heap);
        
        swap(heap, i, index);
        
        colorBar(i, "blue");
        
        checkIfInPlace(i, heap[i]);
        // Continue by using the swapped index
        i = index;
        if (aboart){return heap;}
    }
    return heap;
}

function swap(arr, firstItemIndex, lastItemIndex){
    let temp = arr[firstItemIndex];
    // Swap first and last items in the array
    arr[firstItemIndex] = arr[lastItemIndex];
    arr[lastItemIndex] = temp;

    return arr;
}

async function heapSort(arr){
    // Build max heap
    arr = await buildMaxHeap(arr);
    
    // Get the index of the last element
    lastElement = arr.length - 1;
    
    // Continue heap sorting until we have
    // One element left
    while (lastElement > 0) {
        if (aboart){return arr;}
        arr = swap(arr, 0, lastElement);
        arr = await heapify(arr, 0, lastElement);
        colorBar(lastElement, "green");
        lastElement -= 1;
        if (aboart){return arr;}
    }
    
    // Return sorted array
    return arr;
}





async function cocktailSort(arr) {
	//Start and end is used to keep track of where the beginning and the end of the array is at
	//to determine where needs to be checked for sorting
	//Swapped is our conditional to check if everything is sorted
	let start = 0, end = arr.length, swapped = true;

	while (swapped) {
		//Setting the flag to false, in case it is true from the previous iteration
		swapped = false;

		//Bubble sort from the left side of the array to the right, moving the largest.
		for (let i = start; i < end - 1; i++)
		{
            colorBar(i, "red");
            await updateBarPositions(arr);
            
			if (arr[i] > arr[i+1]) {
                let temp = arr[i];
				arr[i] = arr[i+1]; //? 
				arr[i+1] = temp;
				swapped = true;
			}
            if (aboart){return arr;}
            
            colorBar(i, "black");
            checkIfInPlace(i + 1, arr[i+1]);
            checkIfInPlace(i, arr[i]);
		}

		//This is to update the end, so that next iteration, we don't have to check this index.
		end--;

		//If everything is already sorted, we can break out of the loop early.
		if (!swapped)
		{
			break;
		}

		//Setting the flag to false, so it can be used for the next phase
		swapped = false;

		//Reverse Bubble sort, moving the smallest to the front.
		for (let i = end - 1; i > start; i--)
		{
            colorBar(i, "red");
            await updateBarPositions(arr);
            
			if (arr[i - 1] > arr[i])
			{
				let temp = arr[i];
				arr[i] = arr[i - 1];
				arr[i - 1] = temp;
				swapped = true;
			}
            
            if (aboart){return arr;}
            
            colorBar(i, "black");
            checkIfInPlace(i - 1, arr[i-1]);
            checkIfInPlace(i, arr[i]);
		}

		//This is to update the beginning, so that next iteration, we don't have to check this index.
		start++;
	}

	return arr;
}




async function shellSort(arr) {
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
                colorBar(j, "red");
                colorBar(j - gap, "blue");

                await updateBarPositions(arr);
				arr[j] = arr[j-gap];

                if (aboart){return arr;}

                colorBar(j, "black");
                colorBar(j - gap, "black");
                checkIfInPlace(j, arr[j]);
			}
            
			arr[j] = temp;
		}
	}

	return arr;
}





async function mergeSort(arr, start, end) {
    if (start >= end - 1) return;
    var mid = start + ~~((end - start) / 2);
  
    await mergeSort(arr, start, mid);
    await mergeSort(arr, mid, end);
  
    var cache = Array(end - start).fill(arr[0]);
    var k = mid;
  
    for (var i = start, r = 0; i < mid; r++, i++) {
        if (aboart){return arr;}
        while (k < end && arr[k] < arr[i]) {
            cache[r] = arr[k];
            r++;
            k++;
            await updateBarPositions(arr);
        }
        cache[r] = arr[i];
    }
  
    for (var i = 0; i < k - start; i++) {
        if (aboart){return arr;}
        arr[i + start] = cache[i];
        colorBar(i + start, "red");;
        await updateBarPositions(arr);
        colorBar(i + start, "blue");
        checkIfInPlace(i, arr[i]);
    }
    colorAllBlack(arr);
    return arr;
}
  



async function flashSort(arr) 
  {
    var max = 0, min = arr[0];
    var n = arr.length;
    var m = ~~(0.45 * n);
    var l = new Array(m);
 
    for (var i = 1; i < n; ++i) {
        if (arr[i] < min) {
            min = arr[i];
        }
        if (arr[i] > arr[max]) {
            max = i;
        }
        
        if (aboart){return arr;}
        colorBar(i, "blue");
        await updateBarPositions(arr);
        colorBar(i, "black");
    }
 
     if (min === arr[max]) {return arr;}
 
    var c1 = (m - 1) / (arr[max] - min);
 
 
    for (var k = 0; k < m; k++) {
        l[k] = 0;
    }
    for (var j = 0; j < n; ++j) {
        k = ~~(c1 * (arr[j] - min));
        ++l[k];
        
        if (aboart){return arr;}
        colorBar(j, "blue");
        await updateBarPositions(arr);
        colorBar(j, "black");
    }
 
    for (var p = 1; p < m; ++p) {
        l[p] = l[p] + l[p - 1];
        
        if (aboart){return arr;}
        colorBar(p, "red");
        await updateBarPositions(arr);
        colorBar(p, "black");
    }
 
    var hold = arr[max];
    arr[max] = arr[0];
    arr[0] = hold;
 
    //permutation
    var move = 0, t, flash;
    j = 0; 
    k = m - 1;
  
    while (move < (n - 1)) {
        while (j > (l[k] - 1)) {
            ++j;
            k = ~~(c1 * (arr[j] - min));
        }
        if (k < 0) break;
        flash = arr[j];
        while (j !== l[k]) {
            k = ~~(c1 * (flash - min));
            hold = arr[t = --l[k]];
            arr[t] = flash;
            flash = hold;
            ++move;
            
            if (aboart){return arr;}
            colorBar(t, "red");
            await updateBarPositions(arr);
            colorBar(t, "black");
            checkIfInPlace(t, arr[t]);

        }
    }
 
    //insertion
    for (j = 1; j < n; j++) {
        hold = arr[j];
         i = j - 1;
        while (i >= 0 && arr[i] > hold) {
            if (aboart){return arr;}
            colorBar(i, "red");
            await updateBarPositions(arr);
            colorBar(i, "black");
            arr[i + 1] = arr[i--];
            
        }
        arr[i + 1] = hold;
    }
    return arr;
}



async function countingSort(arr)
{
    var max = Math.max.apply(Math, arr);
    var min = Math.min.apply(Math, arr);

    var range = max - min + 1;
    var count = Array.from({length: range}, (_, i) => 0);
    var output = Array.from({length: arr.length}, (_, i) => 0);

    for (i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
        if (aboart){return arr;}
        colorBar(i, "blue");
        await updateBarPositions(arr);
        colorBar(i, "black");
    }

    let j = 0;
    for (i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
        if (aboart){return arr;}
        colorBar(j, "blue");
        await updateBarPositions(arr);
        colorBar(j, "black");
        j++;
        if(j == arr.length) j = 0;
    }

    for (i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
        if (aboart){return arr;}
        colorBar(i, "red");
        await updateBarPositions(arr);
        colorBar(i, "black");
    }

    for (i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        if (aboart){return arr;}
        colorBar(i, "red");
        await updateBarPositions(arr);
        colorBar(i, "black");
        checkIfInPlace(i, arr[i]);

    }
    return arr;
}


/**
 * Sorts an array using radix sort.
 * @param {Array} array The array to sort.
 * @param {number} [radix=10] The base/radix to use.
 * @returns The sorted array.
 */
 async function radixSort(array, radix) {
    if (array.length === 0) {
      return array;
    }
  
    radix = radix || 10;
  
    // Determine minimum and maximum values
    var minValue = array[0];
    var maxValue = array[0];

    for (var i = 1; i < array.length; i++) {
      if (array[i] < minValue) {
        minValue = array[i];
      } else if (array[i] > maxValue) {
        maxValue = array[i];
      }
    }
  
    // Perform counting sort on each exponent/digit, starting at the least
    // significant digit
    var exponent = 1;
    while ((maxValue - minValue) / exponent >= 1) {
        array = await countingSortByDigit(array, radix, exponent, minValue);
        await updateBarPositions(array);
        exponent *= radix;
        if (aboart){return shuffle(correctArray);}
    }
  
    return array;
  }
  
  /**
   * Stable sorts an array by a particular digit using counting sort.
   * @param {Array} array The array to sort.
   * @param {number} radix The base/radix to use to sort.
   * @param {number} exponent The exponent of the significant digit to sort.
   * @param {number} minValue The minimum value within the array.
   * @returns The sorted array.
   */
async function countingSortByDigit(array, radix, exponent, minValue) {
    var i;
    var bucketIndex;
    var buckets = new Array(radix).fill(0);
    var output = new Array(array.length);

  
    // Count frequencies
    for (i = 0; i < array.length; i++) {
      bucketIndex = Math.floor(((array[i] - minValue) / exponent) % radix);
      buckets[bucketIndex]++;
      colorBar(i, "blue");
      await updateBarPositions(array);
      colorBar(i, "black");
      if (aboart){return array;}

    }
  
    // Compute cumulates
    for (i = 1; i < radix; i++) {
      buckets[i] += buckets[i - 1];
    }
  
    // Move records
    for (i = array.length - 1; i >= 0; i--) {
      bucketIndex = Math.floor(((array[i] - minValue) / exponent) % radix);
      output[--buckets[bucketIndex]] = array[i];
    }
  
    // Copy back
    for (i = 0; i < array.length; i++) {
        array[i] = output[i];
        if (aboart){return array;}
        colorBar(i, "red");
        await updateBarPositions(array);
        colorBar(i, "black");
        checkIfInPlace(i, array[i]);

    }
  
    return array;
}

let MIN_MERGE = 8;
 
function minRunLength(n)
{
     
    // Becomes 1 if any 1 bits are shifted off
    let r = 0;
    while (n >= MIN_MERGE)
    {
        r |= (n & 1);
        n >>= 1;
    }
    return n + r;
}
 
// This function sorts array from left index to
// to right index which is of size atmost RUN
async function insertionSortTim(arr,left,right)
{
    for(let i = left + 1; i <= right; i++)
    {
        let temp = arr[i];
        let j = i - 1;
        colorBar(i, "blue");
         
        while (j >= left && arr[j] > temp)
        {
            colorBar(j, "red");
            await updateBarPositions(arr);
            colorBar(j, "black");
            arr[j + 1] = arr[j];
            j--;

            if (aboart){return arr;}
        }

        colorBar(i, "black");


        arr[j + 1] = temp;
    }
}
 
// Merge function merges the sorted runs
async function mergeTim(arr, l, m, r)
{
     
    // Original array is broken in two parts
    // left and right array
    let len1 = m - l + 1, len2 = r - m;
    let left = new Array(len1);
    let right = new Array(len2);
    for(let x = 0; x < len1; x++)
    {
        left[x] = arr[l + x];
    }
    for(let x = 0; x < len2; x++)
    {
        right[x] = arr[m + 1 + x];
    }
 
    let i = 0;
    let j = 0;
    let k = l;
 
    // After comparing, we merge those two
    // array in larger sub array
    while (i < len1 && j < len2)
    {
        colorBar(k, "red");
        await updateBarPositions(arr);
        colorBar(k, "blue");
        if (aboart){return arr;}
        if (left[i] <= right[j])
        {
            arr[k] = left[i];
            i++;
        }
        else
        {
            arr[k] = right[j];
            j++;
        }
        
        k++;
    }
    colorAllBlack(arr);
 
    // Copy remaining elements
    // of left, if any
    while (i < len1)
    {
        arr[k] = left[i];
        k++;
        i++;
    }
 
    // Copy remaining element
    // of right, if any
    while (j < len2)
    {
        arr[k] = right[j];
        k++;
        j++;
    }
}
 
// Iterative Timsort function to sort the
// array[0...n-1] (similar to merge sort)
async function  timSort(arr, n)
{
    let minRun = minRunLength(MIN_MERGE);
        
    // Sort individual subarrays of size RUN
    for(let i = 0; i < n; i += minRun)
    {
        await insertionSortTim(arr, i, Math.min(
            (i + MIN_MERGE - 1), (n - 1)));
        if (aboart){return arr;}
    }
 
    // Start merging from size
    // RUN (or 32). It will
    // merge to form size 64,
    // then 128, 256 and so on
    // ....
    for(let size = minRun; size < n; size = 2 * size)
    {
         
        // Pick starting point
        // of left sub array. We
        // are going to merge
        // arr[left..left+size-1]
        // and arr[left+size, left+2*size-1]
        // After every merge, we
        // increase left by 2*size
        for(let left = 0; left < n;
                          left += 2 * size)
        {
 
            // Find ending point of left sub array
            // mid+1 is starting point of right sub
            // array
            let mid = left + size - 1;
            let right = Math.min((left + 2 * size - 1),
                                    (n - 1));
 
            // Merge sub array arr[left.....mid] &
            // arr[mid+1....right]
            if(mid < right)
                await mergeTim(arr, left, mid, right);
            if (aboart){return arr;}
        }
    }
    return arr;
}

