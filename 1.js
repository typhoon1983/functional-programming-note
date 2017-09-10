imperative vs declarative
imp -> focus on how to accomplish task
dec -> what should happen


Provable -> use patterns already written and proved
Readable -> less to read

abstraction vs capsulation
abs -> creating semantic boundary to separate things(between what and how)
cap -> class, etc

all functions are procedures but not vice versa
procedures are a collection of operations.
a function needs to return something.

// Purify a impure function.
// 1. wrap it
function F(x){
  var y;
  f(x);
  return y;
  function f(){
    y = 2 * Math.pow(x,2) + 3;
  }
}
~~~~~~
// 2. add an interface to reset original variables;
function f() {
  y = 2 * Math.pow(x,2) + 3;
}
function F(curX) {
  var [origX,origY] = [x,y];
  x = curX;
  f();
  var newY = y;
  var [x,y] = [origX,origY];
  return newY;
}

pure function doesn't have access to variables outside itself that's observable. Given the same input always get same output

// Not pure if look below as a whole, pure if only look getId function.
function getId(obj){
  return obj.id;
}
getId({
  get id(){
    return Math.random();
  }
})
