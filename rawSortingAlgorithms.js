//this file contains the raw sorting algorithm 
//i.e. these can only sort interger arrays and will not sort the lines
//see the "main.js" for the actual ones
//
// v8.2020
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
 *
 * @param arr The array to sort.
 * 
 * @return A sorted array.
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
 *
 * @param arr The array to sort.
 * 
 * @return A sorted array.
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

/** Merge sort
 *  
 * How merge sort works:
 *  - First seperates an array into indviudal subarrays containing one element
 *  - Merges each of them (merge takes in two sorted arrays and outputs a sorted array that combines them)
 *  - Then merges the the outputs from the previous merges until there's only one array left
 *
 * @param arr The array that needs to be sorted
 * @param index Current index
 *
 * @return If done sorting returns the sorted array.
 * @return If not done sorting calls itself again, semding the unsorted array as well as the next index
 */
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


/** mergeArr
 *
 * mergeArr - Merges two arrays. Merge means to take in two sorted arrays and combines them into one sorted array. 
 *
 * @param arrA
 * @param arrB
 *
 * @return A merged array. 
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

/** array1DTo2D
 *
 * array1DTo2D - Turns a 1D array into 2D array. "makes the array vertical"
 *
 * @param arr The 1D array
 *
 * @return The 2D array that has all the values of the input
 */
function array1DTo2D(arr) {
  let arr2D = [];
  for (let i = 0; i < arr.length; i++) {
    let newArray = [arr[i]]
    arr2D.push(newArray);
  }
  return arr2D;
}

/** array2DTo1D
 *
 * array2DTo1D - Turns a 2D array into 1D array. 
 *
 * @param arr The 2D array
 *
 * @return The 1D array that has all the values of the input
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

/** Heap sort
 *  
 * How heap sort works:
 *  - Creates a "max heap"
 *  - Swaps the first and last element of the unsortd part of the array
 *  - After the swap the last element of the unsorted array becomes part of the sorted array.
 *  - Then goes though the unsorted part of the array and makes it into a max heap again
 *
 * @param arr The array that needs to be sorted
 *
 * @return The sorted array
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

/** generateMaxHeap
 *
 * generateMaxHeap - Makes a "max heap". A max heap is a way of structuring data. Its in a binary tree. A binary tree
 * is a structure where a parent element has two other child elements connected to it. In a max heap, the parent  
 * element is always bigger then the child element. This structure can be sorted in an array such as the child element 
 * are alwasys (2(i)+1 or 2(i)+2) where i is the index of the parent. 
 *
 * @param arr The array to make into a max heap.
 *
 * @return The max heap. 
 */
function generateMaxHeap(arr) {
  let swapOccured = false;
  for (let i = 1; i < arr.length; i++) {
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

/** Quick sort
 *  
 * How quick sort works:
 *  - Selects a pivot point, typically the last element of an array.
 *  - Makes a new subarray such that all values less then the pivet are in one array and values greater then it are in another.
 *  - Put the subarray of lesser values to the left of the pivet, greater to the right. Repeat these for each subarray and subarray of the subarray and 
 *    so on.
 *
 * @param arr The array that needs to be sorted
 * @param indexx Index
 *
 * @return The sorted array. 
 */
function quickSort(arr, index) {
  let arr2D = [];
  if (index == 0)
    arr2D = [arr];
  else
    arr2D = arr;
  let newArr = [];
  for (let i = 0; i < arr2D.length; i++) {
    let leftArr = [];
    let centre = [arr2D[i][arr2D[i].length - 1]];
    let rightArr = [];
    if (arr2D[i].length > 1) {
      for (let j = 0; j < arr2D[i].length - 1; j++) {
        if (arr2D[i][j] <= centre[0]) {
          leftArr.push(arr2D[i][j])
        } else if (arr2D[i][j] > centre[0]) {
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
  index++;
  if (arrGreat)
    return quickSort(arr2D, index)
  else
    return array2DTo1D(arr2D);
}

/**  returnRandomArr
 *
 * returnRandomArr - Returns an array of random numbers
 *
 * @param num The number of numbers that should be in the array.
 * @param repeats If true, there can be repeats (range must be used too). If false no repeated values. 
 * @param range An array [min,max]. This must be given as a param is repeats is true.
 *
 */
function returnRandomArr(num, repeats, range) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    if (!repeats)
      arr.push(i)
    else
      arr.push(parseInt(random(range[0], range[1])));
  }
  arr = shuffle(arr);
  return arr;
}
