'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

import {
  BookmarkIcon,
  ChevronRightIcon,
  LogoutIcon,
  SettingsIcon,
  TravelIcon,
  VersionIcon,
} from '@/components/icons';
import IconWrapper from '@/components/icons/IconWrapper';
import { useModalStore } from '@/store/useModalStore';

import {
  menuButton,
  menuItem,
  menuItemLeft,
  menuItemTitle,
  menuList as menuListStyles,
  menuListContainer,
} from './mypage.recipe';

interface MenuItem {
  title: string;
  icon: React.ComponentType<any>;
  route?: string;
  colorMode?: 'auto' | 'fill' | 'stroke' | 'both';
  action?: () => void;
}

export default function MypageMenuList() {
  const router = useRouter();
  const { open } = useModalStore();

  const menuItems: MenuItem[] = [
    {
      title: '북마크',
      icon: BookmarkIcon,
      route: '/mypage/bookmarks',
      colorMode: 'stroke',
    },
    {
      title: 'Feelings and Thoughts',
      icon: TravelIcon,
      route: '/mypage/feelings',
      colorMode: 'stroke',
    },
    {
      title: '구독',
      icon: VersionIcon,
      route: '/mypage/subscribe',
      colorMode: 'stroke',
    },
    {
      title: '설정',
      icon: SettingsIcon,
      route: '/mypage/settings',
      colorMode: 'fill',
    },
    {
      title: '회원탈퇴',
      icon: LogoutIcon,
      colorMode: 'stroke',
      action: () => {
        open();
      },
    },
  ];

  const handleMenuClick = (item: MenuItem) => {
    if (item.action) {
      item.action();
    } else if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <div className={menuListContainer()}>
      <ul className={menuListStyles()}>
        {menuItems.map(item => {
          const IconComponent = item.icon;

          return (
            <li key={item.title} className={menuItem()}>
              <button
                type="button"
                className={menuButton()}
                onClick={() => handleMenuClick(item)}
              >
                <div className={menuItemLeft()}>
                  <IconWrapper
                    size={24}
                    color="#7D848D"
                    strokeWidth={1.5}
                    colorMode={item.colorMode}
                  >
                    <IconComponent />
                  </IconWrapper>
                  <span className={menuItemTitle()}>{item.title}</span>
                </div>
                <ChevronRightIcon size={20} color="#C9C9C9" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
