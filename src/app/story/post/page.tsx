import StoryPostForm from '@/components/story/StoryPostForm';
import PageHeader from '@/components/ui/common/pageHeader/PageHeader';

function page() {
  return (
    <>
      <PageHeader title="스토리" />
      <StoryPostForm />
    </>
  );
}

export default page;
