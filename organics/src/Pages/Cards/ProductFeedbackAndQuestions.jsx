import { useEffect, useState } from "react";
import {
  FaStar,
  FaUserCircle,
  FaRegCommentDots,
  FaPaperPlane,
  FaRegCalendarAlt,
  FaAward,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { fetchData, getSessionData, postData } from "../../utils/utils";
import { baseUrl2 } from "../../../config/confg";

export default function ProductFeedbackAndQuestions({ product }) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("prod_reviews");

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Feedback Section */}
      <div className="flex max-w-md mb-1">
        <button
          className={`w-1/3 py-2 text-center font-semibold ${
            activeTab === "prod_reviews"
              ? "border-b-2 border-green-600 text-green-600"
              : "border-b-2 text-gray-500"
          }`}
          onClick={() => setActiveTab("prod_reviews")}
        >
          Product Reviews
        </button>
        <button
          className={`w-1/3 py-2 text-center font-semibold ${
            activeTab === "q_and_a"
              ? "border-b-2 border-green-600 text-green-600"
              : "border-b-2 text-gray-500"
          }`}
          onClick={() => setActiveTab("q_and_a")}
        >
          Q&A
        </button>
      </div>
      {activeTab == "prod_reviews" && (
        <ProductsReviews paramId={id} product={product} />
      )}
      {activeTab == "q_and_a" && (
        <QuestionAndAnswers paramId={id} product={product} />
      )}
    </div>
  );
}

const cardClass =
  "bg-white rounded-lg shadow-sm px-4 py-2 border border-gray-100";

