import { useState, useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import HeartIcon from './HeartIcon'

interface QuestionScreenProps {
  onAccept: () => void
}

const QuestionScreen = ({ onAccept }: QuestionScreenProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState<{ x: number; y: number } | null>(null)
  const [initialNoPosition, setInitialNoPosition] = useState<{ x: number; y: number } | null>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  const moveNoButton = useCallback(() => {
    // Capture initial position on first move
    if (!initialNoPosition && noButtonRef.current) {
      const rect = noButtonRef.current.getBoundingClientRect()
      setInitialNoPosition({ x: rect.left, y: rect.top })
    }

    const padding = 80
    const buttonWidth = 180
    const buttonHeight = 60

    const maxX = window.innerWidth - buttonWidth - padding
    const maxY = window.innerHeight - buttonHeight - padding

    const newX = Math.max(padding, Math.random() * maxX)
    const newY = Math.max(padding, Math.random() * maxY)

    setNoButtonPosition({ x: newX, y: newY })
  }, [initialNoPosition])

  const handleYesClick = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 }

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        clearInterval(interval)
        return
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ff6b6b', '#ffd700', '#ff85a2'],
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff69b4', '#ff1493', '#ff6b6b', '#ffd700', '#ff85a2'],
      })
    }, 250)

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff69b4', '#ff1493', '#ff6b6b', '#ffd700', '#ff85a2'],
    })

    setTimeout(onAccept, 1500)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative hearts */}
      <motion.div
        className="absolute top-10 left-10 text-rose-300 text-4xl md:text-6xl"
        animate={{ y: [0, -10, 0], rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        💕
      </motion.div>
      <motion.div
        className="absolute top-20 right-10 text-rose-300 text-3xl md:text-5xl"
        animate={{ y: [0, -15, 0], rotate: [5, -5, 5] }}
        transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
      >
        💗
      </motion.div>

      {/* Main content */}
      <motion.div
        className="text-center max-w-2xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        {/* Heart icon */}
        <motion.div
          className="mb-6"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <HeartIcon className="w-20 h-20 md:w-28 md:h-28 mx-auto text-rose-500" />
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-script text-5xl md:text-7xl lg:text-8xl text-rose-600 mb-4 drop-shadow-lg"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.3 }}
        >
          Do you love Dora?
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-elegant text-lg md:text-xl text-rose-500/80 mb-8 italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Yes or No? ✨
        </motion.p>

        {/* Romantic image */}
        <motion.div
          className="mt-8 mb-10 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto rounded-full overflow-hidden border-4 border-rose-300 shadow-2xl shadow-rose-200/50">
            <img
              src={import.meta.env.BASE_URL + "Image.jpeg"}
              alt="Dora"
              className="w-full h-full object-cover"
            />
            {/* Shimmer overlay */}
            <div className="absolute inset-0 shimmer" />
          </div>

          {/* Decorative sparkles */}
          <motion.span
            className="absolute -top-2 -right-2 text-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ✨
          </motion.span>
          <motion.span
            className="absolute -bottom-2 -left-2 text-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            ✨
          </motion.span>
        </motion.div>

        {/* Buttons container */}
        <motion.div
          className="flex gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {/* Yes Button */}
          <motion.button
            onClick={handleYesClick}
            className="px-12 py-4 md:px-16 md:py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-elegant text-xl md:text-2xl rounded-full shadow-xl hover:shadow-2xl hover:shadow-rose-300/50 relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className="relative z-10">Yes ❤️</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          {/* No Button - inline version OR invisible placeholder */}
          {!noButtonPosition ? (
            <motion.button
              ref={noButtonRef}
              className="px-12 py-4 md:px-16 md:py-5 bg-gray-200 text-gray-600 font-elegant text-xl md:text-2xl rounded-full shadow-lg"
              onMouseEnter={moveNoButton}
              onTouchStart={(e) => {
                e.preventDefault()
                moveNoButton()
              }}
              onMouseDown={moveNoButton}
              onFocus={moveNoButton}
            >
              No 💔
            </motion.button>
          ) : (
            // Invisible placeholder to keep Yes button in place
            <div className="px-12 py-4 md:px-16 md:py-5 font-elegant text-xl md:text-2xl rounded-full invisible">
              No 💔
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* No Button - fixed and sliding after first interaction */}
      {noButtonPosition && initialNoPosition && (
        <motion.button
          className="fixed px-12 py-4 md:px-16 md:py-5 bg-gray-200 text-gray-600 font-elegant text-xl md:text-2xl rounded-full shadow-lg z-50"
          initial={{
            left: initialNoPosition.x,
            top: initialNoPosition.y,
          }}
          animate={{
            left: noButtonPosition.x,
            top: noButtonPosition.y,
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          onMouseEnter={moveNoButton}
          onTouchStart={(e) => {
            e.preventDefault()
            moveNoButton()
          }}
          onMouseDown={moveNoButton}
          onFocus={moveNoButton}
        >
          No 💔
        </motion.button>
      )}
    </motion.div>
  )
}

export default QuestionScreen
