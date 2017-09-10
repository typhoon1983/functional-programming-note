//Closure and Purifying Closure
//Closure - is when a function "remembers" the variables around it even when that function is executed elsewhere
//Scope, function, variable

//lazy algorithm
function foo(x,y){
  return function(){
    return x + y;
  }
}
var x = foo(3,4);
x();
x();

// vs eager algorithm
function foo(x,y){
  var sum = x + y;
  return function(){
    return sum; //do not need to calculate every time
  }
}

// somewhere in the middle
function foo(x,y){
  var sum;
  return function(){
    if(sum === undefined){
      sum = x + y;
    }
    return sum;
  }
}

//a function has referential transparency - take the function call, replace it with the result, rest of program is not affected.

//memoization - take a function, memo it. For performance.

//use closure to maintain state which can't be observed from outside.
//make a function have memory

//NO NO, not pure anymore
function foo(){
  var id = 0;
  return function(){
    return id++;
  }
}
var x = foo();


//Most important usage of closure - generalized to specialized
//addTo10 is specialize version of generalize add.
function add(x,y){
  return x + y;
}
function partial(fn, ...firstArgs){
  return function applied(...;astArgs){
    return fn(...firstArgs, ...lastArgs);
  }
}
var addTo10 = partial(add,10);
addTo10(32);


//partial application vs currying
//Same -> are two different techniques to specializing a generalized function
//Different -> partial application take some arguments now and rest of them later, two shots
            -> currying expects a little bit a time, lots of levels of specialization, until get all arguments then call the original function

var add3 = curry(function add3(x,y,z){
  return x + y + z;
});
var f = add3(3);
var p = f(4);
p(5); // 12
add3(3)(4)(5); // 12
