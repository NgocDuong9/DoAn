export const generateRandomNumber = () => {
  var min = 100000; // Giá trị nhỏ nhất có 6 chữ số
  var max = 999999; // Giá trị lớn nhất có 6 chữ số

  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};
