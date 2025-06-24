'use client';

import OpenBookIcon from '@/components/icons/business/OpenBookIcon';
import UserIcon from '@/components/icons/business/UserIcon';
import IconWrapper from '@/components/icons/IconWrapper';
import CommentsIcon from '@/components/icons/ui/CommentsIcon';
import { Switches } from '@/components/ui/common/toggles/Switch';
import { useNotificationStore } from '@/store/useNotificationStore';

import { css } from '@root/styled-system/css';

const NOTIFICATION_TYPES = ['follower', 'post', 'comment'] as const;
type NotificationType = (typeof NOTIFICATION_TYPES)[number];

const NOTIFICATION_LABELS: Record<NotificationType, string> = {
  follower: '팔로우 알림',
  post: '게시물 알림',
  comment: '댓글 알림',
} as const;

const NOTIFICATION_ICONS: Record<NotificationType, React.ComponentType<any>> = {
  follower: UserIcon,
  post: OpenBookIcon,
  comment: CommentsIcon,
} as const;

export default function NotificationList() {
  const { settings, updateSetting } = useNotificationStore();

  return (
    <div
      className={css({
        width: '100%',
        bg: 'white',
        borderRadius: 'lg',
        boxShadow: 'sm',
        py: '4px',
        px: '0px',
        maxWidth: '100%',
      })}
    >
      {settings.map((setting, idx) => {
        const type = setting.type as NotificationType;
        const IconComponent = NOTIFICATION_ICONS[type];
        const iconOpacity = setting.enabled ? 0.8 : 0.2;

        return (
          <div
            key={setting.type}
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: '12px',
              px: '20px',
              borderBottom: idx < settings.length - 1 ? '1px solid' : 'none',
              borderColor: 'gray.100',
              gap: '16px',
            })}
          >
            <div
              className={css({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              })}
            >
              <IconWrapper size={22} style={{ opacity: iconOpacity }}>
                <IconComponent />
              </IconWrapper>
              <span
                className={css({
                  fontSize: '16px',
                  fontWeight: 400,
                  color: 'text',
                })}
              >
                {NOTIFICATION_LABELS[type]}
              </span>
            </div>
            <Switches
              checked={setting.enabled}
              onChange={checked => updateSetting(setting.type, checked)}
              aria-label={NOTIFICATION_LABELS[type]}
            />
          </div>
        );
      })}
    </div>
  );
}
