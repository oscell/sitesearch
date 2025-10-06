import type React from "react";
import { SearchIcon } from "./icons";

interface SearchButtonProps {
  onClick: () => void;
  darkMode?: boolean;
  children?: React.ReactNode;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  onClick,
  darkMode,
}) => {
  return (
    <button
      className={`sitesearch-button${darkMode ? " dark" : ""}`}
      type="button"
      onClick={onClick}
      aria-label="Open search"
    >
      <span className="search-icon">
        <SearchIcon />
      </span>
      <span className="button-text">Search</span>
      <span className="keyboard-shortcut">⌘ K</span>
    </button>
  );
};