const ProductsReviews = ({ paramId, product }) => {
  // State for feedback form
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbacks, setFeedbacks] = useState([]);
  console.log(paramId);
  // Handle feedback submission
  const handleFeedbackSubmit = async () => {
    if (feedbackText.trim() === "" || rating === 0) return;

    const newFeedback = {
      user_name: getSessionData("name"),
      user_id: getSessionData("_id"),
      product_id: product._id,
      user_feedback_to_prod: feedbackText,
      user_prod_rating: rating,
      user_profile_img: getSessionData("profile_image"),
      user_gender: getSessionData("gender"),
      saler_name: product.saler_name,
      saler_id: product.saler_id,
    };

    await postData(`${baseUrl2}/product-feedback`, newFeedback);
    loadFeedback();
    setFeedbackText("");
    setRating(0);
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  const loadFeedback = async () => {
    const feedbackData = await fetchData(
      `${baseUrl2}/product-feedback/${paramId}`
    );

    setFeedbacks(feedbackData);
  };
  console.log("================================", product);
  return (
    <>
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-green-800 flex items-center">
            <FaAward className="mr-2 h-5 w-5 text-green-600" />
            Customer Reviews
          </h2>
        </div>

        {/* Feedback Form */}
        <div className={`${cardClass} mb-10`}>
          <div className="flex items-center mb-2">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mr-4">
              <FaUserCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800">
              Share Your Experience
            </h3>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              How would you rate this product?
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    star <= rating
                      ? "bg-yellow-500 text-white transform scale-105"
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                  }`}
                >
                  <FaStar
                    className={`w-4 h-4 ${star <= rating ? "fill-white" : ""}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Your Review
            </label>
            <div className="relative">
              <textarea
                placeholder="Share your thoughts about this product..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full min-h-[100px] p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute bottom-3 right-3 text-gray-400 text-sm">
                {feedbackText.length} / 500
              </div>
            </div>
          </div>

          <button
            onClick={handleFeedbackSubmit}
            disabled={feedbackText.trim() === "" || rating === 0}
            className={`px-2 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
              feedbackText.trim() === "" || rating === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-md hover:from-green-600 hover:to-green-700"
            }`}
          >
            <FaPaperPlane className="w-4 h-4 mr-2" />
            Submit Review
          </button>
        </div>

        {/* Feedback Display */}
        <div className="space-y-2">
          {feedbacks.map((feedback) => (
            <div
              key={feedback._id}
              className={`${cardClass} transform transition-all duration-200 hover:shadow-md`}
            >
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                    <FaUserCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center mb-1">
                    <h4 className="font-bold text-gray-800 mr-2">
                      {feedback.user_name}
                    </h4>
                    <div className="flex ml-auto">
                      <FaRegCalendarAlt className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        {new Date(feedback.user_feedback_date).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="flex mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < feedback.user_prod_rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 mb-1 leading-relaxed">
                    {feedback.user_feedback_to_prod}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {feedbacks.length > 3 && (
          <div className="mt-8 text-center">
            <button className="px-6 py-3 bg-white border border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors duration-300">
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const QuestionAndAnswers = ({ paramId, product }) => {
  // State for question form
  const [questionText, setQuestionText] = useState("");
  const [questions, setQuestions] = useState([
    {
      id: 1,
      name: "Michael Johnson",
      date: new Date(2023, 4, 20),
      text: "Does this product come with a warranty?",
      answer: "You will get the answer soon.",
      likes: 15,
    },
    {
      id: 2,
      name: "Emily Wilson",
      date: new Date(2023, 5, 10),
      text: "Is this product compatible with Model X-200?",
      answer: "You will get the answer soon.",
      likes: 8,
    },
    {
      id: 3,
      name: "David Thompson",
      date: new Date(2023, 6, 5),
      text: "Can I use these headphones while working out? Are they sweat-resistant?",
      answer: "You will get the answer soon.",
      likes: 22,
    },
  ]);

  // Handle question submission
  const handleQuestionSubmit = () => {
    if (questionText.trim() === "") return;

    const newQuestion = {
      id: questions.length + 1,
      name: "Current User",
      date: new Date(),
      text: questionText,
      answer: "You will get the answer soon.",
      likes: 0,
    };

    setQuestions([newQuestion, ...questions]);
    setQuestionText("");
  };
  const [showAll, setShowAll] = useState(false);
  const visibleQuestions = showAll ? questions : questions.slice(0, 3);
  const saler_name = "Faizan";

  return (
    <>
      {/* Questions Section */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-green-800 flex items-center">
            <FaRegCommentDots className="mr-2 h-5 w-5 text-green-600" />
            Questions & Answers
          </h2>
        </div>

        {/* Question Form */}
        <div className={`${cardClass} mb-10`}>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center mr-4">
              <FaUserCircle className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800">
              Ask a Question to{" "}
              <span className="text-gray-400 text-sm italic">
                ({saler_name})
              </span>
            </h3>
          </div>

          <div className="mb-6">
            <div className="relative">
              <textarea
                placeholder="What would you like to know about this product?"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full min-h-[100px] p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute bottom-3 right-3 text-gray-400 text-sm">
                {questionText.length} / 500
              </div>
            </div>
          </div>

          <button
            onClick={handleQuestionSubmit}
            disabled={questionText.trim() === ""}
            className={`px-2 py-2 rounded-lg font-medium flex items-center justify-center transition-all duration-300 ${
              questionText.trim() === ""
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:shadow-md hover:from-green-600 hover:to-green-700"
            }`}
          >
            <FaPaperPlane className="w-4 h-4 mr-2" />
            Submit Question
          </button>
        </div>

        {/* Questions Display */}
        <div className="space-y-2">
          {visibleQuestions.map((question) => (
            <div key={question.id} className={`${cardClass}`}>
              {/* Question */}
              <div className="flex items-start mb-2">
                <div className="mr-4 flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                    <FaUserCircle className="w-7 h-7 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center mb-1">
                    <h4 className="font-bold text-gray-800 mr-2">
                      {question.name}
                    </h4>
                    <div className="flex ml-auto">
                      <FaRegCalendarAlt className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">
                        {getTimeAgo(question.date)}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed font-medium">
                    {question.text}
                  </p>
                </div>
              </div>

              {/* Answer */}
              {question.answer && (
                <div className="ml-16 p-3  bg-green-50 rounded-xl border-l-4 border-green-500">
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                        <FaRegCommentDots className="w-5 h-5 text-green-700" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h5 className="font-bold text-green-800 flex items-center">
                          Seller
                        </h5>
                      </div>
                      <p className="text-gray-700">{question.answer}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {questions.length > 3 && (
          <div className="mt-8 text-center">
            <button
              className="px-6 py-3 bg-white border border-green-500 text-green-600 rounded-lg font-medium hover:bg-green-50 transition-colors duration-300"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "View Less" : "View All Questions"}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Get time ago string
const getTimeAgo = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";

  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";

  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";

  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";

  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";

  return Math.floor(seconds) + " seconds ago";
};
