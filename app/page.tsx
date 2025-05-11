"use client";

import { useState, useEffect } from "react";
import { formatInTimeZone } from "date-fns-tz";
import { ArrowRight, Clock } from "lucide-react";
import { useHydration } from "./hooks/useHydration";
import { Skeleton } from "./components/ui/skeleton";
import CountrySelect from "./components/CountrySelect";
import CustomTimePicker from "./components/CustomTimePicker";
import Svg from "./components/Svg";
import { manualZonedTimeToUtc } from "./utils/dateUtils";
import {
  CONVERTED_TIME_TEXT,
  DEFAULT_FROM_TIMEZONE,
  FROM_TEXT,
  INITIAL_CONVERTED_TIME,
  LINKEDIN_URL,
  LINKEDIN_USERNAME,
  LOCAL_TIME_STRING,
  MAIN_TITLE_TEXT,
  OUTPUT_TIME_FORMAT,
  SELECTED_TIME,
  SELECTED_TIME_TEXT,
  SKELETON_LOADING_TEXT,
  TO_TEXT,
} from "./utils/constants";

export default function Home() {
  const hydrated = useHydration();
  const [fromCountry, setFromCountry] = useState(DEFAULT_FROM_TIMEZONE);
  const [toCountry, setToCountry] = useState("");
  const [selectedTime, setSelectedTime] = useState<string>(SELECTED_TIME);
  const [convertedTime, setConvertedTime] = useState(INITIAL_CONVERTED_TIME);

  useEffect(() => {
    if (hydrated) {
      setToCountry(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
  }, [hydrated]);

  useEffect(() => {
    if (hydrated && fromCountry) {
      const now = new Date();
      const fromCountryTime = new Date(
        now.toLocaleString(LOCAL_TIME_STRING, { timeZone: fromCountry })
      );
      setSelectedTime(fromCountryTime.toISOString());
    }
  }, [fromCountry, hydrated]);

  useEffect(() => {
    if (hydrated && fromCountry && toCountry && selectedTime) {
      try {
        const localTime = manualZonedTimeToUtc(
          new Date(selectedTime),
          fromCountry
        );
        const formattedTime = formatInTimeZone(
          localTime,
          toCountry,
          OUTPUT_TIME_FORMAT
        );
        setConvertedTime(formattedTime);
      } catch (error) {
        console.log("Error converting time:", error);
      }
    }
  }, [hydrated, fromCountry, toCountry, selectedTime]);

  return (
    <main className="min-h-screen bg-[#f0f0f0] flex flex-col bg-[url('/image.webp')] bg-no-repeat bg-cover bg-center">
      <div className="flex-grow p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl space-y-4">
          <div className="relative">
            <div className="absolute right-0 -top-4 md:-right-16 w-32 h-32 hidden md:block rotate-12">
              <Svg className="w-full h-full" />
            </div>

            <div className="p-4 w-full bg-yellow-300 rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 md:max-w-fit">
              {hydrated && fromCountry && toCountry && selectedTime ? (
                <h1 className="tracking-tight text-xl md:text-4xl font-medium md:font-black flex items-center justify-start md:gap-2">
                  {MAIN_TITLE_TEXT}
                </h1>
              ) : (
                <h1 className="tracking-tight text-xl md:text-4xl font-medium md:font-black flex items-center justify-start md:gap-2">
                  {SKELETON_LOADING_TEXT}
                </h1>
              )}
            </div>
          </div>

          <div className="bg-white border-4 border-black rounded-2xl p-4 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-start">
              <div className="space-y-4">
                <div className="bg-blue-100 px-4 py-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-medium md:font-bold mb-3 text-sm md:text-lg tracking-tight">
                    {FROM_TEXT}
                  </h2>
                  {hydrated && fromCountry && toCountry && selectedTime ? (
                    <CountrySelect
                      value={fromCountry}
                      onChange={setFromCountry}
                    />
                  ) : (
                    <Skeleton className="h-[56px] w-full border-2 border-black rounded" />
                  )}
                </div>

                <div className="bg-blue-100 px-4 py-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-medium md:font-bold mb-3 text-sm md:text-lg tracking-tight">
                    {SELECTED_TIME_TEXT}
                  </h2>
                  {hydrated && fromCountry && toCountry && selectedTime ? (
                    <CustomTimePicker
                      value={new Date(selectedTime)}
                      onChange={(newDate) =>
                        setSelectedTime(newDate.toISOString())
                      }
                    />
                  ) : (
                    <Skeleton className="h-[56px] w-full border-2 border-black rounded" />
                  )}
                </div>
              </div>

              <div className="hidden md:flex justify-center items-center h-full">
                <div className="bg-yellow-300 p-4 rounded-full border-4 border-black transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <ArrowRight size={32} />
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-purple-100 px-4 py-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-medium md:font-bold mb-3 text-sm md:text-lg tracking-tight">
                    {TO_TEXT}
                  </h2>
                  {hydrated && fromCountry && toCountry && selectedTime ? (
                    <CountrySelect value={toCountry} onChange={setToCountry} />
                  ) : (
                    <Skeleton className="h-[56px] w-full border-2 border-black rounded" />
                  )}
                </div>

                <div className="bg-purple-100 px-4 py-6 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <h2 className="font-medium md:font-bold mb-3 text-sm md:text-lg tracking-tight">
                    {CONVERTED_TIME_TEXT}
                  </h2>
                  {hydrated && fromCountry && toCountry && selectedTime ? (
                    <div className="flex items-center gap-3 border-2 border-black bg-white p-3 rounded">
                      <Clock className="w-4 h-4 md:w-5 md:h-5 opacity-50" />
                      <span className="text-md md:text-xl font-mono font-bold">
                        {convertedTime}
                      </span>
                    </div>
                  ) : (
                    <Skeleton className="h-[56px] w-full border-2 border-black rounded" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p>
              Made by{" "}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                title="Visit LinkedIn"
                className="text-[#0077B5]"
              >
                {LINKEDIN_USERNAME}
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
