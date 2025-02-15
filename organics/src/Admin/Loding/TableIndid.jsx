export default function TableIndid() {
  let array = new Array(6).fill(null);

  return (
    <div className="w-[80%] mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg my-6 overflow-hidden">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-4 px-6 text-left">Loading...</th>
              <th className="py-4 px-6 text-left"></th>
              <th className="py-4 px-6 text-center"></th>
              <th className="py-4 px-6 text-center"></th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {array.map((_, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-6 px-6 text-left">
                  <div className="h-4 w-24 bg-gray-300 rounded-md animate-pulse"></div>
                </td>
                <td className="py-6 px-6 text-left">
                  <div className="h-4 w-32 bg-gray-300 rounded-md animate-pulse"></div>
                </td>
                <td className="py-6 px-6 text-center">
                  <div className="h-4 w-16 bg-gray-300 rounded-md animate-pulse"></div>
                </td>
                <td className="py-6 px-6 text-center">
                  <div className="h-4 w-20 bg-gray-300 rounded-md animate-pulse"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
