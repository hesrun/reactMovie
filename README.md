# 🎬 Hesflix

**Hesflix** is a modern movie and TV show database built with the [TMDB API](https://www.themoviedb.org/), featuring genre filtering, search, authentication, favorites, actor pages, and dynamic loading skeletons for a polished user experience.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![MobX](https://img.shields.io/badge/MobX-FF9955?style=for-the-badge&logo=mobx&logoColor=white)

---

## 🌐 Live Demo

👉 [View Hesflix Live](https://hesflix.netlify.app/)

---

## 🚀 Technologies Used

-   **React** — Frontend JavaScript library
-   **Vite** — Lightning-fast development and build tool
-   **Tailwind CSS** — Utility-first CSS framework
-   **Axios** — Promise-based HTTP client
-   **MobX** — Simple and scalable state management
-   **MockAPI** — Mock backend for user and favorite data

---

## 🔥 Features

-   🎞 Browse and filter **movies and TV shows** by genre
-   🔍 Real-time **search** across all content
-   👤 Simple **authentication system** (signup/login)
-   ⭐ Add and remove **favorites**, saved per user
-   🧑‍🎤 Dedicated **actor pages** with bios and known roles
-   ⏳ Stylish **skeleton loaders** while content loads
-   ☁️ All user data is persisted using **MockAPI**

---

## 🔑 APIs Used

-   [TMDB API](https://www.themoviedb.org/documentation/api) — for movie, show, and actor data
-   [MockAPI](https://mockapi.io/) — for storing users and favorites

You will need to configure API keys to run the app locally.

---

## 🛠 Installation and Development

1. **Clone the repository**

    ```bash
    git clone https://github.com/hesrun/reactMovie.git
    cd reactMovie
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Create `.env` file in the root directory**

    ```
    VITE_API_KEY=your_tmdb_api_key
    ```

4. **Run the app in development**

    ```bash
    npm run dev
    ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to use Hesflix locally.

---

## 📦 Build for Production

```bash
npm run build
```
