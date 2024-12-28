// // // // const hey = new Promise((res, rej) => {
// // // //   if (true) {
// // // //     res("resolved");
// // // //   } else {
// // // //     rej("not resolved");
// // // //   }
// // // // })
// // // //   .then(res => {
// // // //     console.log(res);
// // // //     return "hey";
// // // //   })
// // // //   .then(res => {
// // // //     console.log(res);
// // // //   })
// // // //   .catch((rej) => console.log(rej));

// // // // const { json } = require("express");
// // // import { json } from "express";
// // // let username = "SachinChandraBhatt";
// // // const url = `https://api.github.com/users/${username}`;

// // // fetch(url).then(res =>{
// // //     console.log(res,json());
// // // }).catch(err =>{
// // //     console.log(err);
// // // })
// // // // https://api.github.com/repos/octocat/Spoon-Knife/issues

// // // async handler

// // // function Hey(name) {
// // //   this.name = name;
// // // }

// // // const h = new Hey("hello");
// // // console.log(h.name);

// // // Using a regular function
// // const obj = {
// //   value: 10,
// //   regularFunction: function () {
// //     console.log(this.value); // 'this' refers to obj
// //   },
// // };
// // obj.regularFunction(); // Output: 10

// // // Using an arrow function
// // const obj2 = {
// //   value: 10,
// //   arrowFunction: () => {
// //     console.log(this.value); // 'this' does NOT refer to obj2; it's inherited from the outer scope
// //   },
// // };
// // obj2.arrowFunction(); // Output: undefined (or depends on the surrounding context)


// class Bird {
//     constructor(name){
//         this.name = name
//     }
//     fly(){
//         return `${this.name} Can Fly`
//     }
// }

// class Penguine extends Bird{
//     fly(){
//         return `${this.name} Cannot Fly`
//     }
// }

// const penguine = new Penguine("Penguine")
// console.log(penguine.fly());
// const parrot = new Bird("parrot")
// console.log(parrot.fly());


