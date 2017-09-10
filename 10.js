//Async

// eager approach, sync
var a = [1,2,3]
var b = a.map((v) => {return v * 2;})
b;

// lazy
// FP over time, reactive programming
var a = [];
var b = mapLazy(a, (v) => {return v * 2;})

// mapLazy = ???

a.push(1);
a[0]; //1
b[0]; //2
a.push(2);
a[1]; //2
b[1]; //4



//////////////////////
var a = new LazyArray();
setInterval(function everySecond(){
  a.push(math.random());
},1000);
// LazyArray = ???
var b = a.map((v) => {return v * 2;});
b.forEach(function onValue(v){console.log(v);});

//LazyArray == Observable
// Rxjs library
var a = new Rx.Subject();
setInterval(function everySecond(){
  a.next(Math.random());
},1000);
var b = a.map((v) => {return v * 2;});
b.subscribe(function onValue(v){console.log(v);})




/////////////////////////
