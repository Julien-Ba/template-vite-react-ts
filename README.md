# template-vite-react-ts

This project was created with Vite, React, and TypeScript.

## Stack

-   React
-   TypeScript
-   React Router
-   Zustand
-   React Query
-   SASS

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### `npm run build`

Builds the app for production to the `dist` folder.

### `npm run preview`

Previews the production build locally.

## Project Structure

```
src/
├── assets/      # Static assets
├── components/  # Reusable UI components
├── features/    # Feature-specific components and logic
├── hooks/       # Custom React hooks
├── layouts/     # Layout components
├── pages/       # Page components
├── services/    # API services
├── store/       # Zustand stores
├── styles/      # Global styles and SASS variables
├── types/       # TypeScript type definitions
├── utils/       # Utility functions
├── config/      # Configuration files
├── App.tsx      # Main App component
├── router.tsx   # Router configuration
└── main.tsx     # Entry point
```

## Template script

I created a script to automate the creation of this template. You can find it in this repository.
Feel free to use it / modify it to your needs.

## Prerequisites

This template script requires:

-   [Bun](https://bun.sh/) - Used for package management and project creation
-   [GitHub CLI](https://cli.github.com/) (optional) - Required only if you want to create a GitHub repository automatically with the `--github` flag

### Installing Prerequisites

#### Bun

```bash
# macOS or Linux
curl -fsSL https://bun.sh/install | bash

# Windows via WSL
WSL=1 curl -fsSL https://bun.sh/install | bash
```

#### GitHub CLI

```bash
# macOS
brew install gh

# Windows
winget install -e --id GitHub.cli
```

## Using the Script

1. Save the script to a file (e.g., `create-vite-react-project.sh`)
2. Make it executable:
    ```bash
    chmod +x create-vite-react-project.sh
    ```
3. Run it:
    ```bash
    ./create-vite-react-project.sh my-project-name
    ```

### Options

-   `--public` or `--pub` or `-P`: Create a public GitHub repository
-   `--github` or `--gh` or `-G`: Create a GitHub repository (private by default)

### Examples

```bash
# Create a local project only
./create-vite-react-project.sh my-project

# Create a project with a private GitHub repository
./create-vite-react-project.sh my-project --gh

# Create a project with a public GitHub repository
./create-vite-react-project.sh my-project --pub
```

## Making the Script Globally Available

To use the script from anywhere on your system:

```bash
# Create a bin directory if it doesn't exist
mkdir -p ~/bin

# Move the script to your bin directory
mv create-vite-react-project.sh ~/bin/create-vite-react-project

# Make it executable
chmod +x ~/bin/create-vite-react-project

# Add to PATH (add this to your .bashrc, .zshrc, etc.)
export PATH="$HOME/bin:$PATH"
```

Then you can run it from anywhere:

```bash
create-vite-react-project my-new-project
```

## Script

```bash
#!/bin/bash

# Default values for the github repo
VISIBILITY="private"
CREATE_GITHUB_REPO=false

# Process named arguments
for arg in "$@"; do
    case $arg in
        --public|--pub|-P)
            VISIBILITY="public"
            CREATE_GITHUB_REPO=true
            ;;
        --github|--gh|-G)
            CREATE_GITHUB_REPO=true
            ;;
    esac
done

# Project name is the first non-flag argument
PROJECT_NAME=""
for arg in "$@"; do
    if [[ ! $arg == --* && ! $arg == -* ]]; then
        PROJECT_NAME=$arg
        break
    fi
done

# Check if a project name was provided
if [ -z "$PROJECT_NAME" ]; then
    echo "Please provide a project name: ./create-react-vite-project.sh my-project-name [--public|--pub|-P] [--github|--gh|-G]"
    exit 1
fi

# Create Vite project with React TypeScript template
echo "Creating React project with Vite and TypeScript..."
bun create vite@latest $PROJECT_NAME --template react-ts

# Navigate to project directory
cd $PROJECT_NAME

# Install base dependencies
echo "Installing base dependencies..."
bun install

# Install additional dependencies based on preferences
echo "Installing additional dependencies..."
bun install react-router-dom zustand @tanstack/react-query

# Install dev dependencies
echo "Installing development dependencies..."
bun install -D sass @tanstack/eslint-plugin-query @types/node

# Create folder structure
echo "Setting up folder structure..."
mkdir -p src/assets src/components src/features src/hooks src/layouts src/pages src/services src/store src/styles src/types src/utils src/config

# Initialize Git repository
echo "Initializing Git repository..."
git init
git branch -M main

echo "Updating .gitignore..."
cat > .gitignore << 'EOF'
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Coverage reports
coverage

# Build caches
.cache
.temp
.tmp
EOF

# Update eslint.config.js
echo "Updating eslint.config.js..."
cat > eslint.config.js << 'EOF'
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    { ignores: ['dist'] },
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        },
    }
);
EOF

# Update tsconfig.json with path aliases
echo "Updating tsconfig.app.json with path aliases..."
cat > tsconfig.app.json << 'EOF'
{
    "compilerOptions": {
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
        "target": "ES2020",
        "useDefineForClassFields": true,
        "lib": ["ES2020", "DOM", "DOM.Iterable"],
        "module": "ESNext",
        "skipLibCheck": true,

        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "isolatedModules": true,
        "moduleDetection": "force",
        "noEmit": true,
        "jsx": "react-jsx",

        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true,

        /* custom */
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    },
    "include": ["src"]
}
EOF

echo "Updating tsconfig.node.json with path aliases..."
cat > tsconfig.node.json << 'EOF'
{
    "compilerOptions": {
        "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
        "target": "ES2022",
        "lib": ["ES2023"],
        "module": "ESNext",
        "skipLibCheck": true,

        /* Bundler mode */
        "moduleResolution": "bundler",
        "allowImportingTsExtensions": true,
        "isolatedModules": true,
        "moduleDetection": "force",
        "noEmit": true,

        /* Linting */
        "strict": true,
        "noUnusedLocals": true,
        "noUnusedParameters": true,
        "noFallthroughCasesInSwitch": true,
        "noUncheckedSideEffectImports": true,

        /* custom */
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    },
    "include": ["vite.config.ts"]
}
EOF

echo "Updating tsconfig.json..."
cat > tsconfig.json << 'EOF'
{
    "files": [],
    "references": [{ "path": "./tsconfig.app.json" }, { "path": "./tsconfig.node.json" }]
}
EOF

# Update vite.config.ts with path aliases
echo "Updating Vite configuration with path aliases..."
cat > vite.config.ts << 'EOF'
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
EOF

# Remove regular css
echo "Removing regular css files..."
rm -f src/App.css src/index.css

# Create a basic styles setup with SASS
echo "Creating base styles with SASS..."
cat > src/App.scss << 'EOF'
@use '@/styles/reset';
@use '@/styles/breakpoints';
@use '@/styles/colors';
@use '@/styles/animations';

:root {
    background-color: colors.$bg-primary;
    font-family: Roboto, system-ui, 'Segoe UI', Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue',
        sans-serif;
    color: colors.$text-primary;
}

#root {
    width: 100%;
    max-width: breakpoints.$max;
    min-width: breakpoints.$min;
    min-height: 100dvh;
    margin: auto;
    display: flex;
    flex-direction: column;
}

main {
    flex: 1;
}
EOF

cat > src/styles/_animations.scss << 'EOF'
EOF

cat > src/styles/_breakpoints.scss << 'EOF'
$max: 1440px;
$medium: 1024px;
$small: 768px;
$min: 320px;
EOF

cat > src/styles/_colors.scss << 'EOF'
:root {
    --bg-primary-rgb: 248, 250, 252;
    --bg-secondary-rgb: 195, 223, 247;
    --bg-card-rgb: 240, 240, 240;
    --bg-button-rgb: 65, 90, 119;
    --text-primary-rgb: 50, 54, 58;
    --text-secondary-rgb: 39, 102, 157;

    --bg-primary: rgb(var(--bg-primary-rgb));
    --bg-secondary: rgb(var(--bg-secondary-rgb));
    --bg-card: rgb(var(--bg-card-rgb));
    --bg-button: rgb(var(--bg-button-rgb));
    --text-primary: rgb(var(--text-primary-rgb));
    --text-secondary: rgb(var(--text-secondary-rgb));

    &[data-theme='dark'] {
        --bg-primary-rgb: 13, 27, 42;
        --bg-secondary-rgb: 173, 202, 228;
        --bg-card-rgb: 27, 38, 59;
        --bg-button-rgb: 224, 225, 221;
        --text-primary-rgb: 240, 240, 240;
        --text-secondary-rgb: 199, 217, 240;
    }
}

$bg-primary: var(--bg-primary);
$bg-secondary: var(--bg-secondary);
$bg-card: var(--bg-card);
$bg-button: var(--bg-button);
$text-primary: var(--text-primary);
$text-secondary: var(--text-secondary);

@function lighten($color-name, $percentage) {
    @return color-mix(in srgb, var(--#{$color-name}), white $percentage);
}

@function with-opacity($color-name, $opacity) {
    @return rgba(var(--#{$color-name}-rgb), $opacity);
}
EOF

cat > src/styles/_mixins.scss << 'EOF'
EOF

cat > src/styles/_placeholders.scss << 'EOF'
EOF

cat > src/styles/_reset.scss << 'EOF'
$base-line-height: 1.6;
$heading-line-height: 1.1;
$body-max-width: 75ch;
$color-placeholder: #9ca3af;

*,
*::before,
*::after {
    box-sizing: border-box;
}

* {
    margin: 0;
    padding: 0;
    font: inherit;
}

html {
    -moz-text-size-adjust: none;
    -webkit-text-size-adjust: none;
    text-size-adjust: none;
    interpolate-size: allow-keywords;
}

body {
    line-height: $base-line-height;
    -webkit-font-smoothing: antialiased;
}

h1,
h2,
h3,
h4,
h5,
h6,
button,
input,
label {
    line-height: $heading-line-height;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    text-wrap: balance;
}

p,
li,
figcaption {
    max-width: $body-max-width;
    text-wrap: pretty;
}

img,
picture,
video,
canvas,
svg {
    display: block;
    max-width: 100%;
}

img {
    object-fit: cover;
}

a {
    color: inherit;
    text-decoration: inherit;
}

ol,
ul,
menu,
li {
    list-style: none;
}

button,
select {
    text-transform: none;
}

select {
    background-color: inherit;
}

[type='number']::-webkit-outer-spin-button,
[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

[type='number'] {
    -moz-appearance: textfield;
}

:-moz-focusring {
    outline: auto;
}

:-moz-ui-invalid {
    box-shadow: none;
}

[type='search'] {
    -webkit-appearance: textfield;
    outline-offset: -2px;
}

::-webkit-search-decoration {
    -webkit-appearance: none;
}

input::-moz-placeholder,
textarea::-moz-placeholder {
    opacity: 1;
    color: $color-placeholder;
}

input::placeholder,
textarea::placeholder {
    opacity: 1;
    color: $color-placeholder;
}

button,
[role='button'] {
    cursor: pointer;
}

:disabled {
    cursor: default;
}

textarea:not([rows]) {
    min-height: 10em;
}

:target {
    scroll-margin-block: 5ex;
}

[hidden] {
    display: none;
}

@media (prefers-reduced-motion: no-preference) {
    html {
        scroll-behavior: smooth;
    }
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}
EOF

# Create a simple Button component
echo "Creating a simple Button component..."
mkdir -p src/components/Button
cat > src/components/Button/Button.tsx << 'EOF'
import './Button.scss';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
    variant?: 'primary' | 'secondary';
}

export default function Button({
    children,
    className,
    variant = 'primary',
    ...props
}: ButtonProps) {
    return (
        <button className={`button button--${variant} ${className || ''}`} {...props}>
            {children}
        </button>
    );
}
EOF

cat > src/components/Button/Button.scss << 'EOF'
@use '@/styles/colors';

.button {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &--primary {
        background-color: colors.$bg-button;
        color: white;
    }

    &--secondary {
        background-color: #cecece;
        color: white;
    }
}
EOF

# Create a simple Counter feature
echo "Creating a simple Counter feature..."
mkdir -p src/features/Counter
cat > src/features/Counter/Counter.tsx << 'EOF'
import './Counter.scss';
import { useCounterStore } from '@/store/useCounterStore';
import Button from '@/components/Button/Button';

export default function Counter() {
    const { count, increment, decrement } = useCounterStore();

    return (
        <div className="counter">
            <h2 className="counter__value">{count}</h2>
            <div className="counter__buttons">
                <Button onClick={() => decrement()}>-</Button>
                <Button onClick={() => increment()}>+</Button>
            </div>
        </div>
    );
}
EOF

cat > src/features/Counter/Counter.scss << 'EOF'
.counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    &__value {
        font-size: 2rem;
        font-weight: 700;
    }

    &__buttons {
        display: flex;
        gap: 1rem;
    }
}
EOF

# Create a simple HomePage
echo "Creating a simple HomePage..."
mkdir -p src/pages/Home
cat > src/pages/Home/Home.tsx << EOF
import './Home.scss';
import Counter from '@/features/Counter/Counter';

export default function Home() {
    return (
        <main className='home'>
            <h1 className='home__title'>${PROJECT_NAME}</h1>
            <h2 className='home__subtitle'>Welcome to Your React App</h2>
            <p className='home__description'>A clean starting point for your new project</p>
            <Counter />
        </main>
    );
}
EOF

cat > src/pages/Home/Home.scss << 'EOF'
@use '@/styles/colors';

.home {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    text-align: center;

    &__title {
        margin-block-end: 5rem;
        font-size: 3rem;
        font-weight: 700;
    }

    &__subtitle {
        margin-block-end: 1rem;
        font-size: 1.5rem;
    }

    &__description {
        margin-bottom: 1.5rem;
        font-size: 1.125rem;
        color: colors.with-opacity('text-primary', 0.66);
    }
}
EOF

# Create layouts components
echo "Creating layout components..."
mkdir -p src/layouts/Header
cat > src/layouts/Header/Header.tsx << 'EOF'
import './Header.scss';
import { Link } from 'react-router-dom';
import reactLogo from '@/assets/react.svg';

export default function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <Link to="/">
                    <img src={reactLogo} alt="React Logo" />
                </Link>
            </div>
            <nav className="header__nav">
                {/* Navigation links would go here */}
            </nav>
        </header>
    );
}
EOF

cat > src/layouts/Header/Header.scss << 'EOF'
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;

    &__logo {
        img {
            height: 2rem;
            width: auto;
        }
    }

    &__nav {
        display: flex;
        gap: 1rem;
    }
}
EOF

mkdir -p src/layouts/Footer
cat > src/layouts/Footer/Footer.tsx << EOF
import './Footer.scss';

export default function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} - ${PROJECT_NAME}</p>
        </footer>
    );
}
EOF

cat > src/layouts/Footer/Footer.scss << 'EOF'
.footer {
    padding: 1rem;
    font-size: 0.875rem;
    color: #666;
}
EOF

cat > src/layouts/MainLayout.tsx << 'EOF'
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

export default function MainLayout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
}
EOF

# Create router setup
echo "Creating router setup..."
cat > src/router.tsx << 'EOF'
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home/Home';

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            { path: '/', element: <Home /> },
        ],
    },
]);
EOF

# Create API and React Query config
echo "Creating config first..."
cat > src/config/api.ts << 'EOF'
// API configuration
export const API_CONFIG = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? 'https://api.example.com'
        : 'https://dev-api.example.com',
    timeout: 10000,
    retries: 3,
};

// React Query configuration
export const QUERY_CONFIG = {
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
};
EOF

# Update App.tsx
echo "Updating App.tsx..."
cat > src/App.tsx << 'EOF'
import './App.scss';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { QUERY_CONFIG } from '@/config/api';
import { router } from '@/router';

const queryClient = new QueryClient(QUERY_CONFIG);

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    );
}
EOF

# Update main.tsx
echo "Updating main.tsx..."
cat > src/main.tsx << 'EOF'
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
EOF

# Update index.html
echo "Updating index.html..."
cat > index.html << EOF
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
        <title>${PROJECT_NAME}</title>
    </head>
    <body>
        <div id="root"></div>
        <script type="module" src="/src/main.tsx"></script>
    </body>
</html>
EOF

# Create a simple Zustand store
echo "Creating a simple Zustand store..."
cat > src/store/useCounterStore.ts << 'EOF'
import { create } from 'zustand';

interface CounterState {
    count: number;
    increment: () => void;
    decrement: () => void;
    reset: () => void;
};

export const useCounterStore = create<CounterState>((set) => ({
    count: 0,
    increment: () => set((state) => ({ count: state.count + 1 })),
    decrement: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));
EOF

# Add custom hooks example
echo "Creating a custom hook example..."
cat > src/hooks/useLocalStorage.ts << 'EOF'
import { useState, useEffect, useCallback } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    // Get stored value
    const readValue = useCallback((): T => {
        if (typeof window === 'undefined') {
            return initialValue;
        }

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.warn(`Error reading localStorage key "${key}":`, error);
            return initialValue;
        }
    }, [initialValue, key]);

    const [storedValue, setStoredValue] = useState<T>(readValue);

    // Set stored value
    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.warn(`Error setting localStorage key "${key}":`, error);
        }
    };

    useEffect(() => {
        setStoredValue(readValue());
    }, [readValue]);

    return [storedValue, setValue];
}
EOF

# Create API service with React Query
echo "Creating a simple service api..."
cat > src/services/api.ts << 'EOF'
import { useQuery, useMutation } from '@tanstack/react-query';

const API_URL = 'https://api.example.com';

// Base API functions
async function fetchData<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_URL}/${endpoint}`);

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

async function postData<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
    }

    return response.json();
}

