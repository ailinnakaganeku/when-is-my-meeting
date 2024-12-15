"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { ChevronDown } from "lucide-react";

const countries = [
  {
    name: "Argentina",
    flag: "🇦🇷",
    timeZone: "America/Argentina/Buenos_Aires",
    gmtOffset: "GMT-3",
  },
  {
    name: "Bolivia",
    flag: "🇧🇴",
    timeZone: "America/La_Paz",
    gmtOffset: "GMT-4",
  },
  {
    name: "Brazil",
    flag: "🇧🇷",
    timeZone: "America/Sao_Paulo",
    gmtOffset: "GMT-3",
  },
  {
    name: "Canada",
    flag: "🇨🇦",
    timeZone: "America/Toronto",
    gmtOffset: "GMT-4",
  },
  {
    name: "Chile",
    flag: "🇨🇱",
    timeZone: "America/Santiago",
    gmtOffset: "GMT-4",
  },
  {
    name: "Colombia",
    flag: "🇨🇴",
    timeZone: "America/Bogota",
    gmtOffset: "GMT-5",
  },
  {
    name: "Costa Rica",
    flag: "🇨🇷",
    timeZone: "America/Costa_Rica",
    gmtOffset: "GMT-6",
  },
  { name: "Cuba", flag: "🇨🇺", timeZone: "America/Havana", gmtOffset: "GMT-4" },
  {
    name: "Dominican Republic",
    flag: "🇩🇴",
    timeZone: "America/Santo_Domingo",
    gmtOffset: "GMT-4",
  },
  {
    name: "Ecuador",
    flag: "🇪🇨",
    timeZone: "America/Guayaquil",
    gmtOffset: "GMT-5",
  },
  {
    name: "El Salvador",
    flag: "🇸🇻",
    timeZone: "America/El_Salvador",
    gmtOffset: "GMT-6",
  },
  {
    name: "Guatemala",
    flag: "🇬🇹",
    timeZone: "America/Guatemala",
    gmtOffset: "GMT-6",
  },
  {
    name: "Haiti",
    flag: "🇭🇹",
    timeZone: "America/Port-au-Prince",
    gmtOffset: "GMT-4",
  },
  {
    name: "Honduras",
    flag: "🇭🇳",
    timeZone: "America/Tegucigalpa",
    gmtOffset: "GMT-6",
  },
  {
    name: "Jamaica",
    flag: "🇯🇲",
    timeZone: "America/Jamaica",
    gmtOffset: "GMT-5",
  },
  {
    name: "Mexico",
    flag: "🇲🇽",
    timeZone: "America/Mexico_City",
    gmtOffset: "GMT-5",
  },
  {
    name: "Nicaragua",
    flag: "🇳🇮",
    timeZone: "America/Managua",
    gmtOffset: "GMT-6",
  },
  {
    name: "Panama",
    flag: "🇵🇦",
    timeZone: "America/Panama",
    gmtOffset: "GMT-5",
  },
  {
    name: "Paraguay",
    flag: "🇵🇾",
    timeZone: "America/Asuncion",
    gmtOffset: "GMT-4",
  },
  { name: "Peru", flag: "🇵🇪", timeZone: "America/Lima", gmtOffset: "GMT-5" },
  {
    name: "Puerto Rico",
    flag: "🇵🇷",
    timeZone: "America/Puerto_Rico",
    gmtOffset: "GMT-4",
  },
  {
    name: "United States",
    flag: "🇺🇸",
    timeZone: "America/New_York",
    gmtOffset: "GMT-4",
  },
  {
    name: "Uruguay",
    flag: "🇺🇾",
    timeZone: "America/Montevideo",
    gmtOffset: "GMT-3",
  },
  {
    name: "Venezuela",
    flag: "🇻🇪",
    timeZone: "America/Caracas",
    gmtOffset: "GMT-4",
  },

  {
    name: "Albania",
    flag: "🇦🇱",
    timeZone: "Europe/Tirane",
    gmtOffset: "GMT+2",
  },
  {
    name: "Austria",
    flag: "🇦🇹",
    timeZone: "Europe/Vienna",
    gmtOffset: "GMT+2",
  },
  { name: "Belarus", flag: "🇧🇾", timeZone: "Europe/Minsk", gmtOffset: "GMT+3" },
  {
    name: "Belgium",
    flag: "🇧🇪",
    timeZone: "Europe/Brussels",
    gmtOffset: "GMT+2",
  },
  {
    name: "Bosnia and Herzegovina",
    flag: "🇧🇦",
    timeZone: "Europe/Sarajevo",
    gmtOffset: "GMT+2",
  },
  {
    name: "Bulgaria",
    flag: "🇧🇬",
    timeZone: "Europe/Sofia",
    gmtOffset: "GMT+3",
  },
  {
    name: "Croatia",
    flag: "🇭🇷",
    timeZone: "Europe/Zagreb",
    gmtOffset: "GMT+2",
  },
  {
    name: "Czech Republic",
    flag: "🇨🇿",
    timeZone: "Europe/Prague",
    gmtOffset: "GMT+2",
  },
  {
    name: "Denmark",
    flag: "🇩🇰",
    timeZone: "Europe/Copenhagen",
    gmtOffset: "GMT+2",
  },
  {
    name: "Estonia",
    flag: "🇪🇪",
    timeZone: "Europe/Tallinn",
    gmtOffset: "GMT+3",
  },
  {
    name: "Finland",
    flag: "🇫🇮",
    timeZone: "Europe/Helsinki",
    gmtOffset: "GMT+3",
  },
  { name: "France", flag: "🇫🇷", timeZone: "Europe/Paris", gmtOffset: "GMT+2" },
  {
    name: "Germany",
    flag: "🇩🇪",
    timeZone: "Europe/Berlin",
    gmtOffset: "GMT+2",
  },
  { name: "Greece", flag: "🇬🇷", timeZone: "Europe/Athens", gmtOffset: "GMT+3" },
  {
    name: "Hungary",
    flag: "🇭🇺",
    timeZone: "Europe/Budapest",
    gmtOffset: "GMT+2",
  },
  {
    name: "Iceland",
    flag: "🇮🇸",
    timeZone: "Atlantic/Reykjavik",
    gmtOffset: "GMT+0",
  },
  {
    name: "Ireland",
    flag: "🇮🇪",
    timeZone: "Europe/Dublin",
    gmtOffset: "GMT+1",
  },
  { name: "Italy", flag: "🇮🇹", timeZone: "Europe/Rome", gmtOffset: "GMT+2" },
  { name: "Latvia", flag: "🇱🇻", timeZone: "Europe/Riga", gmtOffset: "GMT+3" },
  {
    name: "Lithuania",
    flag: "🇱🇹",
    timeZone: "Europe/Vilnius",
    gmtOffset: "GMT+3",
  },
  {
    name: "Luxembourg",
    flag: "🇱🇺",
    timeZone: "Europe/Luxembourg",
    gmtOffset: "GMT+2",
  },
  { name: "Malta", flag: "🇲🇹", timeZone: "Europe/Malta", gmtOffset: "GMT+2" },
  {
    name: "Moldova",
    flag: "🇲🇩",
    timeZone: "Europe/Chisinau",
    gmtOffset: "GMT+3",
  },
  {
    name: "Montenegro",
    flag: "🇲🇪",
    timeZone: "Europe/Podgorica",
    gmtOffset: "GMT+2",
  },
  {
    name: "Netherlands",
    flag: "🇳🇱",
    timeZone: "Europe/Amsterdam",
    gmtOffset: "GMT+2",
  },
  {
    name: "North Macedonia",
    flag: "🇲🇰",
    timeZone: "Europe/Skopje",
    gmtOffset: "GMT+2",
  },
  { name: "Norway", flag: "🇳🇴", timeZone: "Europe/Oslo", gmtOffset: "GMT+2" },
  { name: "Poland", flag: "🇵🇱", timeZone: "Europe/Warsaw", gmtOffset: "GMT+2" },
  {
    name: "Portugal",
    flag: "🇵🇹",
    timeZone: "Europe/Lisbon",
    gmtOffset: "GMT+1",
  },
  {
    name: "Romania",
    flag: "🇷🇴",
    timeZone: "Europe/Bucharest",
    gmtOffset: "GMT+3",
  },
  { name: "Russia", flag: "🇷🇺", timeZone: "Europe/Moscow", gmtOffset: "GMT+3" },
  {
    name: "Serbia",
    flag: "🇷🇸",
    timeZone: "Europe/Belgrade",
    gmtOffset: "GMT+2",
  },
  {
    name: "Slovakia",
    flag: "🇸🇰",
    timeZone: "Europe/Bratislava",
    gmtOffset: "GMT+2",
  },
  {
    name: "Slovenia",
    flag: "🇸🇮",
    timeZone: "Europe/Ljubljana",
    gmtOffset: "GMT+2",
  },
  { name: "Spain", flag: "🇪🇸", timeZone: "Europe/Madrid", gmtOffset: "GMT+2" },
  {
    name: "Sweden",
    flag: "🇸🇪",
    timeZone: "Europe/Stockholm",
    gmtOffset: "GMT+2",
  },
  {
    name: "Switzerland",
    flag: "🇨🇭",
    timeZone: "Europe/Zurich",
    gmtOffset: "GMT+2",
  },
  { name: "Ukraine", flag: "🇺🇦", timeZone: "Europe/Kiev", gmtOffset: "GMT+3" },
  {
    name: "United Kingdom",
    flag: "🇬🇧",
    timeZone: "Europe/London",
    gmtOffset: "GMT+1",
  },

  {
    name: "Afghanistan",
    flag: "🇦🇫",
    timeZone: "Asia/Kabul",
    gmtOffset: "GMT+4:30",
  },
  { name: "Armenia", flag: "🇦🇲", timeZone: "Asia/Yerevan", gmtOffset: "GMT+4" },
  { name: "Azerbaijan", flag: "🇦🇿", timeZone: "Asia/Baku", gmtOffset: "GMT+4" },
  { name: "Bahrain", flag: "🇧🇭", timeZone: "Asia/Bahrain", gmtOffset: "GMT+3" },
  {
    name: "Bangladesh",
    flag: "🇧🇩",
    timeZone: "Asia/Dhaka",
    gmtOffset: "GMT+6",
  },
  { name: "Bhutan", flag: "🇧🇹", timeZone: "Asia/Thimphu", gmtOffset: "GMT+6" },
  { name: "Brunei", flag: "🇧🇳", timeZone: "Asia/Brunei", gmtOffset: "GMT+8" },
  {
    name: "Cambodia",
    flag: "🇰🇭",
    timeZone: "Asia/Phnom_Penh",
    gmtOffset: "GMT+7",
  },
  { name: "China", flag: "🇨🇳", timeZone: "Asia/Shanghai", gmtOffset: "GMT+8" },
  { name: "Cyprus", flag: "🇨🇾", timeZone: "Asia/Nicosia", gmtOffset: "GMT+3" },
  { name: "Georgia", flag: "🇬🇪", timeZone: "Asia/Tbilisi", gmtOffset: "GMT+4" },
  {
    name: "India",
    flag: "🇮🇳",
    timeZone: "Asia/Kolkata",
    gmtOffset: "GMT+5:30",
  },
  {
    name: "Indonesia",
    flag: "🇮🇩",
    timeZone: "Asia/Jakarta",
    gmtOffset: "GMT+7",
  },
  { name: "Iran", flag: "🇮🇷", timeZone: "Asia/Tehran", gmtOffset: "GMT+3:30" },
  { name: "Iraq", flag: "🇮🇶", timeZone: "Asia/Baghdad", gmtOffset: "GMT+3" },
  {
    name: "Israel",
    flag: "🇮🇱",
    timeZone: "Asia/Jerusalem",
    gmtOffset: "GMT+3",
  },
  { name: "Japan", flag: "🇯🇵", timeZone: "Asia/Tokyo", gmtOffset: "GMT+9" },
  { name: "Jordan", flag: "🇯🇴", timeZone: "Asia/Amman", gmtOffset: "GMT+3" },
  {
    name: "Kazakhstan",
    flag: "🇰🇿",
    timeZone: "Asia/Almaty",
    gmtOffset: "GMT+6",
  },
  { name: "Kuwait", flag: "🇰🇼", timeZone: "Asia/Kuwait", gmtOffset: "GMT+3" },
  {
    name: "Kyrgyzstan",
    flag: "🇰🇬",
    timeZone: "Asia/Bishkek",
    gmtOffset: "GMT+6",
  },
  { name: "Laos", flag: "🇱🇦", timeZone: "Asia/Vientiane", gmtOffset: "GMT+7" },
  { name: "Lebanon", flag: "🇱🇧", timeZone: "Asia/Beirut", gmtOffset: "GMT+3" },
  {
    name: "Malaysia",
    flag: "🇲🇾",
    timeZone: "Asia/Kuala_Lumpur",
    gmtOffset: "GMT+8",
  },
  {
    name: "Maldives",
    flag: "🇲🇻",
    timeZone: "Indian/Maldives",
    gmtOffset: "GMT+5",
  },
  {
    name: "Mongolia",
    flag: "🇲🇳",
    timeZone: "Asia/Ulaanbaatar",
    gmtOffset: "GMT+8",
  },
  {
    name: "Myanmar",
    flag: "🇲🇲",
    timeZone: "Asia/Yangon",
    gmtOffset: "GMT+6:30",
  },
  {
    name: "Nepal",
    flag: "🇳🇵",
    timeZone: "Asia/Kathmandu",
    gmtOffset: "GMT+5:45",
  },
  {
    name: "North Korea",
    flag: "🇰🇵",
    timeZone: "Asia/Pyongyang",
    gmtOffset: "GMT+9",
  },
  { name: "Oman", flag: "🇴🇲", timeZone: "Asia/Muscat", gmtOffset: "GMT+4" },
  {
    name: "Pakistan",
    flag: "🇵🇰",
    timeZone: "Asia/Karachi",
    gmtOffset: "GMT+5",
  },
  { name: "Palestine", flag: "🇵🇸", timeZone: "Asia/Gaza", gmtOffset: "GMT+3" },
  {
    name: "Philippines",
    flag: "🇵🇭",
    timeZone: "Asia/Manila",
    gmtOffset: "GMT+8",
  },
  { name: "Qatar", flag: "🇶🇦", timeZone: "Asia/Qatar", gmtOffset: "GMT+3" },
  {
    name: "Saudi Arabia",
    flag: "🇸🇦",
    timeZone: "Asia/Riyadh",
    gmtOffset: "GMT+3",
  },
  {
    name: "Singapore",
    flag: "🇸🇬",
    timeZone: "Asia/Singapore",
    gmtOffset: "GMT+8",
  },
  {
    name: "South Korea",
    flag: "🇰🇷",
    timeZone: "Asia/Seoul",
    gmtOffset: "GMT+9",
  },
  {
    name: "Sri Lanka",
    flag: "🇱🇰",
    timeZone: "Asia/Colombo",
    gmtOffset: "GMT+5:30",
  },
  { name: "Syria", flag: "🇸🇾", timeZone: "Asia/Damascus", gmtOffset: "GMT+3" },
  { name: "Taiwan", flag: "🇹🇼", timeZone: "Asia/Taipei", gmtOffset: "GMT+8" },
  {
    name: "Tajikistan",
    flag: "🇹🇯",
    timeZone: "Asia/Dushanbe",
    gmtOffset: "GMT+5",
  },
  {
    name: "Thailand",
    flag: "🇹🇭",
    timeZone: "Asia/Bangkok",
    gmtOffset: "GMT+7",
  },
  {
    name: "Timor-Leste",
    flag: "🇹🇱",
    timeZone: "Asia/Dili",
    gmtOffset: "GMT+9",
  },
  {
    name: "Turkey",
    flag: "🇹🇷",
    timeZone: "Europe/Istanbul",
    gmtOffset: "GMT+3",
  },
  {
    name: "Turkmenistan",
    flag: "🇹🇲",
    timeZone: "Asia/Ashgabat",
    gmtOffset: "GMT+5",
  },
  {
    name: "United Arab Emirates",
    flag: "🇦🇪",
    timeZone: "Asia/Dubai",
    gmtOffset: "GMT+4",
  },
  {
    name: "Uzbekistan",
    flag: "🇺🇿",
    timeZone: "Asia/Tashkent",
    gmtOffset: "GMT+5",
  },
  {
    name: "Vietnam",
    flag: "🇻🇳",
    timeZone: "Asia/Ho_Chi_Minh",
    gmtOffset: "GMT+7",
  },
  { name: "Yemen", flag: "🇾🇪", timeZone: "Asia/Aden", gmtOffset: "GMT+3" },

  {
    name: "Australia",
    flag: "🇦🇺",
    timeZone: "Australia/Sydney",
    gmtOffset: "GMT+10",
  },
  { name: "Fiji", flag: "🇫🇯", timeZone: "Pacific/Fiji", gmtOffset: "GMT+12" },
  {
    name: "Kiribati",
    flag: "🇰🇮",
    timeZone: "Pacific/Tarawa",
    gmtOffset: "GMT+12",
  },
  {
    name: "Marshall Islands",
    flag: "🇲🇭",
    timeZone: "Pacific/Majuro",
    gmtOffset: "GMT+12",
  },
  {
    name: "Micronesia",
    flag: "🇫🇲",
    timeZone: "Pacific/Chuuk",
    gmtOffset: "GMT+10",
  },
  { name: "Nauru", flag: "🇳🇷", timeZone: "Pacific/Nauru", gmtOffset: "GMT+12" },
  {
    name: "New Zealand",
    flag: "🇳🇿",
    timeZone: "Pacific/Auckland",
    gmtOffset: "GMT+12",
  },
  { name: "Palau", flag: "🇵🇼", timeZone: "Pacific/Palau", gmtOffset: "GMT+9" },
  {
    name: "Papua New Guinea",
    flag: "🇵🇬",
    timeZone: "Pacific/Port_Moresby",
    gmtOffset: "GMT+10",
  },
  { name: "Samoa", flag: "🇼🇸", timeZone: "Pacific/Apia", gmtOffset: "GMT+13" },
  {
    name: "Solomon Islands",
    flag: "🇸🇧",
    timeZone: "Pacific/Guadalcanal",
    gmtOffset: "GMT+11",
  },
  {
    name: "Tonga",
    flag: "🇹🇴",
    timeZone: "Pacific/Tongatapu",
    gmtOffset: "GMT+13",
  },
  {
    name: "Tuvalu",
    flag: "🇹🇻",
    timeZone: "Pacific/Funafuti",
    gmtOffset: "GMT+12",
  },
  {
    name: "Vanuatu",
    flag: "🇻🇺",
    timeZone: "Pacific/Efate",
    gmtOffset: "GMT+11",
  },

  {
    name: "Algeria",
    flag: "🇩🇿",
    timeZone: "Africa/Algiers",
    gmtOffset: "GMT+1",
  },
  { name: "Angola", flag: "🇦🇴", timeZone: "Africa/Luanda", gmtOffset: "GMT+1" },
  { name: "Egypt", flag: "🇪🇬", timeZone: "Africa/Cairo", gmtOffset: "GMT+2" },
  {
    name: "Ethiopia",
    flag: "🇪🇹",
    timeZone: "Africa/Addis_Ababa",
    gmtOffset: "GMT+3",
  },
  { name: "Ghana", flag: "🇬🇭", timeZone: "Africa/Accra", gmtOffset: "GMT+0" },
  { name: "Kenya", flag: "🇰🇪", timeZone: "Africa/Nairobi", gmtOffset: "GMT+3" },
  {
    name: "Morocco",
    flag: "🇲🇦",
    timeZone: "Africa/Casablanca",
    gmtOffset: "GMT+1",
  },
  { name: "Nigeria", flag: "🇳🇬", timeZone: "Africa/Lagos", gmtOffset: "GMT+1" },
  {
    name: "South Africa",
    flag: "🇿🇦",
    timeZone: "Africa/Johannesburg",
    gmtOffset: "GMT+2",
  },
  {
    name: "Tanzania",
    flag: "🇹🇿",
    timeZone: "Africa/Dar_es_Salaam",
    gmtOffset: "GMT+3",
  },
];

