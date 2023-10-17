export default function TableIndid() {
  let array = [1, 2, 3, 4, 5, 6];
  return (
    <div className="w-[80%] ] mx-auto  p-4">
      <div className="bg-white shadow-md rounded my-6">
        <table className="min-w-max w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-8 px-6 text-left"> Loading..... </th>
              <th className="py-6 px-6 text-left"> </th>
              <th className="py-6 px-6 text-center"> </th>
              <th className="py-6 px-6 text-center"> </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {array.map((ele, i) => (
              <tr
                key={i}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-6 px-6 text-left"> </td>
                <td className="py-6 px-6 text-left"> </td>
                <td className="py-6 px-6 text-center"> </td>
                <td className="py-6 px-6 text-center"> </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
