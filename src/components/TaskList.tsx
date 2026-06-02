import React, { useState } from 'react'

export interface Task {
  id: string
  title: string
  estimatedPomodoros: number
  completedPomodoros: number
}

interface TaskListProps {
  tasks: Task[]
  onAddTask: (task: Omit<Task, 'id'>) => void
  onUpdateTask: (id: string, pomodoros: number) => void
}

export default function TaskList({ tasks, onAddTask, onUpdateTask }: TaskListProps) {
  const [title, setTitle] = useState('')
  const [estimated, setEstimated] = useState(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (title.trim()) {
      onAddTask({ title: title.trim(), estimatedPomodoros: estimated, completedPomodoros: 0 })
      setTitle('')
      setEstimated(1)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Tasks</h3>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <input
          type="number"
          min="1"
          max="10"
          value={estimated}
          onChange={(e) => setEstimated(Number(e.target.value))}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {tasks.map((task) => {
          const isComplete = task.completedPomodoros >= task.estimatedPomodoros
          return (
            <li
              key={task.id}
              className={`flex items-center justify-between p-3 rounded-lg ${isComplete ? 'bg-green-50' : 'bg-gray-50'}`}
            >
              <div className="flex-1">
                <span className={`font-medium ${isComplete ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {task.title}
                </span>
                <span className="text-sm text-gray-500 ml-2">
                  ({task.completedPomodoros}/{task.estimatedPomodoros}) pomodoros
                </span>
              </div>
              {isComplete && (
                <span className="text-green-600 font-semibold">Complete!</span>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}