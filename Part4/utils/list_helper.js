const dummy = (array) => {
  return 1;
};

const sumLikes = (array) => {
  return array.reduce((sum, element) => {
    return sum + element.likes;
  }, 0);
};

const favoriteBlog = (array) => {
  const sortedArray = array.sort((a, b) => {
    return a.likes - b.likes;
  });

  return sortedArray[0].likes;
};

const mostBlogs = (array) => {
  let authorName = "";
  let maxSumAuthor = 0;
  if (array.length > 0) {
    array.forEach((element) => {
      let author = element.author;
      const authorArrayFiltered = array.filter((arrElement) => {
        return author === arrElement.author;
      });
      if (authorArrayFiltered.length >= maxSumAuthor) {
        authorName = author;
        maxSumAuthor = authorArrayFiltered.length;
      }
    });
  }

  return authorName;
};

const mostLikes = (array) => {
  let authorName = "";
  let authorTotalLikes = 0;
  if (array.length > 0) {
    array.forEach((blog) => {
      let author = blog.author;
      let authorLikes = 0;
      const authorArrayFiltered = array.filter((arrElement) => {
        return arrElement.author === author;
      });
      authorLikes = sumLikes(authorArrayFiltered);

      if (authorLikes >= authorTotalLikes) {
        authorName = author;
        authorTotalLikes = authorLikes;
      }
      console.log("Author Name: " + authorName, "Likes: " + authorTotalLikes);
    });
  }

  return { author: authorName, likes: authorTotalLikes };
};

module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
