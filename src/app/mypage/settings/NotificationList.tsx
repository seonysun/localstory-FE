'use client';

import { useEffect } from 'react';
import { ENDPOINTS } from '@api/endpoints';
import { instance } from '@api/instance';
import { notificationOption } from '@api/options/notificationOption';
import IconWrapper from '@components/icons/IconWrapper';
import { Switches } from '@components/ui/common/toggles';
import { useNotificationWebSocket } from '@hooks/useNotificationSocket';
import { useMutation, useQuery } from '@tanstack/react-query';

import OpenBookIcon from '@/components/icons/business/OpenBookIcon';
import UserIcon from '@/components/icons/business/UserIcon';
import CommentsIcon from '@/components/icons/ui/CommentsIcon';
import { useNotificationStore } from '@/store/useNotificationStore';

import { css } from '@root/styled-system/css';

const NOTIFICATION_TYPES = ['followe', 'post', 'comment'] as const;
type NotificationType = (typeof NOTIFICATION_TYPES)[number];

const NOTIFICATION_LABELS: Record<NotificationType, string> = {
  followe: '팔로우 알림',
  post: '게시물 알림',
  comment: '댓글 알림',
} as const;

const NOTIFICATION_ICONS: Record<NotificationType, React.ComponentType<any>> = {
  followe: UserIcon,
  post: OpenBookIcon,
  comment: CommentsIcon,
} as const;

export default function NotificationList() {
  const { settings, setSettings, updateSetting } = useNotificationStore();
  useNotificationWebSocket();
  const { data, isError, isLoading } = useQuery({
    queryKey: ['notice'],
    queryFn: () =>
      instance.get(ENDPOINTS.NOTIFICATIONS.LIST).then(res => res.data),
  });

  useEffect(() => {
    if (data) {
      const serverSettings = data?.results || [];
      const mergedSettings = NOTIFICATION_TYPES.map(type => {
        const found = serverSettings.find((s: any) => s.type === type);
        return found || { type, enabled: false };
      });
      setSettings(mergedSettings);
    }
  }, [data, setSettings]);

  const mutation = useMutation({
    ...notificationOption.postNotificationSetting(),
    onSuccess: data => {
      updateSetting(data?.type, data?.enabled);
    },
    // Todo 소켓 붙이고 에러 처리
  });

  const toggle = (type: string, enabled: boolean) => {
    mutation.mutate({ type, enabled });
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>알림 설정을 불러오지 못했습니다.</div>;

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
      {settings?.map((setting, idx) => {
        const type = setting.type as NotificationType;
        const IconComponent = NOTIFICATION_ICONS[type];
        if (!IconComponent) return null;
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
              onChange={checked => {
                toggle(type, checked);
              }}
              aria-label={NOTIFICATION_LABELS[type]}
            />
          </div>
        );
      })}
    </div>
  );
}
