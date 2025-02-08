export const getNumberFromURL = (search: string) => {
  const searchParams = new URLSearchParams(search);

  return Number(searchParams.get('page'));
};