// Example usage with React Query
export function useGetData<T>(endpoint: string, queryKey: string[]) {
    return useQuery({
        queryKey,
        queryFn: () => fetchData<T>(endpoint)
    });
}

export function usePostData<T>(endpoint: string) {
    return useMutation({
        mutationFn: (data: any) => postData<T>(endpoint, data)
    });
}

// Example typed API hooks:
// export function useGetUsers() {
//   return useGetData<User[]>('users', ['users']);
// }
//
// export function useGetUserById(id: string | number) {
//   return useGetData<User>(`users/${id}`, ['users', id.toString()]);
// }
EOF

# Create basic types
echo "Creating simple types..."
cat > src/types/common.ts << 'EOF'
// Common types used across the application

// Represents a unique identifier
export type ID = string | number;

// Represents a paginated response from an API
export interface PaginatedResponse<T> {
    data: T[];
    page: number;
    totalPages: number;
    totalItems: number;
}

// Represents an API error
export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, string>;
}

// Represents the status of an async operation
export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

// Represents a user
export interface User {
    id: ID;
    name: string;
    email: string;
    role: 'admin' | 'user';
}
EOF

# Create simple util
echo "Creating a simple utils function..."
cat > src/utils/formatters.ts << 'EOF'
// String formatters
export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
EOF

