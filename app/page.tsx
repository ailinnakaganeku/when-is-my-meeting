"use client";

import { useState, useEffect } from "react";
import { addMinutes } from "date-fns";
import { formatInTimeZone, getTimezoneOffset } from "date-fns-tz";
import { Clock } from "lucide-react";
import CountrySelect from "./components/CountrySelect";
import CustomTimePicker from "./components/CustomTimePicker";

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
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        setFromCountry(timezone);
      });
  }, []);

  useEffect(() => {
    if (fromCountry && toCountry && selectedTime) {
      const fromOffset = getTimezoneOffset(fromCountry) / (60 * 1000);
      const toOffset = getTimezoneOffset(toCountry) / (60 * 1000);
      const diffMinutes = toOffset - fromOffset;
      const convertedDate = addMinutes(selectedTime, diffMinutes);
      const converted = formatInTimeZone(convertedDate, toCountry, "hh:mm a");
      setConvertedTime(converted);
    }
  }, [fromCountry, toCountry, selectedTime]);

  const resetToCurrentTime = () => {
    setSelectedTime(new Date());
  };

  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl space-y-4">
          {/* Header with decorations */}
          <div className="relative">
            {/* Curved arrow decoration */}
            <div className="absolute right-0 -top-16 md:-right-16 w-32 h-32 hidden md:block">
              <svg
                width="134"
                height="83"
                viewBox="0 0 134 83"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M16.1026 37.2301C15.7533 38.278 16.3197 39.4106 17.3675 39.7599C18.4154 40.1092 19.5481 39.5429 19.8974 38.495L16.1026 37.2301ZM111 70.8623L128.357 55.6287L106.486 48.2138L111 70.8623ZM19.8974 38.495C20.9628 35.2987 24.5312 30.91 29.7471 26.6634C34.8901 22.4762 41.3387 18.6694 47.7627 16.508C54.2303 14.332 60.3698 13.9201 65.133 16.0615C69.7589 18.1412 73.5927 22.8678 75.0232 32.1665L78.9767 31.5583C77.4073 21.3569 72.991 15.2086 66.7732 12.4132C60.6926 9.67964 53.3947 10.3928 46.4872 12.7168C39.5362 15.0555 32.6724 19.1237 27.2216 23.5615C21.8438 27.9399 17.5372 32.9263 16.1026 37.2301L19.8974 38.495ZM75.0232 32.1665C76.3912 41.0582 72.3888 48.7551 66.0003 54.8003C59.5939 60.8624 50.9797 65.0535 43.7801 66.7934C40.169 67.666 37.0713 67.8832 34.8673 67.5165C32.6159 67.1418 31.8763 66.3028 31.6916 65.5548C31.4475 64.566 31.7823 62.5466 34.2648 59.1398C36.6736 55.8341 40.8208 51.6164 47.2566 46.4183L44.7433 43.3065C38.1791 48.6084 33.7325 53.0782 31.032 56.7842C28.4051 60.3891 27.1149 63.7056 27.8083 66.5137C28.5611 69.5626 31.3215 70.9814 34.2107 71.4622C37.1474 71.9509 40.8309 71.6212 44.7198 70.6814C52.5202 68.7963 61.781 64.2999 68.7496 57.7057C75.7361 51.0946 80.6087 42.1666 78.9767 31.5583L75.0232 32.1665ZM47.2566 46.4183C66.8641 30.5814 83.342 28.0465 94.9552 31.5124C106.633 34.9977 113.785 44.6294 114.79 54.0306L118.767 53.6053C117.587 42.5711 109.293 31.6171 96.0991 27.6795C82.8409 23.7226 65.0219 26.9275 44.7433 43.3065L47.2566 46.4183Z"
                  fill="black"
                />
              </svg>
            </div>

            <div className="p-4 rounded-lg transform -rotate-2 max-w-fit">
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
          </div>

          {/* Main Container */}
          <div className="bg-white border-4 border-black rounded-2xl p-4 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
              <div className="space-y-4">
                {/* From Section */}
                <div className="bg-blue-100 p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-bold mb-3 text-lg">From</h2>
                  <CountrySelect
                    value={fromCountry}
                    onChange={setFromCountry}
                  />
                </div>

                {/* Time Section */}
                <div className="bg-blue-100 p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-bold mb-3 text-lg">Time</h2>
                  <CustomTimePicker
                    value={selectedTime}
                    onChange={(newTime) => {
                      setSelectedTime(newTime);
                    }}
                  />
                </div>
              </div>

              {/* Arrow */}
              <div className="flex items-center justify-center my-4 md:mt-16 hidden md:block">
                <button
                  onClick={() => {
                    const tempCountry = fromCountry;
                    setFromCountry(toCountry);
                    setToCountry(tempCountry);
                  }}
                  className="bg-yellow-300 p-2 rounded-full border-2 border-black hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                  aria-label="Swap countries"
                >
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 17H4M4 17L8 13M4 17L8 21M4 7H20M20 7L16 3M20 7L16 11" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                {/* To Section */}
                <div className="bg-green-100 p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-bold mb-3 text-lg">To</h2>
                  <CountrySelect value={toCountry} onChange={setToCountry} />
                </div>

                {/* Converted Time Section */}
                <div className="bg-green-100 p-4 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-bold mb-3 text-lg">Converted Time</h2>
                  <div className="flex items-center gap-2 border-2 border-black bg-white p-3 rounded-lg">
                    <Clock className="w-5 h-5" />
                    <span className="text-xl font-mono">
                      {convertedTime || "--:-- --"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={resetToCurrentTime}
                className="bg-yellow-300 px-6 py-2 rounded-lg border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
              >
                Reset to Current Time
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
