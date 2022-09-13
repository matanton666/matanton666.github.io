

const bubblesort = {
    name: "Bubble Sort",
    desc:`
    Bubble sort is a sorting algorithm that sorts data in an array by looping through the array,
    and checking if the current item is greater than the next item.
    It will continue to loop through, swapping the items until they are sorted.
    If no swaps are made during a pass, then the data is sorted and we break the loop.`,

    code:`
function bubbleSort(arr) {
// This variable is used to either continue or stop the loop
let continueSorting = true;

// while continueSorting is true
while (continueSorting) {
  // setting continueSorting false. below check to see if swap,
  // if a swap,continue sorting. If no swaps, done sorting,
  // and stop our while loop.
  continueSorting = false;

  // loop through the arr from 0 to next to last
  for (let i = 0; i < arr.length - 1; i++) {
    // check if we need to swap
    if (arr[i] > arr[i + 1]) {
      // swap
      let temp = arr[i];
      arr[i] = arr[i + 1];
      arr[i + 1] = temp;

      // since a swap was made, we want to continue sorting
      continueSorting = true;
    }
  }
}

// After all swaps have been made, then we return our sorted array
return arr;`
}



const selection = {
    name: "Selection Sort",
    code:`
function swap(arr, i, j) {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
function selectionSort(arr) {
  let min;
  // idx is position to fill up with next smallest value
  for (let idx = 0; idx < arr.length - 1; idx++) {
    min = idx;
    // Look for next smallest value in rest of array
    for (let scan = idx + 1; scan < arr.length; scan++) {
      if (arr[scan] < arr[min]) {
        min = scan;
      }
    }
    // Exchange current value with the next smallest value
    swap(arr, idx, min);
  }
  return arr;
}`,
    desc: `
    selection sort is an in-place comparison sorting algorithm.
    It has an O(n2) time complexity, which makes it inefficient on large lists.
    The algorithm divides the input list into two parts: a sorted sublist of items
    which is built up from left to right at the front (left) of the list,
    and a sublist of the remaining unsorted items that occupy the rest of the list.`
}




const cocktail = {
    name: "Cocktail Sort",
    code:`
function cocktailSort(arr) {
	//Swapped is to check if everything is sorted
	let start = 0, end = arr.length, swapped = true;

	while (swapped) {
		swapped = false;

		//Bubble sort move largest to the end
		for (let i = start; i < end - 1; i++)
		{
			if (arr[i] > arr[i+1]) {
				let temp = arr[i];
				arr[i] = arr[i+1];
				arr[i+1] = temp;
				swapped = true;
			}
		}

		// update the end, for next iteration.
		end--;

		//If everything is already sorted, we can break.
		if (!swapped)
		{
			break;
		}

		//Set to false, so it can be used for the next phase
		swapped = false;

		//Reverse Bubble sort, move smallest to the front.
		for (let i = end - 1; i > start; i--)
		{
			if (arr[i - 1] > arr[i])
			{
				let temp = arr[i];
				arr[i] = arr[i - 1];
				arr[i - 1] = temp;
				swapped = true;
			}
		}

		//update the beginning
		start++;
	}

	return arr;
}`,
    desc: `
    The Cocktail Sort algorithm extends bubble sort by operating in two directions. 
    While it improves on bubble sort by more quickly moving items to the beginning of the list, 
    it provides only marginal performance improvements.
    The algorithem has a O(n^2) time complexity, and O(1) space complexity.`
}




