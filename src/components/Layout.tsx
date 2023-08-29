import React from "react";
import {Pages} from "../types";

interface LayoutProps {
  children: React.ReactNode;
  page: Pages;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

interface LayoutButtonProps {
  page: Pages;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

const LayoutButton = ({ page, setPage }: LayoutButtonProps) => {
  switch (page) {
    case Pages.Game:
    default:
      return (
        <a
          className="btn"
          onClick={() => setPage(Pages.Settings)}
        >
          Select symbols
        </a>
      );
    case Pages.Settings:
    return (
      <a
        className="btn"
        onClick={() => setPage(Pages.Game)}
      >
        Play game
      </a>
    );
  }
}

export const Layout = ({children, page, setPage}: LayoutProps) => (
  <>
    <div className="navbar bg-base-100">
      <div className="navbar-start"></div>
      <div className="navbar-center hidden lg:flex">
        <LayoutButton page={page} setPage={setPage} />
      </div>
      <div className="navbar-end"></div>
    </div>
    <div className="prose p-8 flex justify-center max-w-max text-center">
      {children}
    </div>
  </>
);
