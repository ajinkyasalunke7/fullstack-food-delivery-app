const calculateExpiryTime = (metric, unit) => {
  let multiplier = 1;
  switch (unit.toLowerCase()) {
    case "minute":
    case "minutes":
    case "m":
      multiplier = 1000 * 60;
      break;
    case "hour":
    case "hours":
    case "h":
      multiplier = 1000 * 60 * 60;
      break;
    case "day":
    case "days":
    case "d":
      multiplier = 1000 * 60 * 60 * 24;
      break;
    default:
      throw new Error(
        "Invalid unit provided. Supported units are minutes, hours, and days."
      );
  }
  const expiryTime = new Date(Date.now() + metric * multiplier);
  return expiryTime;
};

export { calculateExpiryTime };
