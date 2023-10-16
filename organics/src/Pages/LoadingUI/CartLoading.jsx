export default function CartLoading() {
  return (
    <div>
      <div className="mx-auto mt-10 mb-10 max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start animate-pulse"
            >
              <div className="cartimage w-32 h-32 lg:w-20 lg:h-20 xl:w-24 xl:h-24 rounded-xl object-cover bg-gray-300"></div>

              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900 bg-gray-300 h-6"></h2>
                  <span className="text-gray-400 mr-3 uppercase text-xs bg-gray-300 w-20 h-4">
                    .....
                  </span>
                  <p className="mt-1 text-xs text-gray-700 bg-gray-300 h-4"></p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 h-8 w-28"></span>
                    <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 h-8 w-20"></span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-sm bg-gray-300 h-6 w-12"></p>
                    <button>
                      <div className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500 bg-gray-200"></div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700 bg-gray-300 h-4 w-20"></p>
            <p className="text-gray-700 bg-gray-300 h-4 w-20"></p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700 bg-gray-300 h-4 w-20"></p>
            <p className="text-gray-700 bg-gray-300 h-4 w-20"></p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold bg-gray-300 h-6 w-24"></p>
            <div className="">
              <p className="mb-1 text-lg font-bold bg-gray-300 h-6 w-32"></p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-gray-200 py-2 font-medium text-gray-600 hover:bg-gray-300">
            <a className="bg-gray-300 h-8 w-40"></a>
          </button>
        </div>
      </div>
    </div>
  );
}
