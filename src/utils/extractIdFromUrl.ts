export const extractIdFromUrl = (url: string) => {
  const match = url.match(/\/(\d+)\/$/);
  return match ? parseInt(match[1], 10) : null;
};
