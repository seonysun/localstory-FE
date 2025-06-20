export type PostStoryPayload = {
  story: {
    marker: number | null;
    title: string;
    content: string;
    emoji: string;
  };
  images: File[];
};

export type Story = {
  storyId: number;
  userNickname: string;
  userProfileImage: string;
  marker: number;
  title: string;
  content: string;
  emoji: string;
  viewCount: number;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  isLiked: boolean;
};

export type StoryImage = {
  imageId: number;
  imageFile: string;
  imageUrl: string;
  uploadedAt: string;
};
