export const getUserBookmarks = async (userEmail: string): Promise<{ data: any }> => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/bookmarks?email=${userEmail}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await response.json();
  console.log(data);

  return { data: data };
};

export const postUserBookmarks = async (userEmail: string, stationId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: userEmail,
      stationId,
    }),
  });

  return response.json();
};