interface CountrySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCountry = countries.find((c) => c.timeZone === value) || {
    name: value.split("/").pop()?.replace("_", " "),
    flag: "🌍",
    timeZone: value,
    gmtOffset: "GMT Unknown",
  };
  const memoizedCountries = useMemo(() => countries, []);

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 bg-white border-2 border-black rounded text-left font-medium"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2">
          <span className="text-lg" aria-hidden="true">
            {selectedCountry.flag}
          </span>
          {selectedCountry.name} ({selectedCountry.gmtOffset})
        </span>
        <ChevronDown className="w-5 h-5 opacity-50" />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-1 bg-white border-2 border-black rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] max-h-60 overflow-auto"
          role="listbox"
        >
          <input
            type="text"
            placeholder="Search countries..."
            className="w-full p-2 border-b-2 border-black sticky"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <ul className="max-h-60 overflow-auto" role="listbox">
            {memoizedCountries
              .filter(
                (country) =>
                  country.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                  country.timeZone
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase())
              )
              .map((country) => (
                <li key={country.timeZone}>
                  <button
                    type="button"
                    className="flex items-center w-full p-3 hover:bg-gray-50 gap-2 text-left"
                    onClick={() => {
                      onChange(country.timeZone);
                      setIsOpen(false);
                    }}
                    role="option"
                    aria-selected={country.timeZone === value}
                  >
                    <span className="text-lg" aria-hidden="true">
                      {country.flag}
                    </span>
                    {country.name} ({country.gmtOffset})
                  </button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
