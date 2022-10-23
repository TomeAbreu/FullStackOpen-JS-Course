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

module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
};
