'use client'

import { useState, useEffect } from 'react'
import { format, set } from 'date-fns'
import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CustomTimePickerProps {
  value: Date
  onChange: (date: Date) => void
  className?: string
}

export default function CustomTimePicker({ value, onChange, className }: CustomTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedHour, setSelectedHour] = useState(format(value, 'hh'))
  const [selectedMinute, setSelectedMinute] = useState(format(value, 'mm'))
  const [selectedPeriod, setSelectedPeriod] = useState(format(value, 'a'))

  useEffect(() => {
    setSelectedHour(format(value, 'hh'))
    setSelectedMinute(format(value, 'mm'))
    setSelectedPeriod(format(value, 'a'))
  }, [value])

  const updateTime = (hour: string, minute: string, period: string) => {
    let numHour = parseInt(hour)
    if (period === 'PM' && numHour !== 12) numHour += 12
    if (period === 'AM' && numHour === 12) numHour = 0

    const newDate = set(value, {
      hours: numHour,
      minutes: parseInt(minute)
    })
    onChange(newDate)
  }

  const hours = Array.from({ length: 12 }, (_, i) => String((i + 1)).padStart(2, '0'))
  const minutes = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'))

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full p-2 bg-white border-2 border-black rounded",
          className
        )}
      >
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span className="text-xl font-mono">
            {selectedHour}:{selectedMinute} {selectedPeriod}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute z-20 w-[300px] mt-1 bg-white border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex">
            {/* Hours */}
            <div className="flex-1 max-h-[300px] overflow-y-auto border-r-2 border-black">
              {hours.map((hour) => (
                <button
                  key={hour}
                  className={cn(
                    "w-full p-3 text-center hover:bg-blue-100 transition-colors",
                    selectedHour === hour && "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                  onClick={() => {
                    setSelectedHour(hour)
                    updateTime(hour, selectedMinute, selectedPeriod)
                  }}
                >
                  {hour}
                </button>
              ))}
            </div>

            {/* Minutes */}
            <div className="flex-1 max-h-[300px] overflow-y-auto border-r-2 border-black">
              {minutes.map((minute) => (
                <button
                  key={minute}
                  className={cn(
                    "w-full p-3 text-center hover:bg-blue-100 transition-colors",
                    selectedMinute === minute && "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                  onClick={() => {
                    setSelectedMinute(minute)
                    updateTime(selectedHour, minute, selectedPeriod)
                  }}
                >
                  {minute}
                </button>
              ))}
            </div>

            {/* AM/PM */}
            <div className="flex-1">
              {['AM', 'PM'].map((period) => (
                <button
                  key={period}
                  className={cn(
                    "w-full p-3 text-center hover:bg-blue-100 transition-colors",
                    selectedPeriod === period && "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                  onClick={() => {
                    setSelectedPeriod(period)
                    updateTime(selectedHour, selectedMinute, period)
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

