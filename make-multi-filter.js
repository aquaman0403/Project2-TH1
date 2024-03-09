"use strict";

function MakeMultiFilter(originalArray) {
  // Tạo một bản sao của originalArray
  let currentArray = [...originalArray];

  // Định nghĩa một hàm để trả về sau này
  const arrayFilterer = (filterCriteria, callback) => {
    // Nếu filterCriteria không phải là kiểu hàm, trả về ngay lập tức originalArray
    if (typeof filterCriteria !== "function") {
      return currentArray;
    }

    // Sử dụng hàm filterCriteria để lọc mảng
    currentArray = currentArray.filter(filterCriteria);

    // Nếu callback không phải là kiểu hàm, thì trả về chính nó
    if (typeof callback === "function") {
      // "this" của callback nên trỏ đến giá trị của originalArray
      callback = callback.bind(originalArray);
      callback(currentArray);
    }
    // Sử dụng hàm callback và để "this" của callback trỏ đến originalArray
    return arrayFilterer;
  };

  // trả về một hàm có thể được sử dụng để lọc các phần tử của mảng
  return arrayFilterer;
}

/* Dưới đây là các hàm kiểm thử */
// Gọi MakeMultiFilter() với originalArray = [1, 2, 3] trả về một
// hàm, được lưu trong biến arrayFilterer1, có thể được sử dụng để
// lọc mảng đầu vào một cách lặp lại
var arrayFilterer1 = MakeMultiFilter([1, 2, 3]);

// Gọi arrayFilterer1 (với một hàm callback) để lọc ra tất cả các số khác 2.
arrayFilterer1(
  function (elem) {
    return elem !== 2; // kiểm tra xem phần tử có khác 2 không
  },
  function (currentArray) {
    // 'this' trong hàm callback nên tham chiếu đến originalArray là [1, 2, 3]
    console.log(this); // in ra [1, 2, 3]
    console.log(currentArray); // in ra [1, 3]
  }
);

// Gọi arrayFilterer1 (mà không có hàm callback) để lọc ra tất cả các phần tử khác 3.
arrayFilterer1(function (elem) {
  return elem !== 3; // kiểm tra xem phần tử có khác 3 không
});

// Gọi arrayFilterer1 mà không có filterCriteria sẽ trả về currentArray.
var currentArray = arrayFilterer1();
console.log("currentArray", currentArray); // in ra [1] vì đã lọc bỏ 2 và 3

// Vì arrayFilterer trả về chính nó, cuộc gọi có thể được nối tiếp
function filterTwos(elem) {
  return elem !== 2;
}
function filterThrees(elem) {
  return elem !== 3;
}
var arrayFilterer2 = MakeMultiFilter([1, 2, 3]);
var currentArray2 = arrayFilterer2(filterTwos)(filterThrees)();
console.log("currentArray2", currentArray2); // in ra [1] vì đã lọc bỏ 2 và 3

// Nhiều Filter hoạt động cùng một lúc
var arrayFilterer3 = MakeMultiFilter([1, 2, 3]);
var arrayFilterer4 = MakeMultiFilter([4, 5, 6]);
console.log(arrayFilterer3(filterTwos)()); // in ra [1, 3]
console.log(arrayFilterer4(filterThrees)()); // in ra [4, 5, 6]
