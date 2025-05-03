function UserAvatar() {
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Background circle */}
      <circle cx="50" cy="50" r="48" fill="#6366f1" />
      {/* Person figure */}
      <circle cx="50" cy="35" r="15" fill="#f9fafb" />
      <path
        d="M30,85 Q50,60 70,85"
        fill="none"
        stroke="#f9fafb"
        strokeWidth="4"
      />
      {/* Food plate */}
      <ellipse
        cx="50"
        cy="72"
        rx="18"
        ry="10"
        fill="#f9fafb"
        stroke="#d1d5db"
        strokeWidth="1"
      />
      <path
        d="M38,70 Q50,75 62,70"
        fill="none"
        stroke="#9ca3af"
        strokeWidth="1.5"
      />
      {/* Food items */}
      <circle cx="44" cy="68" r="3" fill="#34d399" /> {/* Vegetable */}
      <circle cx="50" cy="66" r="3" fill="#f87171" /> {/* Tomato */}
      <ellipse cx="56" cy="69" rx="4" ry="3" fill="#fcd34d" /> {/* Grain */}
      {/* Fork */}
      <path d="M70,55 L65,75" fill="none" stroke="#f9fafb" strokeWidth="1.5" />
      <path d="M65,75 L67,78" fill="none" stroke="#f9fafb" strokeWidth="1.5" />
      <path d="M65,60 L63,60" fill="none" stroke="#f9fafb" strokeWidth="1" />
      <path d="M65,62 L63,62" fill="none" stroke="#f9fafb" strokeWidth="1" />
      <path d="M65,64 L63,64" fill="none" stroke="#f9fafb" strokeWidth="1" />
    </svg>
  );
}

export default UserAvatar;
