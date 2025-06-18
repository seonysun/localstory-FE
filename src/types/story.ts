export type PostStoryPayload = {
  story: {
    marker: number | null;
    title: string;
    content: string;
    emoji: string;
  };
  images: File[];
};