# Create a README file
echo "Creating README.md..."
cat > README.md << EOF
# $PROJECT_NAME

This project was created with Vite, React, and TypeScript.

## Stack

-   React
-   TypeScript
-   React Router
-   Zustand
-   React Query
-   SASS

## Available Scripts

In the project directory, you can run:

### \`npm run dev\`

Runs the app in the development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.

### \`npm run build\`

Builds the app for production to the \`dist\` folder.

### \`npm run preview\`

Previews the production build locally.

## Project Structure

\`\`\`
src/
├── assets/      # Static assets
├── components/  # Reusable UI components
├── features/    # Feature-specific components and logic
├── hooks/       # Custom React hooks
├── layouts/     # Layout components
├── pages/       # Page components
├── services/    # API services
├── store/       # Zustand stores
├── styles/      # Global styles and SASS variables
├── types/       # TypeScript type definitions
├── utils/       # Utility functions
├── config/      # Configuration files
├── App.tsx      # Main App component
├── router.tsx   # Router configuration
└── main.tsx     # Entry point
\`\`\`
EOF

# Fix ESLint TypeScript dependency
echo "Adding TypeScript ESLint plugin..."
bun install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

# Install dependencies
echo "Installing dependencies..."
bun install

# Make initial commit
echo "Making initial Git commit..."
git add .
git commit -m "Initial commit from project template"

# Only create GitHub repo if requested
if [ "$CREATE_GITHUB_REPO" = true ]; then
    if command -v gh &> /dev/null; then
        echo "Creating GitHub repository ($VISIBILITY)..."
        gh repo create "$PROJECT_NAME" --"$VISIBILITY" --source=. --remote=origin --push

        echo "GitHub repository created and code pushed!"
    else
        echo "GitHub CLI not installed. If you want to create a repository on GitHub,"
        echo "please install the GitHub CLI (gh) or create it manually on github.com"
    fi
else
    echo "Local Git repository created. No GitHub repository was created."
fi

echo "Project $PROJECT_NAME created successfully!"
code .
```
