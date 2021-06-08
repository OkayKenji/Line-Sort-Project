// This is the main.js; 
// The main purpose of the program is the visually display diffrent sort methods.  
//
// Implemented sorts: 
//  * Selection sort
//  * Insertion sort
//  * Merge Sort
//  * Heap Sort
//  * Quick Sort
//  * Shellsort
//
// Possible future versions:
//  * https://en.wikipedia.org/wiki/Sorting_algorithm#Popular_sorting_algorithms;
//
// v1.2021.F 
//
// Special thanks to: 
// * "Daniel Shiffman" @ The Coding Train for helping me to learn this stuff
//    See his channel here: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw; 
// * w3schools
// * https://developer.mozilla.org/en-US/docs/Web/JavaScript
// * The developers of p5.js

//global vars 
// @param sortAllowed       Remembers if sorting is allowed.
// @param startBar          Waits until user moves on from start screen
// @param createShuffle     If true, creates array of lines and shuffles it
// @param arrToSort         Stores the array that has elements that need to be sorted
// @param index             Index used for the sorting loops
// @param type              Type of sort requested
// @param colorScheme       Color to be used by bars
// @param inc               Automatically loop or manually do it.
// @param precede           If inc=false, 'precede' decides if loop can run once
// @param numRequestedBars  The number of bars the user wants
// @param barWidth          The width the bar has to be to fit all on the screen.
// @param saved             An array that stores the where bars should be located on x-axis. 
// @paran tempArr           An array that stores an array temporarily 
let sortAllowed = false;
let startBar = false;
let createShuffle = true;
let arrToSort;
let index;
let type;
let colorScheme;
let inc;
let precede = false;
let numRequestBars;
let barWidth;
let saved = [];
let tempArr = [];

//new global bars
let desiredSort;

function setup() {
  //Adds event listiner to updates description box. Also saves the deisred sort.
  document.getElementById("sortType").addEventListener("change", updateSortDescpBox);
  updateSortDescpBox();

  document.getElementById("numBars").addEventListener("change", barGenerator);
  document.getElementById("barColor").addEventListener("change", barGenerator);

  //add event listener to "Start" button; to start the program...(start meaning to start sorting)
  document.getElementById("start").addEventListener("click", startProgram);

  document.getElementById("reset").addEventListener("click", () => {   location.reload()})

  //moves lcoation of canvas
  let drawing = createCanvas(windowWidth * (3.75 / 5), windowHeight - 5); //4/5th of screen
  drawing.parent("canvas");

  //intial call to generate intial array;
  barGenerator();
}

function draw() {
  if (startBar) {
    background(0); //sets background black so that after each run we can't see the one before it. 

    //if sorting is allowed, runs the program in it
    if (sortAllowed) {
      //indicator 
      if (index < saved.length && (secretCode > 0)) {
        let indicate = new indicator(saved[index]);
        indicate.place();
      }

      drawAllLines();

      if (inc) { //if user wants to manually increment
        if (precede) {
          switch (desiredSort) {
            case 'Selection Sort':
              selectionSortA(index);
              index++;
              break;
            case 'Insertion Sort':
              insertionSortA(index);
              index++;
              break;
            case 'Merge Sort':
              mergeSortA(index);
              index++;
              break;
            case 'Heap Sort':
              heapSortA(index);
              index--;
              break;
            case 'Quick Sort':
              quickSortA(index);
              index++;
              break;
            case 'Shellsort':
              shellSortA(index);
              index = Math.trunc(index / 2);
              break;
          }
        }
        precede = false;
      } else { //automatically increment
        switch (desiredSort) {
          case 'Selection Sort':
            selectionSortA(index);
            index++;
            break;
          case 'Insertion Sort':
            insertionSortA(index);
            index++;
            break;
          case 'Merge Sort':
            mergeSortA(index);
            index++;
            break;
          case 'Heap Sort':
            heapSortA(index);
            index--;
            break;
          case 'Quick Sort':
            quickSortA(index);
            index++;
            break;
          case 'Shellsort':
            shellSortA(index);
            index = Math.trunc(index / 2);
            break;
        }
      }


    } //sorting allowed
  }

  //outline box (removes black bars along the sides)
  stroke(255, 200, 0, 255)
  strokeWeight(1);
  fill(0, 0);
  rect(0, 0, width, height)
}

/**
 * Updates description box. 
 */
