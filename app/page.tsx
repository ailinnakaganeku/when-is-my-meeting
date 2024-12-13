"use client";

import { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import CountrySelect from "./components/CountrySelect";
import CustomTimePicker from "./components/CustomTimePicker";
import { Button } from "@/app/components/ui/button";

export default function Home() {
  const [fromCountry, setFromCountry] = useState("");
  const [toCountry, setToCountry] = useState("Europe/London");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [convertedTime, setConvertedTime] = useState("");

  useEffect(() => {
    // Detect user's country and timezone
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setFromCountry(timezone);
      })
      .catch(() => {
        // Fallback to browser's timezone if API fails
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setFromCountry(timezone);
      });
  }, []);

  useEffect(() => {
    if (fromCountry && toCountry && selectedTime) {
      const converted = formatInTimeZone(selectedTime, toCountry, "hh:mm a");
      setConvertedTime(converted);
    }
  }, [fromCountry, toCountry, selectedTime]);

  const resetToCurrentTime = () => {
    setSelectedTime(new Date());
  };

  return (
    <main className="min-h-screen bg-white p-4 flex flex-col items-center">
      <div className="w-full flex-grow p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl space-y-4">
          {/* Header */}
          <div className="bg-yellow-300 p-4 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 max-w-fit">
            <h1 className="text-2xl md:text-4xl font-black flex items-center gap-2">
              When is my meeting?
              <span
                role="img"
                aria-label="thinking face"
                className="text-2xl md:text-3xl"
              >
                🤔
              </span>
            </h1>
          </div>

          {/* Main Container */}
          <div className="bg-white border-4 border-black rounded-2xl p-4 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {/* From Section */}
                <div className="bg-blue-100 p-4 rounded-lg border-2 border-black">
                  <h2 className="font-bold mb-2">From</h2>
                  <CountrySelect
                    value={fromCountry}
                    onChange={setFromCountry}
                    className="w-full"
                    disabled
                  />
                </div>

                {/* Time Section */}
                <div className="bg-green-100 p-4 rounded-lg border-2 border-black">
                  <h2 className="font-bold mb-2">Time</h2>
                  <CustomTimePicker
                    value={selectedTime}
                    onChange={setSelectedTime}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {/* To Section */}
                <div className="bg-pink-100 p-4 rounded-lg border-2 border-black">
                  <h2 className="font-bold mb-2">To</h2>
                  <CountrySelect
                    value={toCountry}
                    onChange={setToCountry}
                    className="w-full"
                  />
                </div>

                {/* Converted Time Section */}
                <div className="bg-purple-100 p-4 rounded-lg border-2 border-black">
                  <h2 className="font-bold mb-2">Converted Time</h2>
                  <div className="flex items-center border-2 border-black bg-white p-3 rounded">
                    <span className="text-xl font-mono">{convertedTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={resetToCurrentTime}
                className="bg-yellow-300 text-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Reset to Current Time
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
