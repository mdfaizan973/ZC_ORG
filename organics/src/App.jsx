// import { useState } from "react";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import AllRoutes from "./Components/AllRoutes";
import ScrollToTop from "./Components/ScrollToTop";
import Footer from "./Components/Footer";
// import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";
import { fetchData, hasToken, postData } from "./utils/utils";
import { baseUrl2 } from "../config/confg";
import { GoogleGenAI } from "@google/genai";
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
              order.payment_status !== "paid"),
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
                false,
              );
            }
          }),
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

// Chatbot AI

export const ChatBot = () => {
  const [showChatBox, setShowChatBox] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const apiKey = "AQ.Ab8RN6IbRbszrOS8kKWjB_4WzTbkVSD3rme3AOYSCDpF8i78Zg";
  // const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading]);

  const fetchData = async (messageText) => {
    const trimmedMessage = messageText.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    const userMessage = {
      id: `${Date.now()}-user`,
      content: trimmedMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (!apiKey) {
        throw new Error(
          "Gemini API key is missing. Add VITE_GEMINI_API_KEY to .env.local.",
        );
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `
You are a helpful assistant. Answer only questions related
to food, organic products, healthy living, or greetings.

If the user's input has spelling mistakes, correct them
silently before answering.

If the question can be answered as a list, use clear
bullet points or numbered lists.

If the question is unrelated to these topics, reply:
"I can't answer that."

Respond in exactly 20 to 25 words.

User's question: "${trimmedMessage}"
`;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
      });

      const aiResponse = {
        id: `${Date.now()}-bot`,
        content: response.text?.trim() || "Sorry, no response was generated.",
        role: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Gemini API error:", error);

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          content: "Sorry, something went wrong. Please try again.",
          role: "bot",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = async (e) => {
    e?.preventDefault();

    const trimmedMessage = inputMessage.trim();

    if (!trimmedMessage || isLoading) {
      return;
    }

    setInputMessage("");

    await fetchData(trimmedMessage);
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
          <div className="bg-green-500 text-white py-3 px-4 font-semibold rounded-t-xl flex justify-between items-center">
            <span>💬 Chat with me</span>

            <button
              type="button"
              onClick={() => setShowChatBox(false)}
              aria-label="Close chat"
              className="text-white text-xl font-bold hover:text-red-200 transition"
            >
              ×
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-3 py-2 bg-green-50 space-y-2 text-sm flex flex-col">
            {messages.length > 0 ? (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "bot" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-full ${
                      msg.role === "bot" ? "justify-start" : "justify-end"
                    }`}
                  >
                    {/* Bot icon (left) */}
                    {msg.role === "bot" && (
                      <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border-2 border-green-400 text-sm">
                        🌱
                      </div>
                    )}

                    {/* Message bubble */}
                    <div
                      className={`max-w-[75%] px-4 py-2 rounded-xl whitespace-pre-wrap break-words text-sm ${
                        msg.role === "bot"
                          ? "bg-green-100 text-left font-medium"
                          : "bg-teal-100 text-right"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* User icon (right) */}
                    {msg.role === "user" && (
                      <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border-2 border-teal-400 text-sm">
                        👤
                      </div>
                    )}
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

            {/* AI Loading Indicator */}
            {isLoading && (
              <div
                className="flex justify-start"
                role="status"
                aria-live="polite"
                aria-label="AI is generating a response"
              >
                {/* Bot icon */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center rounded-full border-2 border-green-400 text-sm">
                  🌱
                </div>

                {/* Typing bubble */}
                <div className="bg-green-100 px-4 py-3 rounded-xl flex items-center gap-2">
                  <span className="text-xs text-green-800">Thinking</span>

                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:0ms]" />

                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:150ms]" />

                    <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </div>
            )}

            {/* Auto-scroll target */}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer */}
          <form
            onSubmit={handleClick}
            className="flex items-center border-t border-green-200 p-2 bg-green-100"
          >
            <textarea
              rows={1}
              placeholder="Type a message..."
              aria-label="Type your message"
              className="flex-1 min-w-0 resize-none px-3 py-2 text-sm border border-green-300 rounded-lg outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-60"
              value={inputMessage}
              disabled={isLoading}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();

                  if (!isLoading && inputMessage.trim()) {
                    handleClick(e);
                  }
                }
              }}
            />

            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              aria-label="Send message"
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded-lg font-bold hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "➤"
              )}
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={() => setShowChatBox((prev) => !prev)}
          aria-label={showChatBox ? "Close chat" : "Open chat"}
          className="w-[60px] h-[60px] rounded-full border-2 border-green-500 shadow-lg bg-white overflow-hidden hover:scale-110 transition animate-bounce"
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
