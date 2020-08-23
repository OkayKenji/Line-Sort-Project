// This is the main.js; 
// The main purpose of the program is the visually display diffrent sort methods.  
//
// Implemented sorts: 
//  * Selection sort
//
// Sorts to be implmented:
//  * Insertion sort
//
// Possible future versions:
//  * https://en.wikipedia.org/wiki/Sorting_algorithm#Popular_sorting_algorithms;
//
// v8.20.2020 
//
// Special thanks to: 
// * "Daniel Shiffman" @ The Coding Train for helping me to learn this stuff
//    See his channel here: https://www.youtube.com/channel/UCvjgXvBlbQiydffZU7m1_aw; 
// * w3schools
// * https://developer.mozilla.org/en-US/docs/Web/JavaScript
// * The developers of p5.js

//global vars 
// @param sortAllowed      Remembers if sorting is allowed.
// @param stayStartScreen  If true, stays on strart screen (see line ~76)
// @param createShuffle    If true, creates array of lines and shuffles it
// @param arrToSort        Stores the array that has elements that need to be sorted
// @param index            Index used for the sorting loops
// @param type             Type of sort requested
// @param colorScheme      Color to be used by bars
// @param inc              Automatically loop or manually do it.
// @param precede          If inc=false, 'precede' decides if loop can run once
let sortAllowed = false;
let stayStartScreen = true;
let createShuffle = true;
let arrToSort;
let index = 0;
let type;
let colorScheme;
let inc;
let precede = false;

let go, sortType, reset, letsSort, colorSelect, incremental, nxt; //buttons/non-text inputs
let screenSize; //text input

function setup() {
  createCanvas(512, 512); //dont go over 1028
  strokeWeight(1);

  //creates the drop down menu for what type of sort the user wants
  sortType = createSelect();
  sortType.position(10, 85);
  sortType.option('Selection Sort');
  sortType.option('Insertion Sort');
  //sortType.disable('Insertion Sort'); //TODO: Remove when this sort is created 

  //creates the drop down menu for what color scheme user wants
  colorSelect = createSelect();
  colorSelect.position(123, 315);
  colorSelect.option('Red'); // #FF0000
  colorSelect.option('Green'); // #00FF00
  colorSelect.option('Blue'); // #0000FF
  colorSelect.size(65)

  //creates the drop down menu for if the user wants to manually loop
  incremental = createSelect();
  incremental.position(123, 390);
  incremental.option('No');
  incremental.option('Yes');
  incremental.size(65)

  //input if user want to have a larger screen
  screenSize = createInput('512');
  screenSize.position(123, height - 60);
  screenSize.size(55)

  //Removes the start screen and all irrelvent input elements. 
  //Loads elements needed on next screen
  go = createButton("GO");
  go.position(width / 2, height - 35);
  go.mousePressed(() => {
    sortType.remove()
    go.remove();
    colorSelect.remove();
    incremental.remove();
    screenSize.remove();

    colorScheme = colorSelect.value();


    if (incremental.value() == "Yes") {
      inc = true;
      nxt = createButton("\>");
      nxt.position(0, 25);
    } else
      inc = false;

    letsSort = createButton("Sort!");
    letsSort.position(0, 25);
    reset = createButton("Reset");
    reset.position(0, 0);
    resizeCanvas(parseInt(screenSize.value()), parseInt(screenSize.value()));

    stayStartScreen = false;
  });
}

