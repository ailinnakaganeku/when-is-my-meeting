export default function TimePicker({ value, onChange }) {
  return (
    <div>
      <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
        Select Time
      </label>
      <input
        type="time"
        id="time"
        name="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-4 border-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2"
      />
    </div>
  )
}

