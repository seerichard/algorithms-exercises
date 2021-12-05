/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (first, second) => {
  const result = [];

  while (!!first.length && !!second.length) {
    if (first[0] <= second[0]) {
      result.push(first.shift());
    } else {
      result.push(second.shift());
    };
  };

  // Either first or second will be empty but
  // concatenating an empty array does nothing (is safe)
  return result.concat(first, second);
}

const mergeSort = (nums) => {
  // code goes here

  // Base case (array.length of 1)
  if (nums.length < 2) return nums;

  const half = Math.floor(nums.length / 2);
  const first = nums.slice(0, half);
  const second = nums.slice(half);

  return merge(mergeSort(first), mergeSort(second));
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
