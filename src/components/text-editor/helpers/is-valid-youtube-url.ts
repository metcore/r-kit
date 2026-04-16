// helpers/yt-url-to-embed.ts (tambahkan fungsi ini)
const isValidYoutubeUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    const isYoutubeDomain =
      parsed.hostname === 'www.youtube.com' ||
      parsed.hostname === 'youtube.com' ||
      parsed.hostname === 'youtu.be';

    if (!isYoutubeDomain) return false;

    // youtube.com/watch?v=xxxx
    if (parsed.hostname !== 'youtu.be') {
      return parsed.searchParams.has('v');
    }

    // youtu.be/xxxx
    return parsed.pathname.length > 1;
  } catch {
    return false;
  }
};

export default isValidYoutubeUrl;
