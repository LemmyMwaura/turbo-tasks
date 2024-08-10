## What's Inside?

This Turborepo includes the following apps and packages:

### Apps and Packages

- **`native`**: A [React Native](https://reactnative.dev/) app built with [Expo](https://docs.expo.dev/).
- **`web`**: A [Next.js](https://nextjs.org/) app integrated with [React Native Web](https://necolas.github.io/react-native-web/).
- **`@repo/ui`**: A shared [React Native](https://reactnative.dev/) component library used by both `web` and `native` apps.
- **`@repo/typescript-config`**: Shared `tsconfig.json` settings for TypeScript across the monorepo.

All apps and packages are fully written in [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo comes with additional tools pre-configured for you:

### Getting Started

1. **Install Dependencies:**

   Ensure you have Node.js and Yarn (v1.22.19) installed. Then, install the dependencies:

   ```sh
   yarn
   ```

2. **Development:**

   Start the development server:

   ```sh
   yarn run dev
   ```

3. **Build:**

   Build the project:

   ```sh
   yarn run build
   ```

4. **Connect Your Device or Emulator:**

   To run the app on a physical Android/iOS device, install the Expo Go app from the Google Play Store or App Store, then scan the QR code that appears in your terminal. You can also run the app on an Android/iOS emulator.

### Folder Structure

The monorepo is organized into two main workspaces: `apps` and `packages`.

```bash
turbo-tasks
├── apps
│   ├── native
│   └── web
└── packages
    ├── ui
    └── typescript-config
```

### Technologies Used

- **[Expo](https://docs.expo.dev/):** For native development.
- **[Next.js](https://nextjs.org/):** For web development.
- **[React Native](https://reactnative.dev/):** For building native mobile apps.
- **[React Native Web](https://necolas.github.io/react-native-web/):** For running React Native components on the web.
- **[TypeScript](https://www.typescriptlang.org/):** For static type checking.
- **[Prettier](https://prettier.io):** For code formatting.
- **[Turborepo](https://turborepo.dev/):** For managing the monorepo build system.

### TODO

- Add a more robust backend to leverage server components for improved performance.
- Move btns and shared elements to a separate elements package.
