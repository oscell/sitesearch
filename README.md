# Algolia SiteSearch

🫆 Opinionated InstantSearch experience for your Site search needs, powered by Algolia's [Instant Search](https://www.algolia.com/doc/guides/building-search-ui/what-is-instantsearch/js/) and [AskAI](https://www.algolia.com/products/ai/ask-ai)

[![CodeSandbox](https://img.shields.io/badge/Codesandbox-040404?style=for-the-badge&logo=codesandbox&logoColor=DBDBDB)](https://codesandbox.io/p/github/algolia/sitesearch)

## Overview

SiteSearch provides production-ready search components that combine Algolia's lightning-fast search capabilities with intelligent AI chat functionality. Available as both React implementations and vanilla JavaScript (WIP), it offers a complete search solution that can be integrated into any modern web application.

### Key Features

- **⚡ Instant Search** - Sub-50ms search powered by Algolia's global infrastructure
- **🤖 AI-Enhanced** - Conversational chat interface for complex queries using [Ask AI](https://www.algolia.com/products/ai/ask-ai)
- **⌨️ Keyboard-First** - Full keyboard navigation with customizable shortcuts
- **🎨 Extensible** - UI with comprehensive theming system
- **♿ Accessible** - WCAG 2.1 AA compliant with screen reader support
- **📦 Framework Agnostic** - Works with React and bundles to vanilla JS, or any framework
- **🔧 Developer Experience** - TypeScript support with comprehensive documentation

## Pre-requisites

1. Get an [Algolia](dashboard.algolia.com) account
2. Setup an index – grab the [Index name](https://dashboard.algolia.com/indices) and [Search API key](https://dashboard.algolia.com/account/api-keys)
3. [Optional] Create an [Ask AI assistant](https://dashboard.algolia.com/apps/ask-ai) (only if you need Ask AI)

## Quick Start

### Shadcn

Install sitesearch components from our public repository

```bash
npx shadcn@latest add @algolia/search
```

[Find other components](https://sitesearch.algolia.com/docs/experiences/search)

### Manual

#### 1. Copy Component Code

Visit [CodeSandbox Demo](https://codesandbox.io/p/github/algolia/sitesearch), download your needed components in `packages/registry/registry/experiences/` or copy from the examples below:

#### 2. Install Dependencies

```bash
npm install @ai-sdk/react ai algoliasearch react-instantsearch marked
```

#### 3. Use in Your Project

```tsx
import SearchWithAskAI from './components/sitesearch';

function App() {
  return (
    <SearchWithAskAI
      applicationId="YOUR_APP_ID"
      apiKey="YOUR_API_KEY"
      indexName="YOUR_INDEX_NAME"
      assistantId="YOUR_ASSISTANT_ID"
      placeholder="Search anything..."
    />
  );
}
```

That's it! No complex setup, no configuration files, no build processes.

## Theming

We ship sitesearch with all the CSS needed for configuration. For light theme changes use our available CSS variables and for more advanced usecases, you can change the CSS to **ANYTHING**

Feel free to tweak sitesearch to your convenience!

## ⌨️ Keyboard Shortcuts

- **Cmd/Ctrl + K**: Open search modal
- **Arrow Keys**: Navigate results
- **Enter**: Select result or trigger AI chat
- **Escape**: Close modal

### Generate JS Bundle

```bash
# Generate vanilla JS and CSS bundle for easy copy-paste
pnpm build:js-bundle
```

## Configuration

### Algolia Setup

1. Create an Algolia account
2. Create an index with your data
3. Get your Application ID and API Key
4. Create an AI Assistant for chat functionality (Optional – only for Ask AI)

### Required Dependencies

```json
{
  "@ai-sdk/react": "^2.0.4",
  "ai": "^5.0.30",
  "algoliasearch": "5",
  "react-instantsearch": "7.16.2",
  "marked": "^16.3.0",
}
```

## Contributing

1. Fork the repository
2. Add your component to `apps/docs/src/registry/experiences`
3. Submit a PR

## License

MIT License - see LICENSE.md file for details.
