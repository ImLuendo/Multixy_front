/* eslint-disable react/prop-types */
// components/FormField.jsx
export function FormField({ label, type, name, value, onChange, placeholder }) {
    return (
      <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
        />
      </div>
    );
  }
  