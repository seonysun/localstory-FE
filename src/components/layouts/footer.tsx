import React from 'react';
import Link from 'next/link';
import { LogoIcon } from '@components/icons';
import {
  ContactItem,
  ContactSection,
  LogoSection,
  MenuSection,
  Wrapper,
} from '@components/layouts/footer.recipe';

import { FOOTER_CONTACT, FOOTER_MENU } from '@/constants/footer';

import { css } from '@root/styled-system/css';

function Footer() {
  return (
    <footer className={css({ bg: 'gray.100', width: '100%' })}>
      <div className={Wrapper()}>
        <div className={LogoSection()}>
          <LogoIcon width={150} />
        </div>
        <address className={ContactSection()}>
          <ul>
            {FOOTER_CONTACT.map(({ label, value, text }) => (
              <li className={ContactItem()} key={label}>
                <span>{label}</span>
                <a href={value} target="_blank" rel="noopener noreferrer">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </address>
        <nav className={MenuSection()} aria-label="Footer Navigation">
          <ul>
            {FOOTER_MENU.map(({ title, path }) => (
              <li key={title} className={css({ mb: 1 })}>
                <Link href={path}>{title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
