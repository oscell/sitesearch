import type { RefObject } from "react";
import { memo, useEffect, useState } from "react";
import { useInstantSearch, useSearchBox } from "react-instantsearch";
import { ArrowLeftIcon, CloseIcon, SearchIcon } from "./icons";

export interface SearchInputProps {
  placeholder?: string;
  className?: string;
  showChat: boolean;
  isGenerating?: boolean;
  inputRef: RefObject<HTMLInputElement | null>;
  onClose: () => void;
  setShowChat: (show: boolean) => void;
  onArrowDown?: () => void;
  onArrowUp?: () => void;
  onEnter?: (value: string) => boolean;
}

const SearchLeftButton = memo(function SearchLeftButton({
  showChat,
  setShowChat,
}: {
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}) {
  if (showChat) {
    return (
      <button
        type="button"
        onClick={() => setShowChat(false)}
        className="ss-search-left-button"
        aria-label="Back to search"
        title="Back to search"
      >
        <ArrowLeftIcon />
      </button>
    );
  }

  return (
    <div
      // biome-ignore lint/a11y/useSemanticElements: hand crafted
      role="button"
      tabIndex={-1}
      className="ss-search-left-button"
      aria-label="Search"
      title="Search"
    >
      <SearchIcon />
    </div>
  );
});

export const SearchInput = memo(function SearchInput(props: SearchInputProps) {
  const { status } = useInstantSearch();
  const { query, refine } = useSearchBox();
  const [inputValue, setInputValue] = useState(query || "");

  const isSearchStalled = status === "stalled";

  function setQuery(newQuery: string) {
    setInputValue(newQuery);
    if (!props.showChat) {
      refine(newQuery);
    }
  }

  if (props.inputRef.current) {
    props.inputRef.current.focus();
  }

  useEffect(() => {
    // Clear the input when entering chat mode
    if (props.showChat) {
      setInputValue("");
    }
    // keep the input value in sync with the query
    if (query !== inputValue) {
      setInputValue(query || "");
    }
  }, [props.showChat, query, inputValue]);

  // Placeholder logic:
  // - if generating, show "Answering..."
  // - else if showChat, show AI prompt placeholder
  // - else show provided placeholder
  const placeholder = props.isGenerating
    ? "Answering..."
    : props.showChat
      ? "Ask AI anything about Algolia"
      : props.placeholder;

  return (
    <search
      className={props.className}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();

        setQuery("");
        if (props.inputRef.current) {
          props.inputRef.current.focus();
        }
      }}
    >
      <SearchLeftButton
        showChat={props.showChat}
        setShowChat={props.setShowChat}
      />
      <input
        ref={props.inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder={placeholder}
        spellCheck={false}
        maxLength={512}
        type="search"
        value={inputValue}
        disabled={props.isGenerating}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
        onKeyDown={(e) => {
          if (props.isGenerating) {
            // while answering, block interactions
            e.preventDefault();
            return;
          }
          if (e.key === "ArrowDown") {
            e.preventDefault();
            props.onArrowDown?.();
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            props.onArrowUp?.();
            return;
          }
          if (e.key === "Enter") {
            e.preventDefault();
            if (props.onEnter?.(inputValue)) {
              // If handled by parent (e.g., send in chat), clear the input
              setQuery("");
              return;
            }
            const trimmed = inputValue.trim();
            if (trimmed) {
              // Open chat; parent will send the query
              props.setShowChat(true);
            }
          }
        }}
        // biome-ignore lint/a11y/noAutofocus: expected
        autoFocus
      />
      <div className="ss-search-action-buttons-container">
        <button
          type="reset"
          className="ss-search-clear-button"
          hidden={!inputValue || inputValue.length === 0 || isSearchStalled}
          onClick={() => {
            setQuery("");
          }}
        >
          Clear
        </button>
        <button
          type="button"
          className="ss-search-close-button"
          onClick={props.onClose}
        >
          <CloseIcon />
        </button>
      </div>
    </search>
  );
});
