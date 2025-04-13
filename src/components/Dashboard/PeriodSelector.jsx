import { ChevronDown } from "lucide-react";

export default function PeriodSelector({ value, onChange }) {
  // Define the options for the select dropdown
  const options = [
    { label: "Ce mois-ci", value: "cemois" },
    { label: "Mois dernier", value: "moisdernier" },
    { label: "Cette année", value: "cetteannee" },
    { label: "Année dernière", value: "anneederniere" },
  ];

  return (
    <div className="relative inline-block w-full sm:w-auto">
      {/* Select dropdown */}
      <select
        value={value} // Control the selected value
        onChange={(e) => onChange(e.target.value)} // Update the selected value
        className="appearance-none bg-[#1E2A78] text-white text-sm py-2 px-4 pr-8 rounded-md focus:outline-none w-full sm:w-auto"
      >
        {/* Render the options in the dropdown */}
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-white">
            {option.label}
          </option>
        ))}
      </select>

      {/* Chevron icon for dropdown */}
      <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-white">
        <ChevronDown size={16} />
      </div>
    </div>
  );
}
