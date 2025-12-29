# Guild of Form: Recommended Features & Improvements

## Introduction

This document outlines recommended features and improvements for the Guild of Form application. The goal is to enhance user engagement, learning effectiveness, and the overall user experience, transforming the application from a basic MVP into a more robust and engaging platform.

## 1. Core Gamification Enhancements

Features to make the gamification more rewarding and motivating.

*   **Achievements & Badges:** Award badges for completing specific milestones (e.g., "Potato Master" for Mission 2-1, "Chain Linker" for Boss Fight 4). This provides users with tangible recognition of their progress.
*   **Skill Tree:** Evolve the linear paths into a branching skill tree. Users could spend "Skill Points" (earned on level up) to unlock specific skills, brushes, or techniques, allowing for a more personalized learning journey.
*   **Leaderboards:** Implement weekly and monthly leaderboards for XP gained, daily streak length, or number of quests completed. This would foster friendly competition and community engagement.
*   **In-game Currency:** Introduce "Glyphs" or "Shards" as a currency earned from quests. This currency could be used to "buy" cosmetic items like new UI themes, custom cursors, or to pay for additional daily bounty "rerolls".
*   **Rank-Up Ceremonies:** When a user ranks up (e.g., from Apprentice to Journeyman), trigger a special, celebratory animation or modal to make the achievement feel significant.

## 2. UI/UX & "Juice" Improvements

Features to make the application more visually appealing, interactive, and satisfying to use.

*   **Sound Effects & Music:** Integrate sound effects for key actions like completing a mission, leveling up, or clicking buttons. A subtle, atmospheric background track would greatly enhance the "dark fantasy" theme.
*   **Interactive Map:** Upgrade the `MapCanvas` from a simple list to a fully interactive SVG map. Chapters could be glowing nodes that users can click and explore, with animated paths connecting them as they are unlocked.
*   **Customizable UI:** Allow users to unlock or purchase different UI themes. This could range from simple color palette swaps to more elaborate redesigns (e.g., "Light" theme, "Cyberpunk" theme).
*   **Modal & Transition Polish:** Enhance the animations for modals. The `LevelUpModal` could feature confetti or particle effects, and the `PathSelector` could have a more dramatic entrance animation.
*   **Tooltips & Enhanced Onboarding:** Add tooltips to UI elements to explain what they do. A more guided onboarding experience for first-time users could introduce them to the core concepts of the Guild.

## 3. Social & Community Features

Features designed to connect users and build a supportive community around the learning process.

*   **User Profiles:** Create public user profiles where users can showcase their completed "Masterpieces," earned badges, and key stats like level and streak.
*   **"Showcase" Feature:** Implement a gallery where users can submit renders of their completed boss fights or personal projects. The community could vote on submissions, with top-rated works being featured.
*   **Mentorship System:** Allow experienced users ("Masters" or "Architects") to officially mentor "Apprentices". Mentors could provide feedback on submissions, answer questions, and guide new users.

## 4. Content & Curriculum Expansion

Ideas for new content to keep the learning journey fresh and extend the application's lifespan.

*   **"Forbidden Tomes" Implementation:** Begin developing the advanced paths outlined in the content bible:
    *   Tome of the World Builder (Environment Art)
    *   Tome of the Jeweler (Precision Design)
    *   Tome of the Animator (Topology for deformation)
*   **Guest Curriculums:** Collaborate with professional 3D artists to create special, limited-time "Masterclass" chapters that offer unique insights and techniques.
*   **Weekly Challenges:** Introduce a challenging weekly sculpt that is not part of the main curriculum. These could have special rewards and their own leaderboards.

## 5. Monetization & Sustainability (Optional)

If the goal is to sustain or grow the project, consider these options:

*   **Pro Subscription ("Guild Master"):** A monthly or yearly subscription that could unlock advanced features like the "Forbidden Tomes," exclusive cosmetic themes, and more daily quest rerolls.
*   **Asset Packs:** Sell curated asset packs (e.g., high-quality base meshes, texture sets, or brush packs) created by professional artists.

## 6. Technical & Architectural Improvements

Suggestions for improving the codebase, scalability, and maintainability of the application.

*   **Backend Integration (Supabase):** As planned in Phase 2, migrate from LocalStorage to a proper backend like Supabase. This is essential for user accounts, multi-device data synchronization, and implementing social features like leaderboards.
*   **End-to-End Testing:** Implement a suite of end-to-end tests using a framework like Cypress or Playwright. This will ensure that critical user flows remain stable as new features are added.
*   **Component Library with Storybook:** Formalize the UI components into a robust component library using Storybook. This would allow for isolated development, testing, and documentation of each component.
*   **Refactor Data Ingestion:** The current manual data entry in `.ts` files is not scalable and is prone to errors. A more robust solution would be to create a script that parses a more structured format (like YAML or a well-defined JSON schema) into the required data files.
