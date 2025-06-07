import { create } from 'zustand';

export type CommentItem = {
  id: number;
  title: string;
  parentId: number | null;
};

export type UseInputMode = {
  mode: 'unknown' | 'reply' | 'edit';
  payload: {
    parent?: number | null;
    value?: string;
    commentId?: number;
  };
};

type CommentStore = {
  comments: CommentItem[];
  setComments: (comments: CommentItem[]) => void;
  inputMode: UseInputMode;
  setInputMode: (inputMode: UseInputMode) => void;
  rootInputValue: string;
  setRootInputValue: (value: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  onSubmitRoot: () => void;
  onCancel: () => void;
  onDelete: () => void;
};

export const useCommentStore = create<CommentStore>((set, get) => ({
  comments: [],
  setComments: comments => set({ comments }),
  inputMode: { mode: 'unknown', payload: {} },
  setInputMode: inputMode => set({ inputMode }),
  rootInputValue: '',
  setRootInputValue: value => set({ rootInputValue: value }),
  onChange: e => {
    set(state => ({
      inputMode: {
        ...state.inputMode,
        payload: {
          ...state.inputMode.payload,
          value: e.target.value,
        },
      },
    }));
  },
  onSubmit: () => {
    const { inputMode } = get();
    if (!inputMode.payload.value?.trim()) {
      return;
    }
    switch (inputMode.mode) {
      case 'reply':
        if (inputMode.payload.parent === undefined) {
          return;
        }
        set(state => ({
          comments: [
            ...state.comments,
            {
              id: state.comments.length + 1,
              title: inputMode.payload.value ?? '',
              parentId: inputMode.payload.parent ?? null,
            },
          ],
          inputMode: { mode: 'unknown', payload: {} },
        }));
        break;
      case 'edit':
        set(state => ({
          comments: [
            ...state.comments.map(comment =>
              comment.id === inputMode.payload.commentId
                ? { ...comment, title: inputMode.payload.value ?? '' }
                : comment,
            ),
          ],
          inputMode: { mode: 'unknown', payload: {} },
        }));
        break;
      default:
        break;
    }
  },
  onSubmitRoot: () => {
    const { rootInputValue } = get();
    if (!rootInputValue.trim()) return;
    set(state => ({
      comments: [
        ...state.comments,
        {
          id: state.comments.length + 1,
          title: rootInputValue,
          parentId: null,
        },
      ],
      rootInputValue: '',
    }));
  },
  onCancel: () => {
    set({ inputMode: { mode: 'unknown', payload: {} } });
  },
  onDelete: () => {
    const { inputMode, comments } = get();
    const deleteTargetId = inputMode.payload.commentId;

    if (!deleteTargetId) {
      return;
    }
    const targetComment = comments.find(
      comment => comment.id === deleteTargetId,
    );
    if (!targetComment) {
      return;
    }
    const idsToDelete = [deleteTargetId];
    const isRoot = targetComment.parentId === null;
    if (isRoot) {
      const childIds = comments
        .filter(c => c.parentId === deleteTargetId)
        .map(c => c.id);
      idsToDelete.push(...childIds);
    }
    set(state => ({
      comments: state.comments.filter(
        comment => !idsToDelete.includes(comment.id),
      ),
      inputMode: { mode: 'unknown', payload: {} },
    }));
  },
}));
