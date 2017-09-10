Arguments
 // unary function  - one argument
 // binary function - two arguments


 variatic function - any number of arguments

 function unary(fn){
  return function one(arg){
    return fn(arg);
  }
 }
 function binary(fn){
  return function two(arg1, arg2){
    return fn(arg1, arg2);
  }
 }
 function f(...args){
  console.log(args);
 }
 var g = unary(f);
 var h = binary(f);
 g(1,2,3,4); // [1]
 h(1,2,3,4); // [1,2]

 ///////
 function flip(fn){
  return function flipped(arg1, arg2, ...args){
    return fn(arg2, arg1,...args);
  }
 }
 var i = flip(f);
 i(1,2,3,4); // [2,1,3,4]

 ///////
 function reverseArgs(fn){
   return function reversed(...args){
     return fn(...args.reverse());
   }
 }
 var j = reverseArgs(f);
 j(1,2,3,4); // [4,3,2,1]

 ///////
 function spreadArgs(fn){
   return function spread(args){
     return fn(...args);
   }
 }
 function ff(x,y,z,w){
  console.log(+y+z+w);
 }
 var k = spreadArgs(ff);
 k([1,2,3,4]); // 10

 ///////
 gatherArgs





//Point free style, delete unnecessary argument.
function isOdd(v){
  return v % 2 == 1;
}
function isEven(v){ //not point free
  return !isOdd(v)
}
// below is point free
function not(fn){
  return function negated(...args){
    return !fn(...args);
  }
}
var isEven = not(isOdd);
isEven(4); // true

var output = console.log.bind(console);
function isShortEnough(str){
  return str.length <= 5;
}
var isLongEnough = not(isShortEnough);
function when(fn){
  return function(predicate){
    return function(...args){
      if(predicate(...args)){
        return fn(...args);
      }
    }
  }
}
var printIf = when(output);
printIf(isShortEnough)("hello");
