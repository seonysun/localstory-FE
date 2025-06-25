import NotificationList from './NotificationList';
import ThemeToggle from './ThemeToggle';

export default function MypageSettingsPage() {
  return (
    <section style={{ width: '100%' }}>
      <ThemeToggle />
      <NotificationList />
    </section>
  );
}
