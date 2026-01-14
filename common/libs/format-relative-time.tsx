export const formatRelativeTime = (date: Date) => {
  const now = new Date();

  const diffInDay = Math.floor(
    (now.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDay === 0) {
    return "Hari ini";
  } else if (diffInDay === 1) {
    return "Kemarin";
  } else if (diffInDay > 1) {
    return `${diffInDay} hari yang lalu`;
  }
};
