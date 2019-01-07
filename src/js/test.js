// require("../style.less");
import 'babel-polyfill'
const arr1 = [1, 2, 3];
const arr2 = [...arr1];
console.log(arr2);
let arr3 = arr2.map(x => x * 2);
console.log(arr3);
const [x, y, z] = [[...arr3]];
console.log(x);

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return "(" + this.x + ", " + this.y + ")";
  }
}
console.log(new Point(1, 2).toString());
console.log(new Promise(function() {}));
function getUser() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("lzy");
    }, 2000);
  });
}
async function getUserName() {
  let userName = await getUser();
  console.log(userName);
}
getUserName();


console.log("Running App version " + VERSION);
console.log(BASEURL);