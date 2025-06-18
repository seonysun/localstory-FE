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

  const menuItems: MenuItem[] = [
    {
      title: '북마크',
      icon: BookmarkIcon,
      route: '/bookmarks',
      colorMode: 'stroke',
    },
    {
      title: 'Feelings and Thoughts',
      icon: TravelIcon,
      route: '/feelings',
      colorMode: 'stroke',
    },
    {
      title: '구독',
      icon: VersionIcon,
      route: '/subscribe',
      colorMode: 'stroke',
    },
    {
      title: '설정',
      icon: SettingsIcon,
      route: '/settings',
      colorMode: 'fill',
    },
    {
      title: '회원탈퇴',
      icon: LogoutIcon,
      colorMode: 'stroke',
      action: () => {
        // 회원 탈퇴 로직
        router.push('/');
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
