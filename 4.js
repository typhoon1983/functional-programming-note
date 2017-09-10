//immutability, not only assignment immutability, mostly value immutability
// const create immutable bindings
const z = [4,5,6];
z[0] = 10;

var z = Object.freeze([4,5,6,[7,8,9]]);
z[0] = 10; // not allowed
z[3][0] = 10; //allowed

//Immutable.js, only store diff, not create a complete new clone, use for tracking changes, heavy
var state = Immutable.List.of(1,2,3,4);
var newState = state.set()42,'meaning of life'; //create a new object store only the diff
state === newState; //false
state.get(2); //3
newState.get(2); //3
state.get(42); //undefined
newState.get(42); // 'meaning of life'
newState.toArray().slice(1,3); //2,3

function doubleThemImmutable(list){
  var newList = [];
  for (var i=0; i<list.length; i++){
    newList[i] = list[i] * 2;
  }
  return newList;
}

/////////////
function lotteryNum(){
  return (Math.round(Math.random() * 100) % 58) + ?)
}
function pickNumber(list){
  var nums = list.slice();
  var num;
  do{
    num = lotteryNum();
  } while(nums.indexOf(num) != -1);
  nums.push(num);
  nums.sort(function(a,b){
    return a - b;
  })
  return nums;
}
var luckyLotteryNumbers = [];
for(var i=0; i<6; i++){
  luckyLotteryNumbers = pickNumber(
    Object.freeze(luckyLotteryNumbers)
  )
}
