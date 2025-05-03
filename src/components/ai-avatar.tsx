function AIAvatar() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#f1f5f9" />
      {/* Bot head */}
      <rect x="30" y="25" width="40" height="35" rx="8" fill="#94a3b8" />
      {/* Bot eyes */}
      <circle cx="40" cy="40" r="5" fill="#38bdf8" />
      <circle cx="60" cy="40" r="5" fill="#38bdf8" />
      {/* Bot antenna */}
      <line x1="50" y1="25" x2="50" y2="15" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="50" cy="12" r="4" fill="#f97316" />
      {/* Mouth/display screen */}
      <rect x="38" y="50" width="24" height="4" rx="2" fill="#38bdf8" />
      {/* Body */}
      <rect x="35" y="60" width="30" height="25" rx="3" fill="#94a3b8" />
      {/* Nutrition icons */}
      <circle cx="43" cy="70" r="4" fill="#22c55e" /> {/* Vitamins */}
      <rect x="50" y="66" width="8" height="8" rx="1" fill="#eab308" />{" "}
      {/* Protein */}
      <path
        d="M41,80 L49,76 L57,80"
        fill="none"
        stroke="#f43f5e"
        strokeWidth="2"
        strokeLinecap="round"
      />{" "}
      {/* Health graph */}
    </svg>
  );
}

export default AIAvatar;
