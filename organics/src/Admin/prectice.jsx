// import React from 'react'

// import { useEffect } from "react";

export default function prectice() {
  //   useEffect(() => {
  //     // APi?page
  //     // if(page is increased or decreased){
  //     // alert("hello")
  //     // }
  //     // 10 last
  //   }, [apple]); //mount phase //updating phase

  // 1. Input:
  // func("listen", "silent")
  // output: true
  // 2. Input: func("hello", "world")
  // output: false
  // 3. Input: func("example", "elpmaxe")
  // output: true

  function func(str1, str2) {
    let a = str1.split("").trim().sort();
    let b = str2.split("").trim().sort();

    if (a == b) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
  func("listen", "silent"); //true

  return (
    <div>
      <button>Close</button>
    </div>
  );
}
