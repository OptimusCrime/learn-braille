import React from 'react';
import { Pages } from '../types';

interface LayoutButtonProps {
  page: Pages;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

const LayoutButton = ({ page, setPage }: LayoutButtonProps) => {
  switch (page) {
    case Pages.Game:
    default:
      return (
        <a className="link" onClick={() => setPage(Pages.Settings)}>
          Select symbols
        </a>
      );
    case Pages.Settings:
      return (
        <a className="link" onClick={() => setPage(Pages.Game)}>
          Return to the game
        </a>
      );
  }
};

interface LayoutProps {
  children: React.ReactNode;
  page: Pages;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

export const Layout = ({ children, page, setPage }: LayoutProps) => (
  <>
    <div className="navbar bg-base-200">
      <div className="navbar-start"></div>
      <div className="navbar-center hidden lg:flex">
        <div className="prose">
          <h2>Learn braille</h2>
        </div>
      </div>
      <div className="navbar-end pr-8">
        <LayoutButton page={page} setPage={setPage} />
      </div>
    </div>
    <div className="p-8 flex justify-center w-full text-center">{children}</div>
  </>
);
