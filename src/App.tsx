import React, { useState } from 'react'
import Timer from './components/Timer'
import DurationSettings from './components/DurationSettings'
import TaskList, { Task } from './components/TaskList'

export default function App() {
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [tasks, setTasks] = useState<Task[]>([])
  const [sessionCount, setSessionCount] = useState(0)

  const handleSessionComplete = () => {
    setSessionCount((prev) => prev + 1)
    // Find the first incomplete task and increment its pomodoros
    setTasks((prevTasks) => {
      const incompleteTask = prevTasks.find(
        (task) => task.completedPomodoros < task.estimatedPomodoros
      )
      if (incompleteTask) {
        return prevTasks.map((task) =>
          task.id === incompleteTask.id
            ? { ...task, completedPomodoros: task.completedPomodoros + 1 }
            : task
        )
      }
      return prevTasks
    })
  }

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    setTasks((prev) => [
      ...prev,
      { ...task, id: Date.now().toString() },
    ])
  }

  const handleUpdateTask = (id: string, pomodoros: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completedPomodoros: pomodoros } : task
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Pomodoro Timer</h1>
        
        <div className="mb-6">
          <div className="bg-white rounded-lg shadow-lg p-4 text-center">
            <span className="text-lg font-medium text-gray-600">
              Total Sessions Completed: <span className="text-blue-600 font-bold">{sessionCount}</span>
            </span>
          </div>
        </div>

        <div className="mb-6">
          <DurationSettings
            workDuration={workDuration}
            breakDuration={breakDuration}
            onWorkChange={setWorkDuration}
            onBreakChange={setBreakDuration}
          />
        </div>

        <div className="mb-6">
          <Timer
            workDuration={workDuration}
            breakDuration={breakDuration}
            onSessionComplete={handleSessionComplete}
          />
        </div>

        <TaskList
          tasks={tasks}
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
        />
      </div>
    </div>
  )
}