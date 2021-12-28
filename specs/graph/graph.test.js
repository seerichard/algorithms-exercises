// you work for a professional social network. in this social network, a professional
// can follow other people to see their updates (think Twitter for professionals.)
// write a function that finds the job `title` that shows up most frequently given
// a set of degree of separation from you. count the initial id's own job title in the total

/*
  parameters:
  myId                - number    - the id of the user who is the root node
  
  degreesOfSeparation - number   - how many degrees of separation away to look on the graph
*/

/*
  getUser  - function - a function that returns a user's object given an ID

  example

  {
    id: 308,
    name: "Beatrisa Lalor",
    company: "Youtags",
    title: "Office Assistant II",
    connections: [687, 997, 437]
  }
*/
const { getUser } = require("./jobs");

const findMostCommonTitle = (myId, degreesOfSeparation) => {
  // Add the initial value to the queue
  let queue = [myId];
  // Use a set to check for duplicate users
  const uniqueIds = new Set(queue);
  // Create a job counter
  const jobs = {};

  // Loop through for each degree of separation
  for (let i = 0; i <= degreesOfSeparation; i++) {
    const newQueue = [];

    while (queue.length) {
      // Set the current user while also dequeueing
      const user = getUser(queue.shift());

      // Loop through for each user's connection
      for (let j = 0; j < user.connections.length; j++) {
        // Get the users's connection
        const connection = user.connections[j];

        if (!uniqueIds.has(connection)) {
          // Add to the newQueue and set
          newQueue.push(connection);
          uniqueIds.add(connection);
        }
      }

      // Add the user
      // At this point the user is unique as they are part of the queue
      // The queue only has users that are unique as users are not added if not (line 49)
      jobs[user.title] = jobs[user.title] ? jobs[user.title] + 1 : 1;
    }
    
    // Set the queue to the next level deep
    queue = newQueue;
  }

  let mostPopularTitle;
  let mostPopularCount = 0;

  // Loop through object of jobs
  Object.entries(jobs).map(([title, count]) => {
    if (count > mostPopularCount) {
      // Update the title and count
      mostPopularTitle = title;
      mostPopularCount = count;
    }
  });

  return mostPopularTitle;
};

// unit tests
// do not modify the below code
describe("findMostCommonTitle", function () {
  test("user 30 with 2 degrees of separation", () => {
    expect(findMostCommonTitle(30, 2)).toBe("Librarian");
  });

  test("user 11 with 3 degrees of separation", () => {
    expect(findMostCommonTitle(11, 3)).toBe("Graphic Designer");
  });

  test("user 307 with 4 degrees of separation", () => {
    // if you're failing here with "Clinical Specialist, you're probably not filtering users who
    // appear more than once in people's connections
    expect(findMostCommonTitle(306, 4)).toBe("Pharmacist");
  });
});

describe("extra credit", function () {
  test("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe("Geological Engineer");
  });
});
