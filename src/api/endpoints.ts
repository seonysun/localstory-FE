export const ENDPOINTS = {
  AI: {
    CHAT: '/ai/chat/',
    SUMMARY: '/ai/summarize/',
  },
  FOLLOWS: {
    LIST: '/follows/', // get, post
    DETAIL: (id: number) => `/follows/${id}/`, // get, put, patch, delete
  },
  SUBSCRIBE: {
    LIST: '/subscribes/', // get, post
    DETAIL: (id: number) => `/subscribes/${id}/`, // get, delete
  },
  NOTIFICATIONS: {
    LIST: '/notifications/', // get, post
    DETAIL: (id: number) => `/notifications/${id}/`, // get, put, patch, delete
  },
  SEARCH: {
    LIST: '/search/',
    SUGGEST: '/search/suggestions/',
  },
  SEARCH_HISTORY: {
    LIST: '/search/history/', // get, post
    DETAIL: (id: number) => `/search/history/${id}/`, // get, put, patch, delete
  },
  TOKEN: '/token/',
  USERS: {
    GOOGLE: '/users/login/google/',
    KAKAO: '/users/login/kakao/',
    LOGOUT: '/users/logout/',
    WITHDRAW: '/users/withdraw/',
    ME: '/users/me/', // get, put, patch
  },
  STORY: {
    LIST: '/stories/', // get, post
    DETAIL: (id: string) => `/stories/${id}/`, // get, put, delete
  },
  STORY_IMAGE: {
    UPLOAD: (id: number) => `/stories/${id}/images/`,
    DELETE: (storyId: number, imageId: number) =>
      `/stories/${storyId}/images/${imageId}/`,
    LIST: (id: number) => `/stories/${id}/images/`,
  },
  COMMENT: {
    LIST: (id: number) => `/stories/${id}/comments/`, // get, post
    DETAIL: (storyId: number, commentId: number) =>
      `/stories/${storyId}/comments/${commentId}/`, // get, put, delete
    IMAGE: (storyId: number, commentId: number) =>
      `/stories/${storyId}/comments/${commentId}/images/`, // get, post,
  },
  BOOKMARK: {
    LIST: '/bookmarks/', // get, post
    DETAIL: (id: number) => `/bookmarks/${id}/`,
  },
  STORYLIKE: {
    LIKE: (id: string) => `/stories/${id}/likes/`,
  },
  MARKER: {
    LIST: '/markers/', // get, post
    DETAIL: (id: number) => `/markers/${id}/`, // get, put, delete
    LIKE: (id: number) => `/markers/${id}/likes/`, // get, post, delete
  },
  ROUTE: {
    LIST: '/routes/', // get, post
    DETAIL: (id: number) => `/routes/${id}/`, // get, put, delete
    LIKE: (id: number) => `/routes/${id}/likes/`, // get, post, delete
  },
  ROUTEMARKER: {
    LIST: '/route-markers/', // get, post
    DETAIL: (id: number) => `/route-markers/${id}/`, // put, delete
    UPDATE: '/route-markers/bulk-update/',
  },
  PAYMENT: {
    LIST: '/payments/', // get, post
    DETAIL: (id: number) => `/payments/${id}/`, // get, delete
  },
} as const;
