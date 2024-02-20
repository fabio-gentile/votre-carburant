import { Bookmark } from '@/types';

export const getUserBookmarks = async (userEmail: string): Promise<{ data: Bookmark[] }> => {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/bookmarks?email=${userEmail}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const { bookmarks } = await response.json();

  return { data: bookmarks };
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
