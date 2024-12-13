'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// Extended list of countries with their timezones
const countries = [
  // North America
  { name: 'United States (Eastern)', flag: '🇺🇸', timeZone: 'America/New_York' },
  { name: 'United States (Central)', flag: '🇺🇸', timeZone: 'America/Chicago' },
  { name: 'United States (Mountain)', flag: '🇺🇸', timeZone: 'America/Denver' },
  { name: 'United States (Pacific)', flag: '🇺🇸', timeZone: 'America/Los_Angeles' },
  { name: 'Canada (Eastern)', flag: '🇨🇦', timeZone: 'America/Toronto' },
  { name: 'Canada (Pacific)', flag: '🇨🇦', timeZone: 'America/Vancouver' },
  { name: 'Mexico', flag: '🇲🇽', timeZone: 'America/Mexico_City' },

  // Europe
  { name: 'United Kingdom', flag: '🇬🇧', timeZone: 'Europe/London' },
  { name: 'Ireland', flag: '🇮🇪', timeZone: 'Europe/Dublin' },
  { name: 'France', flag: '🇫🇷', timeZone: 'Europe/Paris' },
  { name: 'Germany', flag: '🇩🇪', timeZone: 'Europe/Berlin' },
  { name: 'Spain', flag: '🇪🇸', timeZone: 'Europe/Madrid' },
  { name: 'Italy', flag: '🇮🇹', timeZone: 'Europe/Rome' },
  { name: 'Netherlands', flag: '🇳🇱', timeZone: 'Europe/Amsterdam' },
  { name: 'Switzerland', flag: '🇨🇭', timeZone: 'Europe/Zurich' },
  { name: 'Sweden', flag: '🇸🇪', timeZone: 'Europe/Stockholm' },
  { name: 'Norway', flag: '🇳🇴', timeZone: 'Europe/Oslo' },
  { name: 'Denmark', flag: '🇩🇰', timeZone: 'Europe/Copenhagen' },
  { name: 'Finland', flag: '🇫🇮', timeZone: 'Europe/Helsinki' },
  { name: 'Poland', flag: '🇵🇱', timeZone: 'Europe/Warsaw' },

  // Asia
  { name: 'Japan', flag: '🇯🇵', timeZone: 'Asia/Tokyo' },
  { name: 'China', flag: '🇨🇳', timeZone: 'Asia/Shanghai' },
  { name: 'South Korea', flag: '🇰🇷', timeZone: 'Asia/Seoul' },
  { name: 'India', flag: '🇮🇳', timeZone: 'Asia/Kolkata' },
  { name: 'Singapore', flag: '🇸🇬', timeZone: 'Asia/Singapore' },
  { name: 'Hong Kong', flag: '🇭🇰', timeZone: 'Asia/Hong_Kong' },
  { name: 'Taiwan', flag: '🇹🇼', timeZone: 'Asia/Taipei' },
  { name: 'Thailand', flag: '🇹🇭', timeZone: 'Asia/Bangkok' },
  { name: 'Vietnam', flag: '🇻🇳', timeZone: 'Asia/Ho_Chi_Minh' },
  { name: 'Indonesia', flag: '🇮🇩', timeZone: 'Asia/Jakarta' },
  { name: 'Malaysia', flag: '🇲🇾', timeZone: 'Asia/Kuala_Lumpur' },
  { name: 'Philippines', flag: '🇵🇭', timeZone: 'Asia/Manila' },

  // Oceania
  { name: 'Australia (Sydney)', flag: '🇦🇺', timeZone: 'Australia/Sydney' },
  { name: 'Australia (Melbourne)', flag: '🇦🇺', timeZone: 'Australia/Melbourne' },
  { name: 'Australia (Brisbane)', flag: '🇦🇺', timeZone: 'Australia/Brisbane' },
  { name: 'Australia (Perth)', flag: '🇦🇺', timeZone: 'Australia/Perth' },
  { name: 'New Zealand', flag: '🇳🇿', timeZone: 'Pacific/Auckland' },

  // South America
  { name: 'Brazil (São Paulo)', flag: '🇧🇷', timeZone: 'America/Sao_Paulo' },
  { name: 'Argentina', flag: '🇦🇷', timeZone: 'America/Argentina/Buenos_Aires' },
  { name: 'Chile', flag: '🇨🇱', timeZone: 'America/Santiago' },
  { name: 'Colombia', flag: '🇨🇴', timeZone: 'America/Bogota' },
  { name: 'Peru', flag: '🇵🇪', timeZone: 'America/Lima' },

  // Africa
  { name: 'South Africa', flag: '🇿🇦', timeZone: 'Africa/Johannesburg' },
  { name: 'Egypt', flag: '🇪🇬', timeZone: 'Africa/Cairo' },
  { name: 'Nigeria', flag: '🇳🇬', timeZone: 'Africa/Lagos' },
  { name: 'Kenya', flag: '🇰🇪', timeZone: 'Africa/Nairobi' },
  { name: 'Morocco', flag: '🇲🇦', timeZone: 'Africa/Casablanca' },
]

interface CountrySelectProps {
  value: string
  onChange: (value: string) => void
  className?: string
  disabled?: boolean
}

export default function CountrySelect({ value, onChange, className, disabled }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedCountry = countries.find(c => c.timeZone === value) || 
    { name: value, flag: '🌍', timeZone: value }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          "flex items-center justify-between w-full p-2 bg-white border-2 border-black rounded",
          disabled && "opacity-75 cursor-not-allowed",
          className
        )}
        disabled={disabled}
      >
        <span className="flex items-center">
          <span className="mr-2">{selectedCountry.flag}</span>
          {selectedCountry.name}
        </span>
        {!disabled && <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && !disabled && (
        <div className="absolute z-10 w-full mt-1 bg-white border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-[300px] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b-2 border-black p-2">
            <input
              type="text"
              placeholder="Search countries..."
              className="w-full p-2 border-2 border-black rounded"
              onChange={(e) => {
                const searchBox = e.target.parentElement?.nextElementSibling;
                if (searchBox) {
                  const searchTerm = e.target.value.toLowerCase();
                  Array.from(searchBox.children).forEach((child) => {
                    const text = child.textContent?.toLowerCase() || '';
                    (child as HTMLElement).style.display = text.includes(searchTerm) ? 'block' : 'none';
                  });
                }
              }}
            />
          </div>
          <div className="p-1">
            {countries.map((country) => (
              <button
                key={country.timeZone}
                type="button"
                className="flex items-center w-full p-2 hover:bg-gray-100 rounded"
                onClick={() => {
                  onChange(country.timeZone)
                  setIsOpen(false)
                }}
              >
                <span className="mr-2">{country.flag}</span>
                {country.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

