// import React from "react";

// export default function DiscriptionLoad() {
//   return (
//     <div>
//       {/*  */}
//       <section className="w-screen">
//         <div className="m-4 mx-auto max-w-screen-lg rounded-md border border-gray-100 text-gray-600 shadow-md">
//           <div className="relative flex h-full flex-col text-gray-600 md:flex-row">
//             <div className="mx-auto flex items-center px-5 pt-1 md:p-8">
//               <div className="bg-gray-300 h-[100%] w-full max-w-full rounded-md relative">
//                 {/* Shimmer effect */}
//                 <div className="h-60 w-60 bg-gray-300 rounded-t-xl"></div>{" "}
//               </div>
//             </div>
//             <div className="relative p-8 md:w-4/6">
//               <div className="flex flex-col md:flex-row">
//                 <h2 className="mb-2 text-2xl font-black bg-gray-300 h-8 w-1/2 rounded-lg"></h2>
//                 <span className="ml-2 text-xs uppercase bg-gray-300 h-6 w-24 rounded-lg"></span>
//               </div>
//               <p className="mt-3 font-sans text-md tracking-normal bg-gray-300 h-16 rounded-lg"></p>
//               <div className="flex flex-col md:flex-row md:items-end">
//                 <p className="mt-6 text-4xl font-black bg-gray-300 h-12 w-24 rounded-lg"></p>
//                 <span className="ml-2 text-sm uppercase line-through bg-gray-300 h-6 w-16 rounded-lg"></span>{" "}
//                 <span className="ml-2 text-sm uppercase bg-gray-300 h-6 w-24 rounded-lg"></span>
//               </div>
//               <div className="mt-8 flex flex-col sm:flex-row">
//                 <button className="mr-2 mb-4 flex cursor-not-allowed items-center justify-center rounded-md bg-gray-300 h-10 w-24 text-center text-white transition duration-150 ease-in-out">
//                   {/* Add To Cart */}
//                 </button>
//                 <button className="mr-2 mb-4 flex cursor-not-allowed items-center justify-center rounded-md border h-10 w-24 text-center text-gray-500 transition duration-150 ease-in-out"></button>
//               </div>
//               <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-gray-200 h-8 w-32"></div>
//               <br />
//               <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-gray-200 h-8 w-8"></div>

//               <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-gray-200 h-8 w-80"></div>
//               <br />
//               <br />
//               <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-gray-200 h-8 w-8"></div>

//               <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 h-8 w-120"></div>
//               <br />
//               <br />
//               <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-gray-200 h-8 w-8"></div>

//               <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-gray-200 h-8 w-144"></div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

export default function DiscriptionPageLoader() {
  return (
    <>
      <div className="flex flex-col mt-8 md:flex-row items-start justify-center px-6 md:px-16 animate-pulse">
        {/* Left Section - Large Image */}
        <div className="w-full md:w-1/2 mt-12 h-80 bg-gray-300 rounded-lg"></div>

        {/* Right Section - Text Content */}
        <div className="w-full md:w-1/2 mt-6 p-6 space-y-4">
          {/* Title */}
          <div className="h-10 bg-gray-300 rounded w-3/4"></div>

          {/* Description */}
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-8 mt-8 bg-gray-300 rounded w-5/6"></div>

          {/* Price */}
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>

          {/* Text Line */}
          <div className="h-4 bg-gray-300 rounded w-2/3"></div>

          {/* Button */}
          <div className="h-12 mt-8 bg-gray-400 rounded w-1/3"></div>

          {/* Title 2 */}
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>

          {/* Title 3 */}
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
      </div>
    </>
  );
}
