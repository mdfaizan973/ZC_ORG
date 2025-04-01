import { useState, useEffect, useRef } from "react"

const ProProductCategoryCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const carouselRef = useRef(null)
  const [visibleItems, setVisibleItems] = useState(1)

  // Sample data if no products are provided
  const sampleProducts = [
    {
      id: 1,
      category: "Toys",
      title: "Colorful Building Blocks Set for Creative Play",
      image: "/placeholder.svg?height=120&width=120",
      discount_price_inr: 599,
    },
    {
      id: 2,
      category: "Books",
      title: "Adventure Stories Collection for Young Readers",
      image: "/placeholder.svg?height=120&width=120",
      discount_price_inr: 399,
    },
    {
      id: 3,
      category: "Crafts",
      title: "Creative Art Set with Paints and Brushes",
      image: "/placeholder.svg?height=120&width=120",
      discount_price_inr: 799,
    },
    {
      id: 4,
      category: "Games",
      title: "Fun Board Game for Family Game Night",
      image: "/placeholder.svg?height=120&width=120",
      discount_price_inr: 899,
    },
    {
      id: 5,
      category: "Puzzles",
      title: "Animal Kingdom Puzzle with 100 Pieces",
      image: "/placeholder.svg?height=120&width=120",
      discount_price_inr: 499,
    },
    {
      id: 6,
      category: "Outdoor",
      title: "Bubble Blower Machine with Extra Solution",
      image: "/placeholder.svg?height=120&width=120",
      discount_price_inr: 699,
    },
  ]

  const displayProducts = sampleProducts

  // Calculate visible items based on container width
  useEffect(() => {
    const calculateVisibleItems = () => {
      if (carouselRef.current) {
        const containerWidth = carouselRef.current.offsetWidth
        const itemWidth = 380 // Fixed item width (including padding)
        const newVisibleItems = Math.floor(containerWidth / itemWidth)
        setVisibleItems(Math.max(1, newVisibleItems))
      }
    }

    calculateVisibleItems()
    window.addEventListener("resize", calculateVisibleItems)

    return () => {
      window.removeEventListener("resize", calculateVisibleItems)
    }
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    let interval
    if (isAutoPlaying) {
      interval = setInterval(() => {
        handleNext()
      }, 3000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [currentIndex, isAutoPlaying])

  // Scroll to item when currentIndex changes
  useEffect(() => {
    if (carouselRef.current) {
      const itemWidth = 380 // Fixed item width (including padding)
      const scrollAmount = currentIndex * itemWidth
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })
    }
  }, [currentIndex])

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayProducts.length - visibleItems : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= displayProducts.length - visibleItems ? 0 : prev + 1))
  }

  const handleMouseEnter = () => {
    setIsAutoPlaying(false)
  }

  const handleMouseLeave = () => {
    setIsAutoPlaying(true)
  }

  return (
    <div className="max-w-7xl mx-auto">
    <div
      className="relative max-w-full overflow-hidden rounded-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-200">
        <h2 className="text-xl font-bold text-black-600">
          <span className="px-3 py-1 rounded-full">Simmiler Category</span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="bg-white rounded-full p-2 shadow-md hover:bg-yellow-300 transition-all duration-300"
            aria-label="Previous item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="bg-white rounded-full p-2 shadow-md hover:bg-yellow-300 transition-all duration-300"
            aria-label="Next item"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="flex overflow-x-hidden scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {displayProducts.map((product) => (
          <div key={product.id} className="flex-none w-[380px] p-4">
            <div className="flex items-center bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
              {/* Left side - Image */}
              <div className="relative h-[120px] w-[120px] flex-shrink-0 overflow-hidden rounded-l-xl">
                <div className="absolute top-2 left-2 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                  {product.category}
                </div>
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Right side - Content */}
              <div className="flex flex-col p-4 flex-grow">
                <h3 className="font-bold text-lg text-indigo-800 line-clamp-2 mb-2">{product.title}</h3>

                <div className="mt-auto flex items-center justify-between">
                  <div className="bg-red-500 text-white font-bold rounded-lg px-3 py-1 transform rotate-2 shadow-md">
                    ₹{product.discount_price_inr}
                  </div>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-1 px-3 rounded-lg transform hover:scale-105 transition-transform duration-300">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


    </div>
     </div>
  )
}

export default ProProductCategoryCarousel

