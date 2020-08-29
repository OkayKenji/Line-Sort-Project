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
 * How insertion sort works:
 *  - Starts at the second index
 *  - Looks to the left, and swaps postion with it if its less then the one to the left
 *  - Keeps moving left until its at the correct spot
 */
function insertionSort(arr) {
  let y = true;
  for (let i = 1; i < arr.length; i++) {
    for (let j = i;
      (y) && (j > 0); j--) {
      if (arr[j] < arr[j - 1]) {
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



function mergeSort(arr, index) {
  let setOfSubarrays = [];
  if (index == 0) {
    setOfSubarrays = array1DTo2D(arr);
  } else {
    setOfSubarrays = arr;
  }
  index++;
  let newArr = [];

  for (let i = 0; i < setOfSubarrays.length; i += 2) {
    if (setOfSubarrays[i + 1]) {
      newArr.push(mergeArr(setOfSubarrays[i], setOfSubarrays[i + 1]));
    } else {
      newArr.push(setOfSubarrays[i]);
    }
  }

  if (newArr.length == 1)
    return newArr[0];
  else
    return mergeSort(newArr, index);
}


/**
 *
 *
 *
 */
function mergeArr(arrA, arrB) {
  let arrC = [];

  while (arrA.length > 0 && arrB.length > 0) {
    if (arrA[0] < arrB[0]) {
      arrC.push(arrA[0]);
      arrA.shift();
    } else {
      arrC.push(arrB[0]);
      arrB.shift();
    }

  }

  while (arrA.length > 0) {
    arrC.push(arrA.shift());
  }
  while (arrB.length > 0) {
    arrC.push(arrB.shift());
  }

  return arrC;
}

/**
 *
 */
function array1DTo2D(arr) {
  let arr2D = [];
  for (let i = 0; i < arr.length; i++) {
    let newArray = [arr[i]]
    arr2D.push(newArray);
  }
  return arr2D;
}

/**
 *
 */
function array2DTo1D(arr2D) {
  let arr = [];
  for (let i = 0; i < arr2D.length; i++) {
    for (let j = 0; j < arr2D[i].length; j++) {
      arr.push(arr2D[i][j]);
    }
  }
  return arr;
}

/**
 *
 */
function heapSort(arr) {
  let heapArr = generateMaxHeap(arr);

  for (let i = arr.length - 1; i > 0; i--) {
    //swaps 
    let temp = heapArr[0];
    heapArr[0] = heapArr[i];
    heapArr[i] = temp;
    
    let sorted = [];
    for (let j = i; j < arr.length; j++) {
      sorted.push(heapArr[j]);
    }
    //console.log(sorted);
    let reHeap = [];

    for (let k = 0; k < i; k++) {
      reHeap.push(heapArr[k]);
    }
    reHeap = generateMaxHeap(reHeap)
    
    heapArr = [];

    for (let m = 0; m < i; m++) {
      heapArr.push(reHeap[m]);
    }

    for (let n = 0; n < sorted.length; n++) {
      heapArr.push(sorted[n]);
    }

  }
  return heapArr;
}

/**
 *
 */
function generateMaxHeap(arr) {
  let swapOccured = false;
  for (let i = 0; i < arr.length; i++) {
    if (i % 2 == 0) {
      if (arr[i] > arr[(i - 2) / 2]) {
        let temp = arr[i]
        arr[i] = arr[(i - 2) / 2]
        arr[(i - 2) / 2] = temp;
        swapOccured = true;
      }
    } else {
      if (arr[i] > arr[(i - 1) / 2]) {
        let temp = arr[i]
        arr[i] = arr[(i - 1) / 2]
        arr[(i - 1) / 2] = temp;
        swapOccured = true;
      }
    }

    if (swapOccured) {
      for (let j = i; j > 0; j--) {
        if (j % 2 == 0) {
          if (arr[j] > arr[(j - 2) / 2]) {
            let temp = arr[j]
            arr[j] = arr[(j - 2) / 2]
            arr[(j - 2) / 2] = temp;
          }
        } else {
          if (arr[j] > arr[(j - 1) / 2]) {
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
