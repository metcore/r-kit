function toEmbedUrl(url: string) {
  const regExp =
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?/]+)/;

  const match = url.match(regExp);
  const videoId = match?.[1];

  if (videoId === undefined) return null;

  return `https://www.youtube.com/embed/${videoId}`;
}

export default toEmbedUrl;
