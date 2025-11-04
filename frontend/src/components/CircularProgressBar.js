import React, { useEffect, useState } from 'react';
import './CircularProgressBar.css';

const CircularProgressBar = ({ percentage, color }) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const progress = ((100 - percentage) / 100) * circumference;

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
  }, []);

  const getInsight = (percentage) => {
    if (percentage < 50) return "Great! You're managing well 👏";
    if (percentage < 80) return "You're spending moderately ⚖️";
    return "Caution! You're nearing your limit 🚨";
  };

  const getColor = (percentage) => {
    if (percentage < 50) return "#4CAF50";
    if (percentage < 80) return "#FFC107";
    return "#F44336";
  };

  const circleStyle = {
    '--circumference': circumference,
    '--progress': progress,
    '--color': color || getColor(percentage),
  };

  return (
    <div className="circular-progressbar-container">
      <div className="insight">{getInsight(percentage)}</div>
      <div className="circular-progressbar">
        <svg viewBox="0 0 100 100">
          <circle
            className="circle bg"
            r={radius}
            cx="50"
            cy="50"
            strokeDasharray={circumference}
            style={circleStyle}
          />
          <circle
            className={`circle ${isAnimating ? 'animating' : ''}`}
            r={radius}
            cx="50"
            cy="50"
            strokeDasharray={circumference}
            strokeDashoffset={progress}
            style={circleStyle}
          />
        </svg>
        <div className="percentage">{percentage}%</div>
      </div>
    </div>
  );
};

export default CircularProgressBar;