const comb = {
    name: "Comb Sort",
    code:`
function combsort(arr)
{
 function is_array_sorted(arr) {
      var sorted = true;
      for (var i = 0; i < arr.length - 1; i++) {
          if (arr[i] > arr[i + 1]) {
              sorted = false;
              break;
          }
      }
      return sorted;
  }
 
  var iteration_count = 0;
  var gap = arr.length - 2;
  var decrease_factor = 1.25;
 
  // Repeat iterations Until array is not sorted
  
  while (!is_array_sorted(arr)) 
  {
      // If not first gap  Calculate gap
      if (iteration_count > 0)
         gap = (gap == 1) ? gap : Math.floor(gap / decrease_factor);
 
  // Set front and back elements and increment to a gap
      var front = 0;
      var back = gap;
      while (back <= arr.length - 1) 
      {
          // Swap the elements if they are not ordered
        
          if (arr[front] > arr[back])
          {
              var temp = arr[front];
              arr[front] = arr[back];
              arr[back] = temp;
          }
 
          // Increment and re-run swapping
        
          front += 1;
          back += 1;
      }
      iteration_count += 1;
  }
  return arr;
}`,
    desc: `
    Comb sort improves on bubble sort, by using a gap between elements that is larger than 1.
    The gap starts out large, and is reduced by a factor of 1.3 each pass through the list.
    The algorithem has a O(n^2) time complexity, and O(1) space complexity.`
}




const insertion = {
    name: "Insertion Sort",
    code:`
function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            // insert the wanted element in the correct place
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;
            }
            // next element
            inputArr[j+1] = current;
        }
    return inputArr;
}`,
    desc: `
    Insertion sort is a simple sorting algorithm,
    that builds the final sorted array one item at a time.
    It works by taking the next element from the input data, 
    and inserting it at the correct position in the array.
    The algorithem has a O(n^2) time complexity, and O(1) space complexity.`
}






const quicksort = {
  name: "Quick Sort",
  code:`
function swap(arr, leftIndex, rightIndex){
  // swap 2 elements in the array
    var temp = arr[leftIndex];
    arr[leftIndex] = arr[rightIndex];
    arr[rightIndex] = temp;
}
function partition(arr, left, right) {
    var pivot   = arr[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) { // while left pointer is smaller than right pointer
        while (arr[i] < pivot) { // move the left pointer to the right
            i++;
        }
        while (arr[j] > pivot) { // move the right pointer to the left
            j--;
        }
        if (i <= j) { //left pointer smaller or equal to right pointer
            swap(arr, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}
// run as quickSort(array, 0, array.length - 1);
function quickSort(arr, left, right) {
    var index;
    if (arr.length > 1) {
        index = partition(arr, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(arr, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(arr, index, right);
        }
    }
    return arr;
}`,
  desc: `
  Quicksort is a divide-and-conquer algorithm. 
  It works by selecting a 'pivot' element from the array,
  and partitioning the other elements into two sub-arrays,
  according to whether they are less than or greater than the pivot.
  The sub-arrays are then sorted recursively.
  The algorithem has a O(n*log(n)) time complexity, and O(1) space complexity.`
}



const heap = {
    name: "Heap Sort",
    code:`
function heap_root(input, i) {
  /* to create MAX  array */  
    var left = 2 * i + 1;
    var right = 2 * i + 2;
    var max = i;
  // if left child is larger than root
    if (left < array_length && input[left] > input[max]) {
        max = left;
    }
  // if right child is larger than max
    if (right < array_length && input[right] > input[max])     {
        max = right;
    }
  // if max is not root
    if (max != i) {
        swap(input, i, max);
        heap_root(input, max);
    }
}

function swap(input, index_A, index_B) {
    var temp = input[index_A];

    input[index_A] = input[index_B];
    input[index_B] = temp;
}

function heapSort(input) {
    
    array_length = input.length;
  // Building the heap 
    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
        heap_root(input, i);
      }
  // One by one extract and put in place
    for (i = input.length - 1; i > 0; i--) {
        swap(input, 0, i);
        array_length--;
      
        heap_root(input, 0);
    }
}`,
    desc: `
    heapsort divides its input into a sorted and an unsorted region, 
    and it iteratively shrinks the unsorted region by extracting the largest element. 
    and moving that to the sorted region.
    The algorithem has a O(n*log(n)) time complexity, and O(1) space complexity.`
}



