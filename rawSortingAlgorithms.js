//this file contains the raw sorting algorithm 
//i.e. these can only sort interger arrays and will not sort the lines
//see the "main.js" for the actual ones
//
//v8.20.2020
//
// Credits:
//  * Wikipedia
//  * School (class) - for AP Computer Scinece A


/* Selection sort 
 * 
 * How selection sort works:
 *  - Starts at the first index
 *  - Looks to the right and looks to see the lowest value thats less then the value at that
 *    index
 *  - If there is one, swaps postions with it
 *  - Then it moves the the second index, does step 2 again (loops till the end)
 */
function selectionSort(arr) {
  for (var i = 0; i < arr.length; i++) {
    var lowestIndex = i;
    for (var j = i; j < arr.length; j++) {
      if (arr[lowestIndex] > arr[j]) {
        lowestIndex = j;
      }
    }
    var rem = arr[i];
    arr[i] = arr[lowestIndex];
    arr[lowestIndex] = rem;
  }
  return arr;
}

/* Insertion sort 
 *
 */
function insertionSort(arr) {
  for (var i = 1; i < arr.length; i++) {

    for (var j = i; j > 0; j--) {
      if (arr[i] < arr[j]) {

      }
    }
  }
  return arr;
}