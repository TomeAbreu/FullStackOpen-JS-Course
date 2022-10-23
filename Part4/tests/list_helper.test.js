//Get dummy function
const listHelperFunctions = require("../utils/list_helper");

test("dummy returns one in a list", () => {
  const blogs = [];

  const result = listHelperFunctions.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes in blog list", () => {
  test("when list has no elements, likes is 0", () => {
    const blogs = [];

    const result = listHelperFunctions.sumLikes(blogs);
    expect(result).toBe(0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const blogs = [
      {
        title: "Dan Flying Solo",
        author: "Dan",
        url: "https://www.danflyingsolo.com",
        likes: 10,
        id: "6355440a0cbcfcb4109bf8ef",
      },
    ];

    const result = listHelperFunctions.sumLikes(blogs);
    expect(result).toBe(10);
  });
  test("when list has more than one blog, equals to the sum of likes of each blog", () => {
    const blogs = [
      {
        title: "Dan Flying Solo",
        author: "Dan",
        url: "https://www.danflyingsolo.com",
        likes: 10,
        id: "6355440a0cbcfcb4109bf8ef",
      },
      {
        title: "I am a food blog",
        author: "Anna",
        url: "https://iamafoodblog.com/",
        likes: 23,
        id: "635544760cbcfcb4109bf8f2",
      },
      {
        title: "Pitchfork Blog",
        author: "Carlos",
        url: "https://pitchfork.com/",
        likes: 32,
        id: "635544a70cbcfcb4109bf8f4",
      },
      {
        title: "Pitchfork Blog",
        author: "Carlos",
        url: "https://pitchfork.com/",
        likes: 35,
        id: "635544ad0cbcfcb4109bf8f6",
      },
      {
        title: "Pitchfork Blog",
        author: "Carlos",
        url: "https://pitchfork.com/",
        likes: 37,
        id: "63554d7ac9aa60a36e48b2ad",
      },
    ];

    const result = listHelperFunctions.sumLikes(blogs);
    expect(result).toBe(137);
  });
});
describe("blog with most likes", () => {
  test("when list has just one blog, favorite blog is the number of likes in blog", () => {
    const blogs = [
      {
        title: "Dan Flying Solo",
        author: "Dan",
        url: "https://www.danflyingsolo.com",
        likes: 10,
        id: "6355440a0cbcfcb4109bf8ef",
      },
    ];

    const result = listHelperFunctions.favoriteBlog(blogs);
    expect(result).toEqual(blogs[0].likes);
  });
  test("when list has more than one blog, favorite blog is the one that has more likes", () => {
    const blogs = [
      {
        title: "Dan Flying Solo",
        author: "Dan",
        url: "https://www.danflyingsolo.com",
        likes: 10,
        id: "6355440a0cbcfcb4109bf8ef",
      },
      {
        title: "I am a food blog",
        author: "Anna",
        url: "https://iamafoodblog.com/",
        likes: 23,
        id: "635544760cbcfcb4109bf8f2",
      },
      {
        title: "Pitchfork Blog",
        author: "Carlos",
        url: "https://pitchfork.com/",
        likes: 32,
        id: "635544a70cbcfcb4109bf8f4",
      },
    ];

    const result = listHelperFunctions.favoriteBlog(blogs);
    expect(result).toEqual(blogs[0].likes);
  });
});

describe("author with most blogs", () => {
  test("when list is empty, most author is a empty string", () => {
    const blogs = [];

    const result = listHelperFunctions.mostBlogs(blogs);
    expect(result).toEqual("");
  });
  test("when list has just one blog, most author is the auhtor of the blog", () => {
    const blogs = [
      {
        title: "Dan Flying Solo",
        author: "Dan",
        url: "https://www.danflyingsolo.com",
        likes: 10,
        id: "6355440a0cbcfcb4109bf8ef",
      },
    ];

    const result = listHelperFunctions.mostBlogs(blogs);
    expect(result).toEqual(blogs[0].author);
  });
  test("when list has more than one blog, auhtor with most blogs is the one that has more author entries", () => {
    const blogs = [
      {
        title: "Dan Flying Solo",
        author: "Carlos",
        url: "https://www.danflyingsolo.com",
        likes: 15,
        id: "6355440a0cbcfcb4109bf8ef",
      },
      {
        title: "I am a food blog",
        author: "Dan",
        url: "https://iamafoodblog.com/",
        likes: 23,
        id: "635544760cbcfcb4109bf8f2",
      },
      {
        title: "Pitchfork Blog",
        author: "Carlos",
        url: "https://pitchfork.com/",
        likes: 32,
        id: "635544a70cbcfcb4109bf8f4",
      },
    ];

    const result = listHelperFunctions.mostBlogs(blogs);
    expect(result).toEqual(blogs[0].author);
  });
});
