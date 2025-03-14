export default function Loader() {
  return (
    <>
      {/* <div className="flex justify-center items-center h-screen">
        <div className="w-16 h-16 border-4 border-green-500 border-dashed rounded-full animate-spin"></div>
      </div> */}
      <div className="flex justify-center items-center h-[100px]">
        <div className="relative flex justify-center items-center">
          <div className="absolute w-16 h-16 bg-green-500 opacity-75 rounded-full animate-ping"></div>
          <div className="relative w-8 h-8 bg-green-500 rounded-full"></div>
        </div>
      </div>
    </>
  );
}
