export default function ProductsCarload() {
  return (
    <div>
      {" "}
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white w-72 shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl"
          >
            <div className="h-60 w-72 bg-gray-300 rounded-t-xl"></div>
            <div className="px-4 py-3 w-72">
              <div className="center relative inline-block select-none whitespace-nowrap rounded-lg bg-gray-300 py-1 px-2 align-baseline font-sans text-xs font-bold uppercase leading-none text-gray-300">
                <div className="mt-px">Details</div>
              </div>
              <p className="text-lg font-bold text-gray-300 truncate block capitalize"></p>
              <div className="flex items-center">
                <p className="text-lg font-semibold text-gray-300 cursor-auto my-3"></p>
                <del></del>
                <div className="ml-auto">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="ml-auto">
                    <div className="bg-gray-300 hover:bg-gray-400 text-gray-300 font-bold py-2 px-4 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
