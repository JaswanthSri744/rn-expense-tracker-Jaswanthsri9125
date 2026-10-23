# Expense Tracker

A React Native application built with Expo and TypeScript to track daily expenses.

## Features

- View total expenses and the expense list.
- Add expenses with a title, amount, category, and date.
- View individual expense details.
- Delete expenses.
- Store expense data locally on the device using AsyncStorage.
- Reusable UI components and shared state management.

## Requirements

- Node.js and npm
- Expo-compatible development environment
- Expo Go for development testing, if compatible with the project setup

## Getting Started

1. Clone this repository.
2. Open a terminal in the project directory.
3. Install dependencies:

   npm install
   

4. Start the development server:

   npx expo start
   

5. Follow the Expo CLI instructions to open the app on a compatible device or emulator.

## Project Structure

- `screens/` — Application screens
- `components/` — Reusable UI components
- `context/` — Shared expense state
- `storage/` — Local data persistence
- `utils/` — Helper functions
- `types/` — TypeScript types

## Storage

Expense data is stored locally on the device using AsyncStorage. A separate backend API is not implemented for expense management.

## Not Finished Yet

- No backend or cloud synchronization.
- No account-based user authentication.
- Further testing and improvements may be needed.

## Notes

Folder names and available features should be checked against the current implementation before relying on this README.