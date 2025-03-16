export default function ThankyouPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 mb-2 text-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-lg">
          <img
            className="mx-auto mb-4"
            width={300}
            height={300}
            src="https://i.pinimg.com/originals/74/2f/7e/742f7ea29cbfd7fd3f4848f17e621070.gif"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 mb-6">
            Your order has been placed successfully. We appreciate your trust in
            us! A confirmation email has been sent.
          </p>
          <button
            onClick={() => (window.location.href = "/")}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-xl transition duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </>
  );
}
