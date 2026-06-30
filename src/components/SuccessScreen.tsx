import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HeartIcon from './HeartIcon'

interface FloatingHeart {
  id: number
  x: number
  delay: number
  duration: number
  size: number
}

const SuccessScreen = () => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    const newHearts: FloatingHeart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      duration: Math.random() * 3 + 4,
      size: Math.random() * 24 + 12,
    }))
    setHearts(newHearts)
  }, [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring' }}
    >
      {/* Floating hearts celebration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {hearts.map(heart => (
          <motion.div
            key={heart.id}
            className="absolute text-rose-400"
            style={{
              left: `${heart.x}%`,
              fontSize: heart.size,
            }}
            initial={{ y: '110vh', opacity: 0, rotate: 0 }}
            animate={{ y: '-10vh', opacity: [0, 1, 1, 0], rotate: 360 }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Main success message */}
      <motion.div
        className="text-center max-w-3xl mx-auto"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Animated heart */}
        <motion.div
          className="mb-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.5 }}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            <HeartIcon className="w-24 h-24 md:w-32 md:h-32 mx-auto text-rose-500 drop-shadow-xl" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="font-script text-5xl md:text-7xl lg:text-8xl text-rose-600 mb-8 drop-shadow-lg"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 15, delay: 0.7 }}
        >
          I knew you'd say yes!
        </motion.h1>

        {/* Message */}
        <motion.div
          className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-10 shadow-xl shadow-rose-200/30 border border-rose-100"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.p
            className="font-elegant text-xl md:text-2xl text-rose-700 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            I hope this made you smile, I love you my silly sillyyyyy mawiaaaa :)
          </motion.p>

          <motion.p
            className="font-script text-2xl md:text-3xl text-rose-500 mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            -Love, Dora ❤️
          </motion.p>
        </motion.div>

        {/* Floating hearts row */}
        <motion.div
          className="flex justify-center gap-2 mt-8 text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ delay: 2, duration: 1.5, repeat: Infinity }}
        >
          <span>💕</span>
          <span>💖</span>
          <span>💗</span>
          <span>💓</span>
          <span>💕</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SuccessScreen
