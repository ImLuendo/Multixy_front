/* eslint-disable react/prop-types */
export function Logo({ image, title, subtitle, onClick }) {
    return (
      <div onClick={onClick} className="flex flex-col items-start cursor-pointer">
        <div className="flex items-center space-x-3">
          <img className="h-10" src={image} alt="logo" />
          <div className="text-2xl font-bold text-blue-600">{title}</div>
        </div>
        <div className="text-gray-400 mt-1 break-words">{subtitle}</div>
      </div>
    );
  }
  