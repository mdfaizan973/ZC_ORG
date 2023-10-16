export default function AdminDashBoard() {
  return (
    <div>
      {" "}
      <div className="min-h-screen bg-gray-100">
        <div className="flex">
          {/* Main Content */}
          <div className="flex-1 p-4">
            {/* Header */}
            <header className="mb-4">
              <div className="text-4xl font-bold text-gray-500">
                Admin Dashboard
              </div>
            </header>

            {/* Main Content Area */}
            <main className="bg-white p-4 w-[80%] mx-auto rounded shadow-md">
              Main content goes here
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
