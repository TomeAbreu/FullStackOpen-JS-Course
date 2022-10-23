const dummy = (array) => {
  return 1;
};

const sumLikes = (array) => {
  return array.reduce((sum, element) => {
    return sum + element.likes;
  }, 0);
};

module.exports = {
  dummy,
  sumLikes,
};
