import { useState } from "react";

const Star = ({ filled, fraction }: any) => {
  const starPath = (
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.948a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.447a1 1 0 00-.364 1.118l1.286 3.948c.3.921-.755 1.688-1.54 1.118l-3.368-2.447a1 1 0 00-1.175 0L5.88 17.008c-.784.57-1.838-.197-1.539-1.118l1.286-3.948a1 1 0 00-.364-1.118L1.895 9.375c-.783-.57-.381-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
  );

  if (fraction) {
    return (
      <svg
        className="w-6 h-6 text-gray-300"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        {starPath}
        <rect
          x="0"
          y="0"
          width={`${fraction * 20}`}
          height="20"
          fill="currentColor"
          className="text-yellow-500"
        />
      </svg>
    );
  }

  return (
    <svg
      className={`w-6 h-6 ${filled ? "text-yellow-500" : "text-gray-300"}`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      {starPath}
    </svg>
  );
};

const StarRating = () => {
  const [rating, setRating] = useState(0);

  const handleChange = (event: any) => {
    const value = Math.max(0, Math.min(5, parseFloat(event.target.value)));
    setRating(value);
  };

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const fraction = rating - fullStars;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} filled />);
    }

    if (fraction > 0) {
      stars.push(<Star key="fraction" fraction={fraction} />);
    }

    while (stars.length < 5) {
      stars.push(<Star key={stars.length} />);
    }

    return stars;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1">{renderStars()}</div>
    </div>
  );
};

export default StarRating;
