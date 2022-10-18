module.exports = {
  generateNumber: (number) => {
    let pattern;
    if (number < 10) {
      pattern = `000${number}`;
    } else if (number >= 10 && number <= 100) {
      pattern = `00${number}`;
    } else if (number > 100 && number <= 1000) {
      pattern = `0${number}`;
    } else {
      pattern = number;
    }
    return pattern;
  },
  incrementNumber: (value) => {
    if (value === undefined) return 1;
    return value + 1;
  },
};