function updateSortDescpBox() {
  desiredSort = document.getElementById("sortType").value;
  document.getElementById("sortTitle").innerText = desiredSort;

  switch (desiredSort) {
    case 'Selection Sort':
      document.getElementById("sortDescr").innerText = 'This is a type of sorting where...\n-Looks at the very first bar (we could call it \'n\')\n-Then it looks at all the bars to the right of \'n\' and looks for the\n shortest bar say \'x\'.\n-After finding it the bar \'n\' and \'x\' switch positions.\n-After that it goes to the next bar. Looks for the shortest bar to the\n right of it. Swaps positions with it. This step keeps on repeating till\n all are sorted.';
      index = 0;
      break;
    case 'Insertion Sort':
      document.getElementById("sortDescr").innerText = 'This is a type of sorting where...\n-Looks at the second bar (we could call it \'n\')\n-Then looks to the bar to the left \'n\' and if its lower in it, pushes it to\nthe right and takes it place.\n-Keeps on doing this till bar to the left is lower than itself.\n-These steps repeat till looped though every bar.';
      index = 1;
      break;
    case 'Merge Sort':
      document.getElementById("sortDescr").innerText = 'This is a type of sorting where...\n-Splits the list of bars into individual bars.\n-\"Merges\" two bars next to each other to form a list with two bars.\n-The new list is sorted so that the sorted bar is first.\n-Then two lists (of two bars) are merged together so that all bars\nare in order.\n-Repeat until back to one list.';
      index = 0;
      break;
    case 'Heap Sort':
      document.getElementById("sortDescr").innerText = 'This is a type of sorting where...\n-A max heap (binary tree). This is a structure where a parent\nelement has two other child elements connected to it. The parent\nelement is always bigger then the child element.\n-After this the last bar of the unsorted area and the first bar is \nswapped.\n-After the flip, the original first bar (the one that\'s last now) is part of\nthe sorted area.\n-Then remake the max heap for the unsorted area and repeat!';
      break;
    case 'Quick Sort':
      document.getElementById("sortDescr").innerText = 'This is a type of sorting where...\n-Looks at the last bar and moves any bars that are shorter then it to\n its left and bars taller then it to the right.\n-Repeat for left and right side.';
      index = 0;
      break;
    case 'Shellsort':
      document.getElementById("sortDescr").innerText = 'This is a type of sorting where...\n-Initial Gap sequence is determined. In this case the first gap is the\namount of bars / 2\n-Makes a new smaller group of bars that have values from the\noriginal array seperated by the gap. Sorts each subarray\nindependently.\n-Reflects that corrected order in the original list of bars.\n-Divides gap by 2 and repeat.';
      break;
  }
}

function prece() {
  precede = true;
}

function startProgram() {
  //disable all unneeded button or input elements s
  document.getElementById("start").disabled = true;
  document.getElementById("sortType").disabled = true;
  document.getElementById("autoLoop").disabled = true;
  document.getElementById("numBars").disabled = true;
  document.getElementById("barColor").disabled = true;


  //if the user wants to manually loop through, sets 'inc' to true and creates a button that a user can
  //press to increment the loop
  if (document.getElementById("autoLoop").checked) {
    inc = true;
    document.getElementById("increment").disabled = false;
    document.getElementById("increment").addEventListener("click", prece)
  } else
    inc = false;

  startBar = true;
  sortAllowed = true;

  if (desiredSort == "Heap Sort") { //here because the array has to exist before knowing the length of it. 
    index = arrToSort.length - 1
  }

  if (desiredSort == "Shellsort") { //here because the array has to exist before knowing the length of it. 
    index = Math.trunc(arrToSort.length / 2)
  }

}

/**barGenerator
 * 
 * barGenerator - Generates a unsorted array of bar objects (intially).
 * 
 * @returns Nothing
 */
function barGenerator() {
  //resets all arrays; 
  let arrOfBars = [];
  saved = [];
  arrToSort = [];

  //stores the color gradient user wants
  colorScheme = document.getElementById("barColor").value;

  numRequestBars = document.getElementById("numBars").value;
  if (numRequestBars === "Auto") {
    numRequestBars = width;
  } else {
    numRequestBars = Number.parseInt(numRequestBars);
    if (isNaN(numRequestBars)) {
      numRequestBars = width;
      console.log("Error! Invalid number.");
    } else if (numRequestBars > 5000) {
      numRequestBars = 5000;
      console.log("Error! Too many bars,");
    }

  }

  barWidth = width / numRequestBars;

  //relating to where the bar should be placed
  let spacer = barWidth / 2 + 0.5;
  let xLocCenter = spacer;

  //relating to bar height
  let deltaHeight = height / numRequestBars;
  let barHeight = deltaHeight;

  for (let i = 0; i < numRequestBars; i++) {
    arrOfBars.push(new bar(xLocCenter, barHeight))
    barHeight += deltaHeight;
    saved.push(xLocCenter);
    xLocCenter += spacer * 2 - 1;

  }
  arrToSort = shuffle(arrOfBars);
  drawAllLines();
}

/** drawAllLines
 *
 * drawAllLines - Displays (draws) all the lines in the arrToSort array
 */
