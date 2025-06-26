type StoryImageType = {
  imageUrl: string;
  imageId: number;
};

export type StoryType = {
  storyId?: string;
  createdAt: string;
  title: string;
  content: string;
  userNickname: string;
  userProfileImage: string;
  isLiked: boolean;
  likeCount: number;
  viewCount: number;
  storyImages: StoryImageType[];
  isBookmarked?: boolean;
};

export type StoryCardProps = {
  story: {
    storyId: string;
    storyImages: StoryImageType[];
    userProfileImage?: string;
    title: string;
    content: string;
    likeCount?: number;
    viewCount?: number;
    isLiked?: boolean;
    isBookmarked?: boolean;
    userNickname: string;
    createdAt: string;
  };
};

type Story = StoryCardProps['story'];

type StoryPage = {
  results: Story[];
};

export type StoryQueryData = {
  pages: StoryPage[];
  pageParams: unknown[];
};

export type CommentStory = {
  commentId: number | null;
  content: string;
  createdAt: string;
  isLiked: boolean;
  likeCount: number;
  storyId: string;
  parent: number | null;
  updatedAt: string;
  userNickname: string;
  userProfileImage: string;
};

export type InputMode = {
  mode: 'edit' | 'reply' | 'none';
  payload: {
    content?: string;
    targetId: number | null;
    parent: number | null;
  };
};
