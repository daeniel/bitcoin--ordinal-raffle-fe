export const fetchInscriptions = async (slug: string) => {
  console.log("fetching inscriptions for slug", slug);
  const response = await fetch(`/api/inscriptions/${slug}`);
  if (response.status == 200) {
    const data = await response.json();
    return data;
  } else {
    return undefined;
  }
};
