function add1(v){return v + 1;}
function mul2(v){return v * 2;}
function div3(v){return v / 3;}
var list = [2,5,8,11,14,17,20];
list.map(add1).map(mul2).map(div3); // this is loop the list 3 times, and creating intermidiam array everytime

//Fusion, take a series of list operation, compose all utilities to a single operator,
//If operations are in the same shape, just compose or pipe
function composeRight(fn1, fn2){
  return function(...args){
    return fn1(fn2(...args));
  }
}
list.map([div3,mul2,add1].reduce(composeRight));


//Transducing, when the shape of operations are not compatible.
function add1(v){return v + 1;}
function isOdd(v){return v % 2 === 1;}
function sum(total, v){return total + v;}
list.map(add1).filter(isOdd).reduce(sum);

function mapWithReduce(arr, mappingFn){
  return arr.reduce(function reducer(list,v){
    list.push(mappingFn(v)); //use push here to mutate the empty array, because the empty array is in the function/context in my control, predictable.
    return list;
  },[])
}
function filterWithReduce(arr, predicateFn){
  return arr.reduce(function reducer(list,v){
    if(predicateFn(v)) list.push(v);
    return list;
  },[])
}
list = mapWithReduce(list, add1);
list = filterWithReduce(list, isOdd);
list.reduce(sum);

||
\/

function mapReducer(mappingFn){
  return function reducer(list, v){
    list.push(mappingFn(v));
    return list;
  }
}
function filterReducer(predicateFn){
  return function reducer(list, v){
    if(predicateFn(v)) list.push(v);
    return list;
  }
}
list
.reduce(mapReducer(add1),[])
.reduce(filterReducer(isOdd),[])
.reduce(sum)

||
\/

function listCombination(list, v){
  list.push(v);
  return list;
}
function mapReducer(mappingFn){
  return function reducer(list, v){
    return listCombination(list, mappingFn(v));
  }
}
function filterReducer(predicateFn){
  return function reducer(list, v){
    if(predicateFn(v)) return listCombination(list, v);
  }
}
list
.reduce(mapReducer(add1),[])
.reduce(filterReducer(isOdd),[])
.reduce(sum)


||
\/

function listCombination(list, v){
  list.push(v);
  return list;
}
var mapReducer = curry(function mapReducer(mappingFn, combineFn){
  return function reducer(list,v){
      return combineFn(list, mappingFn(v));
  }
})
var filterReducer = curry(function filterReducer(predicateFn, combineFn){
  return function reducer(list,v){
      if(predicateFn(v)) return combineFn(list, v);
      return list;
  }
})
list
.reduce(mapReducer(add1)(listCombination),[])
.reduce(filterReducer(isOdd)(listCombination),[])
.reduce(sum)

//Combiner function(listCombination) and reducer have the same shape !!!!!!
||
\/

var transducer = compose(mapReducer(add1), filterReducer(isOdd));
list
.reduce(transducer(listCombination), [])
.reduce(sum);

||
\/

list.reduce(transducer(sum), 0)




//Generalised
function transduce(transducer, combineFn, initialValue, list){
  var reducer = transducer(combineFn);
  return list.reduce(reducer, initialValue);
}
var transducer = compose(mapReducer(add1), filterReducer(isOdd));
transduce(transducer, sum, 0, [2,5,8,11,14,17,20])

//transduce(transducer, listCombination, [], [2,5,8,11,14,17,20])
