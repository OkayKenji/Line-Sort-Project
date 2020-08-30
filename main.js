// This is the main.js; 
// The main purpose of the program is the visually display diffrent sort methods.  
//
// Implemented sorts: 
//  * Selection sort
//  * Insertion sort
//  * Merge Sort
//
// Possible future versions:
//  * https://en.wikipedia.org/wiki/Sorting_algorithm#Popular_sorting_algorithms;
//
// v8.2020 
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

let go, sortType, reset, letsSort, colorSelect, incremental, nxt; //buttons/non-text inputs
let screenSize, numBarsInput; //text input

function setup() {
  createCanvas(512, 512); //dont go over 1028
  strokeWeight(1);

  //creates the drop down menu for what type of sort the user wants
  sortType = createSelect();
  sortType.position(10, 85);
  sortType.option('Selection Sort');
  sortType.option('Insertion Sort');
  sortType.option('Merge Sort');
  sortType.option('Heap Sort');
  sortType.changed(changeBox);

  //creates the drop down menu for what color scheme user wants
  colorSelect = createSelect();
  colorSelect.position(130, 315);
  colorSelect.option('Red'); // #FF0000
  colorSelect.option('Green'); // #00FF00
  colorSelect.option('Blue'); // #0000FF
  colorSelect.size(65)

  //creates the drop down menu for if the user wants to manually loop
  incremental = createSelect();
  incremental.position(130, 390);
  incremental.option('No');
  incremental.option('Yes');
  incremental.size(65)

  //input if user want to have a larger screen
  screenSize = createInput('512');
  screenSize.position(130, height - 60);
  screenSize.size(55)

  //input for the number of bars
  numBarsInput = createInput('512');
  numBarsInput.position(320, 315);
  numBarsInput.size(55)

  //Removes the start screen and all irrelvent input elements. 
  //Loads elements needed on next screen
  go = createButton("GO");
  go.position(width / 2, height - 35);
  go.mousePressed(() => {

    //removes unneeded inputs
    sortType.remove()
    go.remove();
    colorSelect.remove();
    incremental.remove();
    screenSize.remove();
    numBarsInput.remove();
    clear();

    //stores the color gradient user wants
    colorScheme = colorSelect.value();

    //if the user wants to manually loop through, sets 'inc' to true and creates a button that a user can
    //press to increment the loop
    if (incremental.value() == "Yes") {
      inc = true;
      nxt = createButton("\>");
      nxt.position(0, 25);
    } else
      inc = false;

    //creates buttons to start the sort or to reset
    letsSort = createButton("Sort!");
    letsSort.position(0, 25);
    reset = createButton("Reset");
    reset.position(0, 0);

    //resizes the canvas to the size requested by the user.
    resizeCanvas(parseInt(screenSize.value()), parseInt(screenSize.value()));

    //generates the all of the bars (unsorted)
    barGenerator();

    //helps move off the start screen
    startBar = true;

    if (type == "Heap Sort") {
      index = arrToSort.length - 1
    }
  });

  //loads the start screen and the visuals needed for it
  startScreen();

}

function draw() {
  if (startBar) {
    background(0); //sets background black so that after each run we can't see the one before it. 

    //when hit resets everything
    reset.mousePressed(() =>
      location.reload()
    );

    //when hit starts the sorting proccess
    letsSort.mousePressed(() => {
      sortAllowed = true;
      letsSort.remove();
    });

    //if the user wants the line sort to be looped manually loads waits the the next button to be pressed
    //which makes precede, 'true' so that it allows the sort to run once 
    if (inc) {
      nxt.mousePressed(() => precede = true);
    }

    //draws
    drawAllLines();

    //if sorting is allowed, runs the program in it
    if (sortAllowed) {

      //indicator 
      if (index < saved.length && (secretCode > 0)) {
        var indicate = new indicator(saved[index]);
        indicate.place();
      }

      if (inc) { //if user wants to manually increment
        if ((type == "Selection Sort") && precede) {
          selectionSortA(index);
          index++;
        } else if ((type == "Insertion Sort") && precede) {
          insertionSortA(index);
          index++;
        } else if ((type == "Merge Sort") && precede) {
          mergeSortA(index);
          index++;
        } else if ((type == "Heap Sort") && precede) {
          heapSortA(index)
          index--;
        }
        precede = false;
      } else { //automatically increment
        if (type == "Selection Sort") {
          selectionSortA(index);
          index++;
        } else if (type == "Insertion Sort") {
          insertionSortA(index);
          index++;
        } else if (type == "Merge Sort") {
          mergeSortA(index);
          index++;
        } else if (type == "Heap Sort") {
          heapSortA(index)
          index--;
        }
      }
    }
  }

  //outline box (removes black bars along the sides)
  stroke(255, 200, 0, 255)
  strokeWeight(1);
  fill(0, 0);
  rect(0, 0, width, height)
}

