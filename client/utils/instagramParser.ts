// Instagram embed code parser utility
export interface InstagramReelData {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  embedCode: string;
  duration: string;
  likes: string;
  comments: string;
  views: string;
  date: string;
}

export function parseInstagramEmbedCode(embedCode: string): Partial<InstagramReelData> {
  const data: Partial<InstagramReelData> = {};
  
  try {
    // Extract reel ID from embed code
    const reelIdMatch = embedCode.match(/reel\/([A-Za-z0-9_-]+)/);
    if (reelIdMatch) {
      data.id = reelIdMatch[1];
      data.videoUrl = `https://www.instagram.com/reel/${reelIdMatch[1]}/`;
    }

    // Extract thumbnail URL (Instagram provides this in embed)
    const thumbnailMatch = embedCode.match(/src="([^"]*\.jpg[^"]*)"/);
    if (thumbnailMatch) {
      data.thumbnail = thumbnailMatch[1];
    }

    // Extract date from embed code if available
    const dateMatch = embedCode.match(/datetime="([^"]*)"/);
    if (dateMatch) {
      const date = new Date(dateMatch[1]);
      data.date = formatRelativeDate(date);
    }

    // Store the original embed code
    data.embedCode = embedCode;

  } catch (error) {
    console.error('Error parsing Instagram embed code:', error);
  }

  return data;
}

export function formatRelativeDate(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}mo ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
}

// Function to fetch real Instagram data (requires Instagram API or scraping)
export async function fetchInstagramReelData(reelId: string): Promise<Partial<InstagramReelData>> {
  try {
    // This would require Instagram API access or web scraping
    // For now, return placeholder data
    return {
      id: reelId,
      likes: 'Loading...',
      comments: 'Loading...',
      views: 'Loading...',
      duration: '0:30', // Default duration
    };
  } catch (error) {
    console.error('Error fetching Instagram data:', error);
    return {};
  }
}
