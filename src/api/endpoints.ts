export const ENDPOINTS = {
  AI: {
    CHAT: '/ai/chat/',
    SUMMARY: '/ai/summarize/',
  },
  FOLLOWS: {
    LIST: '/follows/', // get, post
    DETAIL: (id: string) => `/follows/${id}/`, // get, put, patch, delete
  },
  SUBSCRIBE: {
    LIST: '/subscribes/', // get, post
    DETAIL: (id: string) => `/subscribes/${id}/`, // get, delete
  },
  NOTIFICATIONS: {
    LIST: '/notifications/', // get, post
    DETAIL: (id: string) => `/notifications/${id}/`, // get, put, patch, delete
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
    ME: '/stories/me/',
    MARKER: (id: number) => `/stories/marker/${id}/`,
    DETAIL: (id: string) => `/stories/${id}`, // get, put, delete
  },
  STORY_IMAGE: {
    UPLOAD: (id: number) => `/stories/${id}/images/`,
    DELETE: (storyId: number, imageId: number) =>
      `/stories/${storyId}/images/${imageId}/`,
    LIST: (id: number) => `/stories/${id}/images/`,
  },
  COMMENT: {
    LIST: (id: string) => `/stories/${id}/comments/`, // get, post
    DETAIL: (storyId: string, commentId: string) =>
      `/stories/${storyId}/comments/${commentId}/`, // get, put, delete
    IMAGE: (storyId: number, commentId: number) =>
      `/stories/${storyId}/comments/${commentId}/images/`, // get, post,
  },
  COMMENTLIKE: {
    DETAIL: (storyId: string, commentId: string) =>
      `/stories/${storyId}/comments/${commentId}/likes/`,
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
    LIKE: {
      LIST: (id: number) => `/markers/${id}/likes/`,
      STATUS: (id: number) => `/markers/${id}/likes/status/`,
      TOGGLE: (id: number) => `/markers/${id}/likes/toggle/`,
    },
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
