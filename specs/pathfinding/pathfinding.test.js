// write in a function thats a X by X array of arrays of numbers
// as well two x/y combinations and have it return the shortest
// length (you don't need to track the actual path) from point A
// to point B.
//
// the numbers in the maze array represent as follows:
// 0 – open space
// 1 - closed space, cannot pass through. a wall
// 2 - one of the two origination points
//
// you will almost certainly need to transform the maze into your own
// data structure to keep track of all the meta data

// this is a little tool I wrote to log out the maze to the console.
// it is opinionated of how to do that and you do not have to do it
// the way I did. however feel free to use it if you'd like
const logMaze = require("./logger");

// THIS WAS AN ACTUAL INTERVIEW QUESTION

const NO_ONE = 0;
const BY_A = 1;
const BY_B = 2;

const generateVisited = (maze) => 
  // First map iterates over y axis (rows)
  // Second map iterates over x axis (cells)
  maze.map((row, y) =>
    row.map((cell, x) => ({
      closed: cell === 1, // Check if the value is 1 (which is closed)
      length: 0, // Traversal length
      openedBy: NO_ONE,
      x,
      y
    })
  )
);

// For a given node, return all it's neighbours
const getNeighbours = (visited, x, y) => {
  // Declare an empty queue of neighbours
  const neighbours = [];

  // Check if out of bounds AND has not been visited before
  // for each direction

  // Left
  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    neighbours.push(visited[y - 1][x])
  }

  // Right
  if (y + 1 < visited[0].length && !visited[y + 1][x].closed) {
    neighbours.push(visited[y + 1][x])
  }

  // Up
  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    neighbours.push(visited[y][x - 1])
  }

  // Down
  if (x + 1 < visited[0].length && !visited[y][x + 1].closed) {
    neighbours.push(visited[y][x + 1])
  }

  return neighbours;
};


function findShortestPathLength(maze, [xA, yA], [xB, yB]) {
  // Generate a maze that can be used to update traversal
  const visited = generateVisited(maze);

  // Set the origin points
  // y axis first as that is the row
  const aOrigin = visited[yA][xA];
  const bOrigin = visited[yB][xB];

  aOrigin.openedBy = BY_A;
  bOrigin.openedBy = BY_B;

  // Create a and b queues and set with origins
  let aQueue = [aOrigin];
  let bQueue = [bOrigin];

  // Count each traversal iteration
  let iteration = 0; 

  // There must always be an item in the queue, else there is no answer
  while (aQueue.length && bQueue.length) {
    iteration++;
    
    // Gather A neighbours
    let aNeighbours = [];

    // Can be achieved using a reduce
    while (aQueue.length) {
      // Get the 0 index coordinate and dequeue
      const coordinate = aQueue.shift();

      // concat() returns a new array. Add neighbours to the queue
      aNeighbours = aNeighbours.concat(getNeighbours(visited, coordinate.x, coordinate.y));
    }

    // Processing of A and B should be abstracted out into its own function

    // Process A neighbours
    // Iterate through the queue
    for (let i = 0; i < aNeighbours.length; i++) {
      const neighbour = aNeighbours[i];
      
      // If opened by B, then that means a path has been found
      if (neighbour.openedBy === BY_B) {
        // neighbour.length = length from origin A (traversal length)
        // iteration = How far away from B
        return neighbour.length + iteration;
      } else if (neighbour.openedBy === NO_ONE) {
        // This is a new node, set node as visited by A
        neighbour.length = iteration;
        neighbour.openedBy = BY_A;

        // Add this to the queue to process for the next while iteration
        aQueue.push(neighbour);
      }
    }

    // Gather B neighbours
    let bNeighbours = [];

    // Can be achieved using a reduce
    while (bQueue.length) {
      // Get the 0 index coordinate and dequeue
      const coordinate = bQueue.shift();

      // concat() returns a new array. Add neighbours to the queue
      bNeighbours = bNeighbours.concat(getNeighbours(visited, coordinate.x, coordinate.y));
    }

    // Process A neighbours
    // Iterate through the queue
    for (let i = 0; i < bNeighbours.length; i++) {
      const neighbour = bNeighbours[i];
      
      // If opened by A, then that means a path has been found
      if (neighbour.openedBy === BY_A) {
        // neighbour.length = length from origin B (traversal length)
        // iteration = How far away from A
        return neighbour.length + iteration;
      } else if (neighbour.openedBy === NO_ONE) {
        // This is a new node, set node as visited by B
        neighbour.length = iteration;
        neighbour.openedBy = BY_B;

        // Add this to the queue to process for the next while iteration
        bQueue.push(neighbour);
      }
    }
  }

  // No path
  return -1;
}

// there is a visualization tool in the completed exercise
// it requires you to shape your objects like I did
// see the notes there if you want to use it

// unit tests
// do not modify the below code
describe("pathfinding – happy path", function () {
  const fourByFour = [
    [2, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 2]
  ];
  it("should solve a 4x4 maze", () => {
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  const sixBySix = [
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 2, 0, 0, 0]
  ];
  it("should solve a 6x6 maze", () => {
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  const eightByEight = [
    [0, 0, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 2, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 2]
  ];
  it("should solve a 8x8 maze", () => {
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  const fifteenByFifteen = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
  ];
  it("should solve a 15x15 maze", () => {
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(
      78
    );
  });
});

// I care far less if you solve these
// nonetheless, if you're having fun, solve some of the edge cases too!
// just remove the .skip from describe.skip
describe("pathfinding – edge cases", function () {
  const byEachOther = [
    [0, 0, 0, 0, 0],
    [0, 2, 2, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0]
  ];
  it("should solve the maze if they're next to each other", () => {
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  const impossible = [
    [0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [1, 1, 1, 0, 0],
    [0, 0, 0, 0, 2]
  ];
  it("should return -1 when there's no possible path", () => {
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