function drawAllLines() {
  clear();
  rectMode(CENTER);
  for (let j = 0; j < arrToSort.length; j++) {
    arrToSort[j].place(saved[j]);
  }
  rectMode(CORNER);
}

/** selectionSortA 
 *
 * selectionSortA - Uses the selection sort algorithm to sort the bars. 
 *
 * @param The current index. 
 * @return The next index
 */
function selectionSortA(i) {
  if (i < arrToSort.length) {
    var lowestIndex = i;
    for (var j = i; j < arrToSort.length; j++) {
      if (arrToSort[lowestIndex].length > arrToSort[j].length) {
        lowestIndex = j;
      }
    }
    var rem = arrToSort[i];
    arrToSort[i] = arrToSort[lowestIndex];
    arrToSort[lowestIndex] = rem;
  }
  return i++;
}

/** insertionSortA 
 *
 * insertionSortA - Uses the insertion sort algorithm to sort the bars. 
 *
 * @param The current index. 
 * @return The next index
 */
function insertionSortA(i) {
  let innerLoop = true;
  if (i < arrToSort.length) {
    for (let j = i;
      (innerLoop) && (j > 0); j--) {
      if (arrToSort[j].length < arrToSort[j - 1].length) {
        let rem = arrToSort[j];
        arrToSort[j] = arrToSort[j - 1];
        arrToSort[j - 1] = rem;
      } else
        innerLoop = false;
    }
    y = true;
  }
  return i++;
}

/** mergeSortA
 *  
 * mergeSortA - Uses the merge sort algorithm to sort the bars. 
 *
 * @param z Index
 */
function mergeSortA(z) {
  //arrToSort
  let setOfSubarrays = [];
  if (z == 0) {
    setOfSubarrays = array1DTo2DA();
  } else {
    setOfSubarrays = tempArr;
  }
  let newArr = [];
  for (let i = 0; i < setOfSubarrays.length; i += 2) {
    if (setOfSubarrays[i + 1]) {
      newArr.push(mergeArrA(setOfSubarrays[i], setOfSubarrays[i + 1]));
    } else {
      newArr.push(setOfSubarrays[i]);
    }
  }
  tempArr = newArr;
  arrToSort = array2DTo1DA(tempArr)
}


/** mergeArrA
 *
 * mergeArr - Merges two arrays. Merge means to take in two sorted arrays and combines them into one sorted array. 
 *
 * @param arrA
 * @param arrB
 *
 * @return A merged array. 
 */
function mergeArrA(arrA, arrB) {
  let arrC = [];
  while (arrA.length > 0 && arrB.length > 0) {
    if (arrA[0].length < arrB[0].length) {
      arrC.push(arrA[0]);
      arrA.shift();
    } else {
      arrC.push(arrB[0]);
      arrB.shift();
    }
  }
  while (arrA.length > 0)
    arrC.push(arrA.shift());
  while (arrB.length > 0)
    arrC.push(arrB.shift());
  return arrC;
}

/** array1DTo2DA
 *
 * array1DTo2DA - Turns a 1D array into 2D array. "makes the array vertical"
 *
 * @return The 2D array that has all the values of the "arrToSort" array.
 */
function array1DTo2DA() {
  let arr2D = [];
  for (let i = 0; i < arrToSort.length; i++) {
    let newArray = [arrToSort[i]]
    arr2D.push(newArray);
  }
  return arr2D;
}

/** array2DTo1DA
 *
 * array2DTo1DA - Turns a 2D array into 1D array. 
 *
 * @param arr The 2D array
 *
 * @return The 1D array that has all the values of the input
 */
function array2DTo1DA(arr2D) {
  let arr = [];
  for (let i = 0; i < arr2D.length; i++) {
    for (let j = 0; j < arr2D[i].length; j++) {
      arr.push(arr2D[i][j]);
    }
  }
  return arr;
}

var notRanOnce = true;
/** heapSortA
 *  
 * heapSortA - Uses the heap sort algorithm to sort the bars. 
 *
 * @param i Index
 */
function heapSortA(i) {
  let heapArr;
  if ((i == arrToSort.length - 1) && notRanOnce) {
    heapArr = generateMaxHeapA(arrToSort);
    notRanOnce = false;
    arrToSort = heapArr;
    index++;
  } else if (i > 0) {
    //swaps 
    heapArr = arrToSort;

    let temp = heapArr[0];
    heapArr[0] = heapArr[i];
    heapArr[i] = temp;

    let sorted = [];
    for (let j = i; j < arrToSort.length; j++) {
      sorted.push(heapArr[j]);
    }

    let reHeap = [];

    for (let k = 0; k < i; k++) {
      reHeap.push(heapArr[k]);
    }
    reHeap = generateMaxHeapA(reHeap)

    heapArr = [];

    for (let m = 0; m < i; m++) {
      heapArr.push(reHeap[m]);
    }

    for (let n = 0; n < sorted.length; n++) {
      heapArr.push(sorted[n]);
    }


    arrToSort = heapArr;
  }
  return "ERROR";
}

