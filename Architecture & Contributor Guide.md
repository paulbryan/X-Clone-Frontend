# X-Clone Frontend – Architecture & Overview

This guide introduces the structure and patterns of the X/Twitter clone frontend. It is intended to help new contributors and anyone interested in understanding the codebase organization, data flow, and overall logic. The tone is intended to be clear, direct, and practical.

---

## Table of Contents

1. [Project Structure Overview](#project-structure-overview)  
    1.1 [Components Folder Details](#components-folder-details)  
    1.2 [Hooks Folder Details](#hooks-folder-details)
2. [Pages & Routing](#pages--routing)
3. [Feeds](#feeds)
4. [Tweets](#tweets)
5. [Modals](#modals)
6. [Data Flow](#data-flow)
    - [Hooks](#hooks)
    - [Infinite Feeds](#infinite-feeds)
    - [Fetching Data](#fetching-data)
    - [Auth](#auth)
7. [Mutating Data](#mutating-data)
8. [Headers](#headers)
9. [Main Types](#main-types)
10. [Final Tips](#final-tips)

---

## Project Structure Overview

The frontend codebase is organized for clarity and modularity. The main folders are:

```
src/
├── components/       # UI and page components
├── hooks/            # Data fetching, mutations, batching
├── context/          # Global state (user, auth, modals, header)
├── types/            # Shared TypeScript types
├── constants/        # Env vars, constants
```

### 1.1 Components Folder Details

The `components/` directory contains all UI building blocks and higher-level page structures.  
You will find:

- **layout/** – Shared layout elements like `Header`, `FooterBar`, desktop navigation, and media display.
- **pages/** – Main page containers (e.g., `HomePage`, `ProfilePage`, `ExplorePage`, `BookmarkPage`, etc.).
- **feed/** – Feed and related components (`Feed`, `NotificationFeed`, `UserSearchFeed`, infinite scroll triggers).
- **modal/** – Modal logic and modal views (e.g., authentication modals, color picker, feedback, image preview).
- **tweet/** – Tweet rendering logic, layouts, and tweet interaction components.
- **user/** – User profile, display name, username, profile picture, followers/following display.
- **input/** – Input forms (tweet composer, poll composer, fields, upload buttons).

These subfolders allow pages to compose the UI from reusable components with clear responsibilities.  
For example, a page like `ProfilePage` imports layout, feed, and modal components as needed.

### 1.2 Hooks Folder Details

The `hooks/` directory is responsible for all logic related to data fetching, mutations, batching, and helpers.

- **queries/** – Data retrieval hooks for posts, users, feeds, poll choices, notifications, user search, and more.  
  - Example: `useInfiniteFeed`, `useUserSearch`, `usePost`, `useUser`, etc.
- **mutations/** – Hooks for modifying data (liking, bookmarking, creating, deleting, following, pinning, reposting, voting on polls, updating user info).
  - Example: `useLikePost`, `useCreatePost`, `useBookmarkPost`, `useFollowUser`, `useVoteOnPoll`, etc.
- **batcher/** – Efficient batching for post/user/notification fetches, reducing network calls using window-based schedulers.
  - Example: `postBatcher`, `userBatcher`, `notificationBatcher`.
- **auth/** – Authentication logic (Google Auth, JWT storage, etc.).
- **mutationHelpers/** – Utility helpers for optimistic updates and cache management.

Each hook is focused on a single responsibility (fetching, mutating, batching, etc.), making the data flow easy to trace.  
Hooks are imported and used directly by components and pages.

---

## Pages & Routing

Each main page (Home, Profile, Explore, Bookmarks, Notifications, About) manages its own state and composes the UI by combining layout elements, feeds, and any additional feature components. Routing is managed via React Router, with route definitions in `App.tsx`.

For example, the Profile page displays user information, a tab bar, and a feed of posts.  
Pages use hooks such as `useInfiniteFeed` to retrieve lists of post/user IDs, which are then passed to Feed components for rendering.

Visual Example:
- Profile page:  
  ![Image](https://github.com/user-attachments/assets/70c8ad85-5975-4b95-ad03-6c93e62c2c9f)
- Full post page:  
  ![Image](https://github.com/user-attachments/assets/f58d1461-904c-4325-9cf4-780b47f3f1e7)

Pages only pass IDs down the component tree. The actual data for each post or user is fetched by the corresponding component using hooks.

---

## Feeds

The `Feed` component renders an array of post IDs provided by its parent page component. It is responsible for displaying Tweets, triggering loading of additional posts (via infinite scroll), and handling any feed-specific logic.

Specialized feeds such as `NotificationFeed` and `UserSearchFeed` follow similar patterns, rendering notifications and user search results, respectively.

Feeds operate only on IDs. Individual Tweet/User components fetch their own data by ID, optimizing network usage, especially with batching.

---

## Tweets

The Tweet component (`Tweet.tsx`) is structured into multiple rows for modular layout:

- Pinned/Reposted Row (if applicable)
- Main Row: User card and post text (compact for feed view)
- ExtraMainTweetRows: Post text in a separate row for expanded view
- TweetImagesRow: Displays images or polls attached to the tweet
- PostInteractionRow: Buttons and counts for likes, replies, retweets, bookmarks

If a tweet is a reply, its parent tweet is rendered above it for context.  
Different layouts are used depending on whether the tweet is shown in a feed, a modal, or as an expanded post.

---

## Modals

Modals are managed by `ModalManager.tsx`, which renders the correct modal component based on the current modal type in global state (ModalContext).  
Any component can trigger a modal by using the `useModal()` hook and calling `setModalType()`.

You may also set `modalData` (commonly an ID) for modals which require context (e.g., replying to a specific post).

Set `modalType` to `null` to close the modal, and clear modal data as needed.

---

## Data Flow

### Hooks

- **Queries:** Data fetching hooks (`useInfiniteFeed`, `useUser`, `usePost`, `useNotification`, etc.)
- **Mutations:** Data modification hooks (`useLikePost`, `useBookmarkPost`, `useCreatePost`, `useDeletePost`, etc.)
- **Batchers:** Window-based schedulers to efficiently batch requests for multiple posts, users, or notifications.
- **Helpers:** Utilities for debounce, infinite scroll, and optimistic UI updates.

### Infinite Feeds

Feeds fetch post IDs in paginated batches (usually 10 at a time).  
The cursor is typically a timestamp (for time-based feeds) or a ranking index (for the "For You" feed).  
Each batch returns the next set of IDs, which are passed to the feed, and then down to individual Tweet components.

### Fetching Data

Data for posts and users is always fetched on-demand, by ID, using React Query.  
Components first check the cache, then fetch as needed.  
Batchers ensure efficient requests when multiple items are loaded simultaneously.

### Auth

User authentication uses JWT tokens (stored in localStorage).  
Certain API requests require the JWT for personalized or protected actions (e.g., liking a post, creating a post, or loading personalized feeds).  
The backend verifies and parses the token to authenticate requests.

---

## Mutating Data

Data mutations (like, bookmark, follow, create post, vote on poll) use optimistic updates to reflect changes in the UI immediately.  
After an action is performed, the cache is updated, and related queries are invalidated to ensure consistency.

For example, when liking a post:
- The cache is updated optimistically
- The API call is made
- On success, related queries (liked feed, post, current user) are invalidated

When creating a post:
- The API call is made with FormData
- On success, relevant feeds and user data are invalidated or updated

Both `["currentUser"]` and `["user", id]` queries are often invalidated to keep data in sync.

---

## Headers

Headers are rendered by `Header.tsx` and set by each page using context (`HeaderContentContext`).  
Each page sets its own header content (e.g., "Bookmarks", "Profile") for clarity.

---

## Main Types

The shared TypeScript types can be found in the `types` folder. Key types:

**User**
```ts
type User = {
  id: number;
  username: string;
  email: string;
  displayName: string;
  bio: string;
  createdAt: string;
  posts: number[],
  replies: number[],
  likedPosts: number[],
  bookmarkedPosts: number[],
  followers: number[],
  following: number[],
  retweets: number[]
  profilePictureUrl: string;
  bannerImageUrl: string;
  pinnedPostId: number | null;
  verified: boolean;
}
```

**SignupUser**
```ts
type SignupUser = {
  username: string;
  email: string;
  displayName: string;
  profilePicture: string;
  bannerImage: string;
  bio: string;
  password: string;
}
```

**Post**
```ts
type Post = {
  id: number;
  userId: number;
  text: string;
  createdAt: string;
  likedBy: number[];
  bookmarkedBy: number[];
  parentId?: number;
  replies: number[];
  retweetedBy: number[];
  postMedia: PostMedia[];
  pollId?: number;
}
```

**PostType**  
Controls tweet layout:
- `"MainPost"`: Expanded tweet
- `"ReplyFeedPost"`: Feed tweet with parent
- `"TweetFeedPost"`: Feed tweet, no parent shown

---

## Final Tips

- Start with the page component, trace the flow of IDs to the feed, and then down to the individual data-fetching components.
- Batchers optimize network use; let components fetch by ID and batching will handle multiple requests.
- Consider which queries need to be invalidated after mutations.
- Modals and headers are managed via global context for easy access and control.

For further questions or feedback, open an issue or pull request.