import { useRef } from 'react';

import { Button } from '@/components/ui/common/buttons/Button';

function FileUploadButton({
  images,
  setImages,
  setError,
}: {
  images: File[];
  setImages: (files: File[]) => void;
  setError: (msg: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUpload = () => {
    inputRef.current?.click();
  };

  const MAX_SIZE_MB = 2;
  const MAX_COUNT = 5;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(
      file => file.size <= MAX_SIZE_MB * 1024 * 1024,
    );

    if (validFiles.length < files.length) {
      setError('2MB를 초과하는 이미지는 업로드할 수 없습니다.');
    }

    const totalFiles = [...images, ...validFiles];
    if (totalFiles.length > MAX_COUNT) {
      setError(`이미지는 최대 ${MAX_COUNT}장까지 업로드할 수 있어요.`);
      return;
    }

    setImages(totalFiles);
  };

  return (
    <>
      <Button color="outline" size="sm" onClick={onUpload}>
        이미지 첨부
      </Button>
      <input
        type="file"
        ref={inputRef}
        onChange={onFileChange}
        accept="image/*"
        multiple
        style={{ display: 'none' }}
      />
    </>
  );
}

export default FileUploadButton;
