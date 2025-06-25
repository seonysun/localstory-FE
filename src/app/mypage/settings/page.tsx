import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('./ThemeToggle'), { ssr: false });
const NotificationList = dynamic(() => import('./NotificationList'), {
  ssr: false,
});

export default function MypageSettingsPage() {
  return (
    <section style={{ width: '100%' }}>
      <ThemeToggle />
      <NotificationList />
    </section>
  );
}
