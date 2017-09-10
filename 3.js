//composition, machine making machines

//pipe
function sum(x,y){
  return x + y;
}
function mult(x,y){
  return x * y;
}
function pipe2(fn1, fn2){
  return function piped(arg1,arg2,arg3){
    return fn2(
      fn1(arg1,arg2),
      arg3
    )
  }
}
var multsum = pipe2(mult,sum);
multsum(2,3,4)


foo(bar(baz(2)));
compose(foo,bar,baz)(2); //right to left, order of writing as above
pipe(baz,bar,foo)(2); //left to right, order of execution

function composeRight(fn2,fn1){
  return function comp(...args){
    return fn2(fn1(...args))
  }
}

//unary function are easiest to compose
function compose(...fns){
  return pipe(...fns.reverse());
}
function pipe(...fns){
  return function piped(result){
    for(var i=0; i<fns.length; i++){
      result = fns[i](result)
    }
    return result;
  }
}
