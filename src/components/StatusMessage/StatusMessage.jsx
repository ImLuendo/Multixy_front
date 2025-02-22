/* eslint-disable react/prop-types */
// components/StatusMessage.jsx
export function StatusMessage({ message }) {
    if (!message) return null;
    return <p className="text-center text-red-600 mb-4">{message}</p>;
  }
  