function draw() {
  background(0);

  //if true => Loads the text/display elements for the start screen
  //     else =>
  if (stayStartScreen) {
    //creates the start screen background as a square with a yellow border;
    strokeWeight(5); //border thickness;
    stroke(255, 200, 0, 255); //color of the border; (#FFC800)
    fill(20) //inside;
    rect(2.5, 2.5, width - 5, height - 5) //creates the rectangle

    //sub-box with similar design
    rect(125, 85, width - 50 - 85, 225);

    //the details of the sub-box
    textAlign(CENTER);
    fill(255);
    strokeWeight(0);
    noStroke();
    textSize(32);
    text('Sorter', width / 2, 40);
    textSize(14)
    text('Sorts the lines in increasing order using diffrent types of sorting algorithms', width / 2, 65);
    strokeWeight(1);

    //gives facts about how each type of sorting works. 
    type = sortType.value();
    textSize(12);
    textAlign(LEFT);
    textStyle(BOLD);
    text(type, 130, 100);
    textStyle(NORMAL);

    //text to show
    if (type == "Selection Sort") {
      text('This is a type of sorting where..\n-Looks at the very first bar (we could call it \'n\')\n-Then it looks at all the bars to the right of \'n\' and looks for the\n shortest bar say \'x\'.\n-After finding it the bar \'n\' and \'x\' switch positions.\n-After that it goes to the next bar. Looks for the shortest bar to the\n right of it. Sawps positions with it. This step keeps on repeating till\n all are sorted.', 132, 115);
    } else if (type == "Insertion Sort") {
      text('This is a type of sorting where', 132, 115);
      index = 1; //temp place to put it
    } else {
      console.log("ERROR!");
    }

    //text for all of the options
    //bold
    textSize(14);
    textStyle(BOLD);
    text("Select the color:", 10, 330);
    text("Manually loop:", 10, 405);
    text("Width/Height", 10, height - 45);

    //normal
    textSize(12);
    textStyle(NORMAL);
    text("(red/geen/blue)\nChanges the color of\nthe bars.", 11, 345);
    text("(yes/no)", 11, 420);
    text("(number)\nMax suggested: 1028", 11, height - 30); //1028 is choosen b/c its a base 2 number. 

  } else {

    //creates the reset button
    reset.mousePressed(() =>
      location.reload()
    );

    //starts the sorting proccess
    letsSort.mousePressed(() => {
      sortAllowed = true;
      letsSort.remove();
    });

    //only run this 
    if (inc) {
      nxt.mousePressed(() => precede = true);
    }

    //on the 0th pass only - creates an array of lines to sort
    if (createShuffle) {
      let arrOfLines = [];
      for (let i = 0; i < width; i++) {
        arrOfLines.push(new lineSegment(i + 1, i)); //high to low;
      }
      arrToSort = shuffle(arrOfLines);


      for (var i = 0; i < arrToSort.length; i++)
        arrToSort[i].x = i + 1;

      createShuffle = false;
    }

    //draws
    drawAllLines();

    if (sortAllowed) {
      if (inc) {
        if ((type == "Selection Sort") && precede) {
          selectionSortA(index);
          index++;
        } else if ((type == "Insertion Sort") && precede) {
          insertionSortA(index);
          index++;
        }

        precede = false;
      } else {
        if (type == "Selection Sort") {
          selectionSortA(index);
          index++;
        } else if (type == "Insertion Sort") {
          insertionSortA(index);
          index++;
        }
      }
    }
  }
  //mouseLocation();
}

//
function drawAllLines() {
  //console.log(arrToSort);
  for (let j = 0; j < arrToSort.length; j++) {
    arrToSort[j].place();
  }
}

//
function selectionSortA(i) {
  if (i < arrToSort.length) {
    var lowestIndex = i;
    for (var j = i; j < arrToSort.length; j++) {
      if (arrToSort[lowestIndex].length > arrToSort[j].length) {
        lowestIndex = j;
      }
    }

    var rem = arrToSort[i].length;
    arrToSort[i].length = arrToSort[lowestIndex].length;
    arrToSort[lowestIndex].length = rem;

    var rem1 = arrToSort[i].lineColor;
    arrToSort[i].lineColor = arrToSort[lowestIndex].lineColor;
    arrToSort[lowestIndex].lineColor = rem1;
  }
  return i++;
}

//
function insertionSortA(i) {
  let innerLoop = true;
  //console.log(i);
  if (i < arrToSort.length) {
    for (let j = i; (innerLoop)&&(j>0) ; j--) {
      //console.log(j);
      if (arrToSort[j].length < arrToSort[j - 1].length) {

        let rem = arrToSort[j].length;
        arrToSort[j].length = arrToSort[j - 1].length;
        arrToSort[j - 1].length = rem;

        let rem1 = arrToSort[j].lineColor;
        arrToSort[j].lineColor = arrToSort[j - 1].lineColor;
        arrToSort[j - 1].lineColor = rem1;

      } else
        innerLoop = false;
    }
    y = true;
  }
  return i++;
}