const shell = {
    name: "Shell Sort",
    code:`
function shellSort(arr) {
	let n = arr.length;
  // Start with a big gap, then reduce the gap
	for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2))	{
    // Do a gapped insertion sort for this gap size.
		for (let i = gap; i < n; i += 1)  {
			let temp = arr[i];
			
			let j;
      // shift the elements more to the left
			for (j = i; j >= gap && arr[j-gap] > temp; j-=gap)  {
				arr[j] = arr[j-gap];
			}

			arr[j] = temp;
		}
	}

	return arr;
}`,
    desc: `
    Shell sort is mainly a combination of Comb Sort and Insertion sort.
    The algorithem starts by sorting pairs of elements far apart from each other,
    then progressively reducing the gap between elements to be compared.
    unlike comb sort it then uses insertion sort to get a faster sort.
    The algorithem has a O(n*log(n)) time complexity, and O(1) space complexity.`
}






const merge = {
    name: "Merge Sort",
    code:`
// Merges two subarrays of arr[].
// First subarray is arr[l..m]
// Second subarray is arr[m+1..r]
function merge(arr, l, m, r)
{
    var n1 = m - l + 1;
    var n2 = r - m;
  
    // Create temp arrays
    var L = new Array(n1); 
    var R = new Array(n2);
  
    // Copy data to temp arrays L[] and R[]
    for (var i = 0; i < n1; i++)
        L[i] = arr[l + i];
    for (var j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];
  
    // Merge the temp arrays back into arr[l..r]
  
    // Initial index of first subarray
    var i = 0;
    // Initial index of second subarray
    var j = 0;
    // Initial index of merged subarray
    var k = l;
  
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k] = L[i];
            i++;
        }
        else {
            arr[k] = R[j];
            j++;
        }
        k++;
    }
  
    // Copy the remaining elements of
    // L[], if there are any
    while (i < n1) {
        arr[k] = L[i];
        i++;
        k++;
    }
  
    // Copy the remaining elements of
    // R[], if there are any
    while (j < n2) {
        arr[k] = R[j];
        j++;
        k++;
    }
}
  
// l for left index r is
// right index of the sub-array
// of arr to be sorted
function mergeSort(arr,l, r){
    if(l>=r){
        return;//returns recursively
    }
    var m =l+ parseInt((r-l)/2);
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r);
}`,
    desc: `
    Merge sort is a divide-and-conquer algorithm, it recursivly sorts the array 
    starting with the smallest subarrays (2 numbers) and then merging them together.
    The algorithem has a O(n*log(n)) time complexity, and O(1) space complexity.`
}



const count = {
    name: "Counting Sort",
    code:` 
// implement with countingSort(array, 0, array.length - 1)
function countingSort(arr, min, max){
    const count = {};

    // First populate the count object
    for (let i = min; i <= max; i++) {
        count[i] = 0;
    }

    for (let i = 0; i < arr.length; i++) {
        count[arr[i]] += 1;
    }

    // Now, count is indexed by numbers, with values corresponding to occurrences
    // Then, iterate over count's properties from min to max:
    const sortedArr = [];

    for (let i = min; i <= max; i++) {
        while (count[i] > 0) {
            sortedArr.push(i);
            count[i]--;
        }
    }
    return sortedArr;
};`,
    desc: `
    counting sort is an algorithm for sorting a collection of integers
    according to keys that are small positive integers.
    It operates by counting the number of objects that possess distinct key values, 
    and applying prefix sum on those counts to determine 
    the positions of each key value in the output sequence.
    The algorithem has a O(2n) time complexity, and O(2n) space complexity.`
}





