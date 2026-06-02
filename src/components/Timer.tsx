import React, { useState, useEffect, useRef } from 'react'

interface TimerProps {
  workDuration: number
  breakDuration: number
  onSessionComplete: () => void
}

export default function Timer({ workDuration, breakDuration, onSessionComplete }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(workDuration * 60)
  const [isRunning, setIsRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    setTimeLeft(workDuration * 60)
  }, [workDuration])

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false)
            if (isBreak) {
              setIsBreak(false)
              setTimeLeft(workDuration * 60)
            } else {
              setIsBreak(true)
              setTimeLeft(breakDuration * 60)
              onSessionComplete()
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isRunning, isBreak, workDuration, breakDuration, onSessionComplete])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleStart = () => setIsRunning(true)
  const handlePause = () => setIsRunning(false)
  const handleReset = () => {
    setIsRunning(false)
    setIsBreak(false)
    setTimeLeft(workDuration * 60)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">
        {isBreak ? 'Break Time' : 'Work Time'}
      </h2>
      <div className="text-6xl font-mono font-bold text-gray-800 mb-6">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-center gap-4">
        {!isRunning ? (
          <button
            onClick={handleStart}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Start
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Pause
          </button>
        )}
        <button
          onClick={handleReset}
          className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
        >
          Reset
        </button>
      </div>
    </div>
  )
}