/** startScreen
 *
 * startScreen - loads the start screen. It loads all of the text that is needed on the screen.  
 * 
 * @return Nothing is returned.
 */
function startScreen() {
  quickColor();
  rect(2.5, 2.5, width - 5, height - 5) //creates the rectangle

  textAlign(CENTER);
  fill(255);
  strokeWeight(0);
  textSize(32);
  text('Sorter', width / 2, 40);
  textSize(14)
  text('Sorts the lines in increasing order using diffrent types of sorting algorithms', width / 2, 65);

  textAlign(LEFT);
  textSize(14);
  textStyle(BOLD);
  text("Select the color:", 10, 330);
  text("Manually loop:", 10, 405);
  text("Width/Height", 10, height - 45);
  text("Number of bars:", 200, 330);

  textSize(12);
  textStyle(NORMAL);
  text("(red/geen/blue)\nChanges the color of\nthe bars.", 11, 345);
  text("(yes/no)", 11, 420);
  text("(number)\nMax suggested: 1028", 11, height - 30); //1028 is choosen b/c its a base 2 number. 
  text("(number)\nChanges the number\nof bars.", 200, 345);

  changeBox();
}

/** changeBox
 * 
 *  changeBox - Loads the text that describes how each type of sort works. This draws a box with text on top of anything 
 *  that was there before
 *  
 *  @return Nothing is returned
 */
function changeBox() {
  quickColor();

  //sub-box with similar design
  rect(125, 85, width - 50 - 85, 225);

  quickTextColor();
  type = sortType.value();
  textSize(12);
  textAlign(LEFT);
  textStyle(BOLD);
  text(type, 130, 100);
  textStyle(NORMAL);
  if (type == "Selection Sort") {
    text('This is a type of sorting where...\n-Looks at the very first bar (we could call it \'n\')\n-Then it looks at all the bars to the right of \'n\' and looks for the\n shortest bar say \'x\'.\n-After finding it the bar \'n\' and \'x\' switch positions.\n-After that it goes to the next bar. Looks for the shortest bar to the\n right of it. Swaps positions with it. This step keeps on repeating till\n all are sorted.', 132, 115);
    index = 0;
  } else if (type == "Insertion Sort") {
    text('This is a type of sorting where...\n-Looks at the second bar (we could call it \'n\')\n-Then looks to the bar to the left \'n\' and if its lower in it, pushes it to\nthe right and takes it place.\n-Keeps on doing this till bar to the left is lower than itself.\n-These steps repeat till looped though every bar.', 132, 115);
    index = 1;
  } else if (type == "Merge Sort") {
    text('This is a type of sorting where...\n-Splits the list of bars into individual bars.\n-\"Merges\" two bars next to each other to form a list with two bars.\n-The new list is sorted so that the sorted bar is first.\n-Then two lists (of two bars) are merged together so that all bars\nare in order.\n-Repeat until back to one list.', 132, 115);
    index = 0;
  } else if (type == "Heap Sort") {
    text('This is a type of sorting where...\n-A max heap (binary tree). This is a structure where a parent\nelement has two other child elements connected to it. The parent\nelement is always bigger then the child element.\n-After this the last bar of the unsorted area and the first bar is \nswapped.\n-After the flip, the original first bar (the one that\'s last now) is part of\nthe sorted area.\n-Then remake the max heap for the unsorted area and repeat!', 132, 115);
  } else {
    console.log("ERROR!");
  }
}

/**barGenerator
 * 
 * barGenerator - Generates a unsorted array of bar objects.
 * 
 * @returns Nothing
 */
function barGenerator() {
  let arrOfBars = [];
  numRequestBars = numBarsInput.value();

  barWidth = width / numRequestBars;

  let spacer = barWidth / 2 + 0.5;
  let xLocCenter = spacer;
  let L1 = 0
  for (let i = 0; i < numRequestBars; i++) {
    arrOfBars.push(new bar(xLocCenter, L1))
    L1 += barWidth;
    saved.push(xLocCenter);
    xLocCenter += spacer * 2 - 1;
  }
  arrToSort = shuffle(arrOfBars);
}


/** quickColor
 *
 *  quickColor - Has the strokeWeight/stroke color/fill color needed to set the color of boxes on the start screen
 */
function quickColor() {
  strokeWeight(5); //border thickness;
  stroke(255, 200, 0, 255); //color of the border; (#FFC800)
  fill(20) //inside;
}

/** quickTextColor
 *
 *  quickTextColor - Has the fill/stroke weight for text
 */
function quickTextColor() {
  fill(255);
  strokeWeight(0);
}

/** drawAllLines
 *
 * drawAllLines - Displays (draws) all the lines in the arrToSort array
 */
function drawAllLines() {
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


var secretCode = 0;

function keyPressed() {
  if (keyCode == 73)
    secretCode = 73;

}
