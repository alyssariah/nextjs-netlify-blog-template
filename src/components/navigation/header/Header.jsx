/* eslint-disable @next/next/no-html-link-for-pages */
import React, { useState } from 'react';
import { HamburgerMenu } from '../hamburger-menu/HamburgerMenu';
import styles from './header.module.scss';
// import { RiShoppingCartLine } from 'react-icons/ri';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Image from 'next/image';

export const Header = ({ links, stickyHeader }) => {
  const router = useRouter();
  const [active, setActive] = useState(false);

  return (
    <>
      <header
        className={
          styles.header +
          ' flex justify-center w[100%] lg:px-4 ' +
          (stickyHeader ? 'sticky top-[0px]' : '')
        }
      >
        <div className="flex justify-between items-center w-[100%] max-w-[1440px] pr-4 lg:px-4 ">
          <div className="block lg:hidden w-[60px]">
            <HamburgerMenu animationType={'rotateX'} active={active} setActive={setActive} />
          </div>
          <div className="flex space-x-0 items-center">
            <div className="lg:w-[163px] h-[55px] flex justify-start items-center hover:cursor-pointer">
              <a href="/" className="text-heading-sm text-red-400 font-logo">
                ALTRO
              </a>
            </div>
            <ul className="hidden lg:flex justify-around pt-1">
              {links.map((link, i) => {
                return (
                  <li
                    key={i}
                    className={clsx('text-grey-200 mx-4 hover:text-white-500', {
                      ['text-[#FFFFFF]']: router.pathname.includes(link.label.toLowerCase()),
                      ['text-surface--variant ']: router.pathname !== link.url,
                    })}
                  >
                    {link.target ? (
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.url}>{link.label}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex justify-end w-[60px] lg:w-[162px]">
            <Image src="/robotic-logo.svg" alt="robotic logo" width="50px" height="40px" />
          </div>
        </div>
      </header>
      <div
        className={clsx(
          'lg:hidden w-[100%] h-[98vh] overflow-hidden bg-grey-900 fixed top-[55px] z-[400] opacity-0 transition-opacity duration-500 ease-in-out py-8',
          {
            ['opacity-100']: active,
          }
        )}
      >
        <ul className="flex flex-col space-y-4">
          {links.map((link, i) => {
            return (
              <li
                key={i}
                className={clsx('text-grey-200 mx-5 hover:text-white-500 text-body-md', {
                  ['text-[#FFFFFF]']: router.pathname === link.url,
                  ['text-surface--variant ']: router.pathname !== link.url,
                })}
              >
                {link.target ? (
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.url}>{link.label}</Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

Header.propTypes = {
  /**
   * Sticky header
   */
  stickyHeader: PropTypes.bool,
  /**
   * Logo URL string
   */
  logoUrl: PropTypes.string,
  /**
   * Navigation bar links
   */
  links: PropTypes.arrayOf(PropTypes.object),
};

Header.defaultProps = {
  stickyHeader: true,
  logoUrl: '/logo.png',
  links: [
    {
      label: 'Docs',
      url: '/docs/welcome',
    },
    {
      label: 'Citing',
      url: '/citing',
    },
    {
      label: 'Github',
      url: '/github',
    },
  ],
};
