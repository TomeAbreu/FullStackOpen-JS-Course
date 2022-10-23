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

module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
  mostBlogs,
};