const flash = {
    name: "Flash Sort",
    code:`
function flashSort (arr) {
  let max = 0; let min = arr[0]
  const n = arr.length
  const m = ~~(0.45 * n)
  const l = new Array(m)
 
  // find max and min values
  for (let i = 1; i < n; ++i) {
    if (arr[i] < min) {
      min = arr[i]
    }
    if (arr[i] > arr[max]) {
      max = i
    }
  }

  // array sorted
  if (min === arr[max]) {
    return arr
  }
 
  // initialize the position of the elements
  const c1 = (m - 1) / (arr[max] - min)
 
  for (let k = 0; k < m; k++) {
    l[k] = 0
  }
 
  for (let j = 0; j < n; ++j) {
    const k = ~~(c1 * (arr[j] - min))
    ++l[k]
  }
 
  for (let p = 1; p < m; ++p) {
    l[p] = l[p] + l[p - 1]
  }
 
  let hold = arr[max]
  arr[max] = arr[0]
  arr[0] = hold
 
  // permutation
  let move = 0; let t; let flash
  let j = 0
  let k = m - 1
 
  // the main part of the algorithm
  while (move < (n - 1)) {
    while (j > (l[k] - 1)) {
      ++j
      k = ~~(c1 * (arr[j] - min))
    }
    if (k < 0) break
    flash = arr[j]
    while (j !== l[k]) {
      k = ~~(c1 * (flash - min))
      hold = arr[t = --l[k]]
      arr[t] = flash
      flash = hold
      ++move
    }
  }
 
  // insertion
  for (j = 1; j < n; j++) {
    hold = arr[j]
    let i = j - 1
    while (i >= 0 && arr[i] > hold) {
      arr[i + 1] = arr[i--]
    }
    arr[i + 1] = hold
  }
  return arr
}`,
    desc: `
    The algorithem assigns each of the n input elements to one of m buckets,
    efficiently rearranges the input to place the buckets in the correct order, 
    then sorts each bucket. 
    The algorithem has a O(n) computation complexity`
}





const radix = {
    name: "Radix Sort",
    code:`
function countingSort(arr, size, place){
  
  let output = new Array(size + 1).fill(0);
  let max = Math.max(...arr);
  
  let freq = new Array(max + 1).fill(0);
  
  // Calculate count of elements
  for (let i = 0; i < size; i++){
      const num = Math.floor(arr[i] / place) % 10;
      freq[num]++;
  }
  
  // Calculate cummulative count
  for (let i = 1; i < 10; i++){
      freq[i] += freq[i - 1];
  }

  // Place the elements in sorted order
  for (let i = size - 1; i >= 0; i--) {
      const num = Math.floor(arr[i] / place) % 10;
      output[freq[num] - 1] = arr[i];
      freq[num]--;
  }
  
  //Copy the output array
  for (let i = 0; i < size; i++){
    arr[i] = output[i];
  }
}

function radixSort(arr, size = arr.length){
  //Get the max element
  let max = Math.max(...arr);
  
  //Sort the array using counting sort
  for(let i = 1; parseInt(max / i) > 0; i *= 10){
    countingSort(arr, size, i);
  }
}`,
    desc: `
    radix sort is a non-comparative sorting algorithm.
    It avoids comparison by creating and distributing elements into buckets
    according to their radix. For elements with more than one significant digit,
    this bucketing process is repeated for each digit,
    while preserving the ordering of the prior step, 
    until all digits have been considered.
    The algorithem has a O(w*n) time complexity, and O(w+n) space complexity,
    where w is the key length.`
}


const tim = {
    name: "Tim Sort",
    code:` 
let MIN_MERGE = 32;

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
function insertionSort(arr,left,right)
{
    for(let i = left + 1; i <= right; i++)
    {
        let temp = arr[i];
        let j = i - 1;
          
        while (j >= left && arr[j] > temp)
        {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = temp;
    }
}
  
// Merge function merges the sorted runs
function merge(arr, l, m, r)
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
function  timSort(arr, n)
{
    let minRun = minRunLength(MIN_MERGE);
        
    // Sort individual subarrays of size RUN
    for(let i = 0; i < n; i += minRun)
    {
        insertionSort(arr, i, Math.min(
            (i + MIN_MERGE - 1), (n - 1)));
    }
  
    // Start merging from size
    // RUN (or 32). It will
    // merge to form size 64,
    // then 128, 256 and so on
    // ....
    for(let size = minRun; size < n; size *= 2)
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
                merge(arr, left, mid, right);
        }
    }
}`,
    desc: `
    TimSort is a sorting algorithm based on Insertion Sort and Merge Sort.
    First sort small pieces using Insertion Sort,
    then merges the pieces using a merge of merge sort.
    the algorithm has a O(n log n) time complexity, and O(n) space complexity.`
}





const algorithm = {
    name: "",
    code:` `,
    desc: ``
}

