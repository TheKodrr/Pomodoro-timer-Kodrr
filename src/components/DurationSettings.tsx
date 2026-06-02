import React from 'react'

interface DurationSettingsProps {
  workDuration: number
  breakDuration: number
  onWorkChange: (value: number) => void
  onBreakChange: (value: number) => void
}

export default function DurationSettings({ workDuration, breakDuration, onWorkChange, onBreakChange }: DurationSettingsProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">Timer Settings</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Work Duration (min)
          </label>
          <input
            type="number"
            min="1"
            max="60"
            value={workDuration}
            onChange={(e) => onWorkChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Break Duration (min)
          </label>
          <input
            type="number"
            min="1"
            max="30"
            value={breakDuration}
            onChange={(e) => onBreakChange(Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </div>
  )
}