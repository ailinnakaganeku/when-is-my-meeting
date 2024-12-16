"use client";

import { useState, useEffect, useRef } from "react";
import { format, set } from "date-fns";
import { Clock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export default function CustomTimePicker({
  value,
  onChange,
}: CustomTimePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedSection, setFocusedSection] = useState<
    "hours" | "minutes" | "period" | null
  >(null);
  const [selectedHour, setSelectedHour] = useState(format(value, "hh"));
  const [selectedMinute, setSelectedMinute] = useState(format(value, "mm"));
  const [selectedPeriod, setSelectedPeriod] = useState(
    format(value, "a").toUpperCase()
  );
  const [isHourValid, setIsHourValid] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedHour(format(value, "hh"));
    setSelectedMinute(format(value, "mm"));
    setSelectedPeriod(format(value, "a").toUpperCase());
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const updateTime = (hour: string, minute: string, period: string) => {
    const parsedHour = parseInt(hour);
    const parsedMinute = parseInt(minute);

    if (isNaN(parsedHour) || isNaN(parsedMinute)) {
      console.error("Invalid hour or minute");
      return;
    }

    let hours24 = parsedHour;
    if (period === "PM" && hours24 !== 12) {
      hours24 += 12;
    } else if (period === "AM" && hours24 === 12) {
      hours24 = 0;
    }

    const newDate = set(value, { hours: hours24, minutes: parsedMinute });

    if (isNaN(newDate.getTime())) {
      console.error("Invalid date created");
      return;
    }

    onChange(newDate);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    section: "hours" | "minutes"
  ) => {
    const newValue = e.target.value.replace(/\D/g, "").slice(0, 2);

    if (section === "hours") {
      setSelectedHour(newValue);
      setIsHourValid(true);
    } else {
      if (parseInt(newValue) >= 0 && parseInt(newValue) <= 59) {
        setSelectedMinute(newValue);
        updateTime(selectedHour, newValue, selectedPeriod);
      } else {
        setSelectedMinute("00");
        updateTime(selectedHour, "00", selectedPeriod);
      }
    }
  };

  const handleBlur = (section: "hours" | "minutes") => {
    if (section === "hours") {
      const numValue = parseInt(selectedHour);
      if (numValue < 1 || numValue > 12 || isNaN(numValue)) {
        setSelectedHour("01");
        setIsHourValid(false);
        updateTime("01", selectedMinute, selectedPeriod);
      } else {
        const formattedHour = selectedHour.padStart(2, "0");
        setSelectedHour(formattedHour);
        setIsHourValid(true);
        updateTime(formattedHour, selectedMinute, selectedPeriod);
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent,
    section: "hours" | "minutes" | "period"
  ) => {
    if (section === "hours" || section === "minutes") {
      if (e.key === "Backspace") {
        e.preventDefault();
        const newValue = (
          section === "hours" ? selectedHour : selectedMinute
        ).slice(0, -1);
        if (section === "hours") {
          setSelectedHour(newValue);
          setIsHourValid(true);
        } else {
          setSelectedMinute(newValue.padStart(2, "0"));
          updateTime(selectedHour, newValue.padStart(2, "0"), selectedPeriod);
        }
      } else if (/^\d$/.test(e.key)) {
        e.preventDefault();
        if (section === "hours") {
          const newValue = selectedHour + e.key;
          setSelectedHour(newValue.slice(-2));
          setIsHourValid(true);
        } else {
          const newValue = (selectedMinute.slice(1) + e.key).padStart(2, "0");
          const numValue = parseInt(newValue);

          if (numValue >= 0 && numValue <= 59) {
            setSelectedMinute(newValue);
            updateTime(selectedHour, newValue, selectedPeriod);
          } else {
            setSelectedMinute("00");
            updateTime(selectedHour, "00", selectedPeriod);
          }
        }
      }
    } else if (section === "period") {
      if (["ArrowUp", "ArrowDown", " "].includes(e.key)) {
        e.preventDefault();
        const newPeriod = selectedPeriod === "AM" ? "PM" : "AM";
        setSelectedPeriod(newPeriod);
        updateTime(selectedHour, selectedMinute, newPeriod);
      }
    }

    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (section === "minutes") setFocusedSection("hours");
        else if (section === "period") setFocusedSection("minutes");
      } else {
        if (section === "hours") setFocusedSection("minutes");
        else if (section === "minutes") setFocusedSection("period");
      }
    }
  };

  const hours = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const minutes = Array.from({ length: 60 }, (_, i) =>
    String(i).padStart(2, "0")
  );

  return (
    <div
      ref={containerRef}
      className="relative z-10"
      tabIndex={0}
      onFocus={() => !focusedSection && setFocusedSection("hours")}
      onBlur={(e) => {
        if (!containerRef.current?.contains(e.relatedTarget)) {
          setFocusedSection(null);
        }
      }}
    >
      <div
        className="flex items-center justify-between space-x-2 w-full p-3 bg-white border-2 border-black rounded font-mono text-md md:text-xl cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-full flex items-center gap-3">
          <Clock className="w-4 h-4 md:w-5 md:h-5 opacity-50" />
          <div>
            <input
              type="text"
              inputMode="numeric"
              value={selectedHour}
              onChange={(e) => handleInputChange(e, "hours")}
              onKeyDown={(e) => handleKeyDown(e, "hours")}
              onBlur={() => handleBlur("hours")}
              className={cn(
                "w-6 bg-transparent text-center outline-none",
                focusedSection === "hours" && "bg-blue-200"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedSection("hours");
              }}
              onFocus={() => setFocusedSection("hours")}
              maxLength={2}
              aria-label="Hours"
              aria-invalid={!isHourValid}
              aria-describedby="hour-error"
            />
            <span className="w-fit">:</span>
            <input
              type="text"
              inputMode="numeric"
              value={selectedMinute}
              onChange={(e) => handleInputChange(e, "minutes")}
              onKeyDown={(e) => handleKeyDown(e, "minutes")}
              className={cn(
                "w-6 bg-transparent text-center outline-none",
                focusedSection === "minutes" && "bg-blue-200"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedSection("minutes");
              }}
              onFocus={() => setFocusedSection("minutes")}
              maxLength={2}
              aria-label="Minutes"
            />
            <span
              className={cn(
                "w-6 ml-1 md:ml-3 cursor-pointer",
                focusedSection === "period" && "bg-blue-200"
              )}
              onClick={(e) => {
                e.stopPropagation();
                setFocusedSection("period");
                setIsOpen(!isOpen)
              }}
              onKeyDown={(e) => handleKeyDown(e, "period")}
              tabIndex={0}
              role="button"
              aria-label="Toggle between AM and PM"
            >
              {selectedPeriod}
            </span>
          </div>
        </div>
        <ChevronDown className="w-4 h-4 md:w-5 md:h-5 opacity-50" />
      </div>

      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 bg-white border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <div className="flex">
            <div className="flex-1 max-h-36 overflow-y-auto border-r-2 border-black">
              {hours.map((hour) => (
                <button
                  key={hour}
                  className={cn(
                    "w-full p-3 text-center hover:bg-blue-100 transition-colors",
                    selectedHour === hour &&
                      "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                  onClick={() => {
                    setSelectedHour(hour);
                    updateTime(hour, selectedMinute, selectedPeriod);
                  }}
                >
                  {hour}
                </button>
              ))}
            </div>

            <div className="flex-1 max-h-36 overflow-y-auto border-r-2 border-black">
              {minutes.map((minute) => (
                <button
                  key={minute}
                  className={cn(
                    "w-full p-3 text-center hover:bg-blue-100 transition-colors",
                    selectedMinute === minute &&
                      "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                  onClick={() => {
                    setSelectedMinute(minute);
                    updateTime(selectedHour, minute, selectedPeriod);
                  }}
                >
                  {minute}
                </button>
              ))}
            </div>

            <div className="flex-1">
              {["AM", "PM"].map((period) => (
                <button
                  key={period}
                  className={cn(
                    "w-full p-3 text-center hover:bg-blue-100 transition-colors",
                    selectedPeriod === period &&
                      "bg-blue-500 text-white hover:bg-blue-600"
                  )}
                  onClick={() => {
                    setSelectedPeriod(period);
                    updateTime(selectedHour, selectedMinute, period);
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
  );
}
