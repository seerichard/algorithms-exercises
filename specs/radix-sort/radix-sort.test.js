/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

// number = 1391, place = 0, longestNumber = 4
// returns 1

// number = 3, place = 3, longestNumber = 4
// returns 0
function getDigit(number, place, longestNumber) {
  const stringDigit = number.toString();
  const paddedDigit = stringDigit.padStart(longestNumber, '0');
  return paddedDigit[place] ?? 0;
}

function getLongestNumber(array) {
  const largestNumber = Math.max(...array);

  return largestNumber.toString().length;
}

function radixSort(array) {
  // Find longest number
  const longestNumber = getLongestNumber(array);
  
  // Create how many buckets you need
  // An array of 10 arrays (0-9)
  let store = [[], [], [], [], [], [], [], [], [], []];

  // For loop of how many iterations you need to do - longestNumber
  for (let i = longestNumber - 1; i >= 0; i--) {
    // while loop
    // Enqueue the numbers into buckets
    while (array.length) {
      const current = array.shift();
      const digit = getDigit(current, i, longestNumber);
      store[digit].push(current);
    };

    // for loop for each bucket
    // dequeue all of the items out of the bucket
    for (let j = 0; j < 10; j++) {
      while (store[j].length) {
        array.push(store[j].shift());
      }
    }

    
    // Why does this not work?? - It might but the test is broken. .sort() needs a function to order numbers correctly
    // array = store.flat();
    // store = [[], [], [], [], [], [], [], [], [], []];
  };
  
  return array;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20,
      51,
      3,
      801,
      415,
      62,
      4,
      17,
      19,
      11,
      1,
      100,
      1244,
      104,
      944,
      854,
      34,
      3000,
      3001,
      1200,
      633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1,
      3,
      4,
      11,
      17,
      19,
      20,
      34,
      51,
      62,
      100,
      104,
      415,
      633,
      801,
      854,
      944,
      1200,
      1244,
      3000,
      3001
    ]);
  });
  it.skip("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
      const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort());
  });
});
