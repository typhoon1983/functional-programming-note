//Data Structure
//map: transformation operation, projecting, each operation is completely separate from others, can be used in multi thread environment
//map urls to promises
//takes a pure function

//map, filter, reduce, concat not mutating
//reverse, sort, mutating

//reduce is fundamentally combining operations, swiss knife

//sometimes data structure is actually a part of your code, perform operations on the code like to do with data structure

let funcA = constant(5);
let funcB = constant(6);
let add = (a, b) => a + b;
console.log(add(funcA() + funcB())); // 11
let add2 = (f1, f2) => add(f1(), f2());
console.log(add2(funcA, funcB)); // 11
let constant = (val) => () => val;  // this function is called constant in FP
console.log(add2(constant(5), constant(6))); // 11

//loop
function addn(fns){
  fns = fns.slice();
  while(fns.length > 2){
    let [fn0, fn1, ...rest] = fns;
    funs = [
      function(){
        return add2( fn0, fn1);
      },
      ...rest
    ]
  }
  return add2(fns[0], fns[1]);
}
//recursion
function addn([fn0, fn1, ...fns]){
  if(fns.length == 0) return add2(fn0, fn1);
  return addn(
    [
      function(){
        return add2(fn0, fn1)
      },
      ...fns
    ]
  )
}
//list operation
function addn([fn0, fn1, ...fns]){
  return fns.reduce(
    function(composedFn, fn){
      return function(){
        return add2(composedFn, fn);
      }
    }
  )();
}
addn([constant(3),constant(5),constant(7),constant(9),constant(11)]);

// let addNLoop = (...funcs) => {
//   switch(funcs.length){
//     case 0: return 0;
//     case 1: return funcs[0]();
//     default:;
//   }
//   let sum = 0;
//   for(let i = 0; i < funcs.length: i++){
//     sum = add2(constant(sum),funcs[i])
//   }
//   return sum;
// }
// let addNRecursion = (...funcs) => {
//   switch(funcs.length){
//     case 0: return 0;
//     case 1: return funcs[0]();
//     default:;
//   }
//   let [f1, f2, ...rest] = funcs;
//   return addNRecursion(constant(add2(f1, f2)), ...rest);
// }
// let addNReduce = (...funcs) => {
//   if(funcs.length === 0) return 0;
//   let sum = 0;
//   funcs.reduce((accum, item) => {
//     return constant(add2(accum, item);
//   },() => 0)
// }

// let removeDuplicate = (nums) => {
//   let uniqeNumbs = [];
//   uniqeNumbs = nums.filter((val) => {
//     return uniqeNumbs.findIndex(val) === -1;
//   });
//   return uniqeNumbs;
// }
[1,3,4,2,0,9,8,3,22,1,6,4,9,3,2,8,10].filter(
  function(v, idx, arr){
    if(idx == arr.indexOf(v)) return true;
    return false;
  }
);

addn(
  [1,3,4,2,0,9,8,3,22,1,6,4,9,3,2,8,10].reduce(
    function(newList,v){
      if(newList.indexOf(v) === -1) newList.concat(v);
      return newList;
    },[]
  )
  .filter((val) => {
    return val % 2 === 0;
  })
  .map(constant)
)
