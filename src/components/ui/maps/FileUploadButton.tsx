import { useRef } from 'react';

import { Button } from '@/components/ui/common/buttons/Button';

function FileUploadButton({
  setImages,
}: {
  setImages: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onUpload = () => {
    inputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      setImages([files[0]]);
    }
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
        style={{ display: 'none' }}
      />
    </>
  );
}

export default FileUploadButton;
