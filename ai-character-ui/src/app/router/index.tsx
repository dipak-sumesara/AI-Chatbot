import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import ChatPage from "../../pages/chat/ChatPage";
import CreateCharacterPage from "../../pages/character/CreateCharacterPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <ChatPage />,
      },
      {
        path: "/character/create",
        element: <CreateCharacterPage />,
      },
    ],
  },
]);