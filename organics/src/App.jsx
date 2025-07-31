// import { useState } from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";
// import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import { fetchData, hasToken, postData } from "./utils/utils";
import { baseUrl2 } from "../config/confg";

function App() {
  // App.js or Layout.jsx
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        let latestOrders;
        if (hasToken()) {
          latestOrders = await fetchData(`${baseUrl2}/orders`);
        }
        // make the api for current user above

        // Filter orders that actually need an update
        const ordersToUpdate = latestOrders.filter(
          (order) =>
            order.order_status === "Processing" ||
            order.order_status === "Shipped" ||
            (order.order_status === "Delivered" &&
              order.payment_status !== "paid")
        );

        if (ordersToUpdate.length === 0) {
          console.log("All orders are up to date. Skipping API calls.");
          return; // Exit early to prevent unnecessary API calls
        }

        // Update only the necessary orders
        await Promise.all(
          ordersToUpdate.map(async (order) => {
            let updatedData = {};

            if (order.order_status === "Processing") {
              updatedData.order_status = "Shipped";
            } else if (order.order_status === "Shipped") {
              updatedData.order_status = "Delivered";
            } else if (
              order.order_status === "Delivered" &&
              order.payment_status !== "paid"
            ) {
              updatedData.payment_status = "paid";
            }

            // Send request only if there's an update needed
            if (Object.keys(updatedData).length > 0) {
              await postData(
                `${baseUrl2}/orders/${order._id}`,
                updatedData,
                "PUT",
                false
              );
            }
          })
        );

        console.log("Only required orders updated!");
      } catch (error) {
        console.error("Update failed:", error);
      }
    }, 20 * 1000); // Runs every 20 seconds

    return () => clearInterval(interval);
  }, []);

  const [showIntitlLoder, setInitialLoader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setInitialLoader(false);
    }, 2000);
  }, []);
  return (
    <>
      {showIntitlLoder ? (
        <WebSiteInitialLoader />
      ) : (
        <>
          <ToastContainer />
          <ScrollToTop />
          <AllRoutes />
          <Footer />

          <ChatBot />
        </>
      )}
    </>
  );
}

export default App;

const WebSiteInitialLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4; // Increment to reach 100% in ~2 seconds
      });
    }, 80);

    // Hide loader after 2 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center justify-center p-8 rounded-lg">
        <div className="w-32 h-32 mb-6 overflow-hidden rounded-full border-4 border-green-500 p-1">
          <img
            className="w-full h-full object-cover rounded-full"
            src="https://i.pinimg.com/736x/a6/19/71/a619716b7be42ceaf64215ec4b7ad1ed.jpg"
            alt="Loading"
          />
        </div>

        <h2 className="text-2xl font-bold text-green-600 mb-4">
          Welcome to Our Website
        </h2>

        <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-2 text-green-600 font-medium">
          Loading... {progress}%
        </p>
      </div>
    </div>
  );
};

// chatbot ai

export const ChatBot = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const apiKey = "AIzaSyCmZo3BPYdF1bVl7bvXC_Zbo9xQENxWxBs";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchData = async (inputMessage) => {
    const newQuestionsMessage = `You are a helpful assistant. Your job is to answer only questions related to food, organic products, healthy living, or greetings.

If the user's input has spelling mistakes, please correct the spelling silently before answering.

If the corrected input is still not related to the allowed topics, reply: "I can't answer that."

Respond in exactly 20 to 25 words.

User's question: "${inputMessage}"`;

    const contentData = {
      contents: [
        {
          parts: [{ text: newQuestionsMessage }],
        },
      ],
    };

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
        contentData,
        { headers: { "Content-Type": "application/json" } }
      );

      const current = new Date();
      const userMessage = {
        id: Date.now(),
        content: inputMessage.trim(),
        role: "user",
        timestamp: current,
      };

      const aiResponse = {
        id: Date.now() + 1,
        content: res.data.candidates[0].content.parts[0].text,
        role: "bot",
        timestamp: current,
      };

      setMessages((prev) => [...prev, userMessage, aiResponse]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      fetchData(inputMessage);
      setInputMessage("");
    }
  };

  return (
    <>
      {showChatBox && (
        <div
          className={`fixed ${
            isMobile
              ? "w-[90%] right-[5%] bottom-[100px]"
              : "w-[350px] right-5 bottom-[100px]"
          } h-[450px] bg-white border border-green-300 rounded-xl shadow-lg flex flex-col z-50`}
        >
          {/* Header */}
          <div className="bg-green-500 text-white text-center py-3 font-semibold rounded-t-xl">
            💬 Chat with me
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-3 py-2 bg-green-50 space-y-2 text-sm flex flex-col">
            {messages.length > 0 ? (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.role === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[75%] px-4 py-2 rounded-xl whitespace-pre-wrap ${
                      msg.role === "bot"
                        ? "bg-green-100 text-left"
                        : "bg-teal-100 text-right"
                    }`}
                  >
                    {msg.role === "bot"
                      ? `🌱 ${msg.content}`
                      : `${msg.content} 👤`}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-start">
                <div className="bg-green-100 p-3 rounded-xl w-fit text-sm">
                  🌱 Ask me anything about organic or healthy living!
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <div className="flex items-center border-t border-green-200 p-2 bg-green-100">
            <textarea
              rows={1}
              placeholder="Type a message..."
              className="flex-1 resize-none px-3 py-2 text-sm border border-green-300 rounded-lg outline-none focus:ring-2 focus:ring-green-300"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleClick(e);
                }
              }}
            />
            <button
              onClick={handleClick}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          onClick={() => setShowChatBox(!showChatBox)}
          className="w-[70px] h-[70px] rounded-full border-2 border-green-500 shadow-lg bg-white overflow-hidden hover:scale-110 transition animate-bounce"
        >
          <img
            src="https://i.pinimg.com/originals/ca/bd/a6/cabda6db3c719d0ea30b1649fd00e891.gif"
            alt="bot"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
    </>
  );
};

// !fruits, vegetables, grains, dairy products and meat
// ?category=vegetables

//1
// !fruits
// Apples
// Bananas
// Strawberries
// Blueberries
// Oranges
// Grapes
// Kiwi
// Peaches
// Pears
// Plums
// Cherries
// Mangoes

// !vegetables
// Spinach
// Carrots
// Broccoli
// Tomatoes
// Bell Peppers
// Kale
// Cucumbers
// Zucchini
// Green Beans
// Eggplant
// Radishes
// Swiss Chard

// !grains
// Wheat Bread
// Rice Cakes
// Quinoa Salad
// Oatmeal
// Barley Soup
// Spaghetti
// Corn Tortillas
// Buckwheat Pancakes
// Millet Porridge
// Rye Crackers
// Couscous Salad
// Farro Risotto

// !dairy
// Milk
// Butter
// Cheese
// Yogurt
// Sour Cream
// Cottage Cheese
// Cream Cheese
// Whipping Cream
// Ice Cream
// Evaporated Milk
// Condensed Milk
// Ghee