/** generateMaxHeapA
 *
 * generateMaxHeapA - Makes a "max heap". A max heap is a way of structuring data. Its in a binary tree. A binary tree
 * is a structure where a parent element has two other child elements connected to it. In a max heap, the parent  
 * element is always bigger then the child element. This structure can be sorted in an array such as the child element 
 * are alwasys (2(i)+1 or 2(i)+2) where i is the index of the parent. 
 *
 * @param arr The array to make into a max heap.
 *
 * @return The max heap. 
 */
function generateMaxHeapA(arr) {
  let swapOccured = false;
  for (let i = 1; i < arr.length; i++) {
    if (i % 2 == 0) {
      if (arr[i].length > arr[(i - 2) / 2].length) {
        let temp = arr[i]
        arr[i] = arr[(i - 2) / 2]
        arr[(i - 2) / 2] = temp;
        swapOccured = true;
      }
    } else {
      if (arr[i].length > arr[(i - 1) / 2].length) {
        let temp = arr[i]
        arr[i] = arr[(i - 1) / 2]
        arr[(i - 1) / 2] = temp;
        swapOccured = true;
      }
    }

    if (swapOccured) {
      for (let j = i; j > 0; j--) {
        if (j % 2 == 0) {
          if (arr[j].length > arr[(j - 2) / 2].length) {
            let temp = arr[j]
            arr[j] = arr[(j - 2) / 2]
            arr[(j - 2) / 2] = temp;
          }
        } else {
          if (arr[j].length > arr[(j - 1) / 2].length) {
            let temp = arr[j]
            arr[j] = arr[(j - 1) / 2]
            arr[(j - 1) / 2] = temp;
          }
        }
      }
    }
    swapOccured = false;
  }
  return arr;
}

/** quickSortA
 *  
 * quickSortA - Uses the quick sort algorithm to sort the bars. 
 *
 * @param z Index
 */
function quickSortA(z) {
  let arr2D = [];
  if (z == 0)
    arr2D = [arrToSort];
  else
    arr2D = tempArr;
  let newArr = [];
  for (let i = 0; i < arr2D.length; i++) {
    let leftArr = [];
    let centre = [arr2D[i][arr2D[i].length - 1]];
    let rightArr = [];
    if (arr2D[i].length > 1) {
      for (let j = 0; j < arr2D[i].length - 1; j++) {
        if (arr2D[i][j].length <= centre[0].length) {
          leftArr.push(arr2D[i][j])
        } else if (arr2D[i][j].length > centre[0].length) {
          rightArr.push(arr2D[i][j])
        }
      }
      if (leftArr[0] !== undefined) {
        newArr.push(leftArr)
      }
      newArr.push(centre)
      if (rightArr[0] !== undefined) {
        newArr.push(rightArr)
      }
    } else {
      newArr.push(arr2D[i])
    }
  }

  arr2D = newArr;
  let arrGreat = false;
  for (let ele of arr2D) {
    if (ele.length > 1) {
      arrGreat = true;
    }
  }
  z++;
  tempArr = arr2D;
  arrToSort = array2DTo1DA(arr2D);
}

/** shellSortA
 *  
 * shellSortA - Uses the shellsort algorithm to sort the bars. 
 *
 * @param gap The gap between bars.
 */
function shellSortA(gap) {
  //let gap = Math.trunc(arr.length / 2) ; 
  for (let i = 0; i < gap; i++) {
    let elementList = [];
    let indexList = [];

    for (let j = i;
      (j) < arrToSort.length; j += gap) {
      elementList.push(arrToSort[j]);
      indexList.push(j);
    }

    elementList = insertionSortB(elementList);
    for (let k = 0; k < elementList.length; k++) {
      arrToSort[indexList[k]] = elementList[k];
    }
  }
}

/** insertionSortB
 *
 * insertionSortB - Uses the insertion sort algorithm to sort the bars. This version sorts the whole array rather then just one pass.
 *
 * @param The current index. 
 * @return The next index
 */
function insertionSortB(arr) {
  let y = true;
  for (let i = 1; i < arr.length; i++) {
    for (let j = i;
      (y) && (j > 0); j--) {
      if (arr[j].length < arr[j - 1].length) {
        let temp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = temp;
      } else
        y = false;
    }
    y = true;
  }
  return arr;
}

let secretCode = 0;

function keyPressed() {
  if (keyCode == 73)
    secretCode = 73;

}