 /*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  // Create the heap
  createMaxHeap(array);

  // Dequeue and sort the array
  // Reduce the heapSize (array.length) over each iteration as the items get sorted
  for (let i = array.length - 1; i > 0; i--) {
    swapPlace(0, i, array);
    // The heapSize changes as the array is sorted
    heapify(array, 0, i);
  }

  return array;
};

const createMaxHeap = (array) => {
  // Start in the middle of the array as the items on the right of the middle have no children
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, i, array.length);
  }
  
  return array;
};

const heapify = (array, index, heapSize) => {
  const left = (2 * index) + 1;
  const right = (2 * index) + 2;

  let largestValueIndex = index;

  // Check if left value is larger
  // heapSize > left checking if value is not out of bounds
  if (heapSize > left && array[largestValueIndex] < array[left]) {
    largestValueIndex = left;
  }

  // Check if right value is larger
  // heapSize > left checking if value is not out of bounds
  if (heapSize > right && array[largestValueIndex] < array[right]) {
    largestValueIndex = right;
  }

  // Check if a swap is needed - check if either the left or right was bigger
  if (largestValueIndex > index) {
    swapPlace(index, largestValueIndex, array);

    // Call heapify on the child
    heapify(array, largestValueIndex, heapSize);
  }
};

const swapPlace = (index1, index2, array) => {
  // Swap two items in an array 
  const swapValue = array[index1];
  array[index1] = array[index2];
  array[index2] = swapValue;

  return array;
}

// unit tests
// do not modify the below code
test("heap sort", function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
