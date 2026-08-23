function Logo({ size = 28, showText = true, className = "", textClassName = "", imgClassName = "", invert = false }) {
  return (
    <a href="#top" className={className}>
      <img
        src="/realmeal/logo.avif"
        alt="Real Meal"
        width={size}
        height={size}
        className={`rounded-sm object-contain ${invert ? "brightness-0 invert" : ""} ${imgClassName}`}
      />
      {showText && (
        <span
          className={`ml-2.5 text-lg font-medium tracking-tight ${textClassName}`}
        >
          Real Meal
        </span>
      )}
    </a>
  );
}

export default Logo;
