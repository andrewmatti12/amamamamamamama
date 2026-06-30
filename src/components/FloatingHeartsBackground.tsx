import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
  opacity: number
}

const FloatingHeartsBackground = () => {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    const createHeart = (): Heart => ({
      id: Math.random(),
      x: Math.random() * 100,
      size: Math.random() * 20 + 10,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.3 + 0.1,
    })

    const initialHearts = Array.from({ length: 15 }, createHeart)
    setHearts(initialHearts)

    const interval = setInterval(() => {
      setHearts(prev => {
        const newHearts = [...prev]
        const indexToReplace = Math.floor(Math.random() * newHearts.length)
        newHearts[indexToReplace] = createHeart()
        return newHearts
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="absolute text-rose-300"
          style={{
            left: `${heart.x}%`,
            fontSize: heart.size,
            opacity: heart.opacity,
          }}
          initial={{ y: '110vh', rotate: 0 }}
          animate={{ y: '-10vh', rotate: 360 }}
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
  )
}

export default FloatingHeartsBackground
