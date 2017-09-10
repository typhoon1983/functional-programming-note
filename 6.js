//Recursion, TCO tail call optimization, PTC proper tail call form
// sigma symbol
function sumRecur(sum, ...nums){
  if(nums.length == 0) return sum;
  return sum + sumRecur(...nums);
}

function sumRecur(sum, num, ...nums){
  if(nums.length == 0) return sum + num;
  return sum + sumRecur(num, ...nums);
}


//PTC requires strict mode and in Safari
// allowed to have a ternary in the return clause, when function call is at the position will be called at last.
"use strict";
function foo(x){
  if(x < 10) retunr x;
  return bar(x);
}
function bar(x){
  return x / 2;
}

var sumRecur = (function(){
  return function(...nums){
    return recur(...nums);
  }

  function recur(sum, num, ...nums){
    sum += num;
    if(nums.length == 0) return sum;
    return recur(sum, ...nums);
  }
})()
||
\/
function sumRecur(sum, num, ...nums){
  if(nums.length == 0) return sum + num;
  return sumRecur(sum + num, ...nums);
}


//continuation passing style - CPS
// two recursion in the same function
var sumRecur = (function(...nums){
  return function(...nums){
    return recur(nums, v=>v);
  }

  function recur([sum, ...nums], cont){
    if(nums.length == 0) return cont(sum);
    return recur(nums, functon(v){
      return cont(sum + v);
    });
  }
})()


//trampolines, get around PTC
var sumTrampolined = trampoline(
  function f(sum,num,...nums){
    sum += num;
    if(nums.length == 0) return sum;
    return function(){ //return the continuation
      return f(sum, ...nums);
    }
  }
);

function trampoline(fn){
  return function trampolined(...args){
    var result = fn(...args);
    while(typeof result == "function"){
      result = result();
    }
    return result;
  }
}
