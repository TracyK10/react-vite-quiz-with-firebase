import Home from "./components/Home";
import HighScores from "./components/HighScores";
import Game from "./components/Game";
import ErrorPage from "./components/ErrorPage";

const routes = [
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/game",
    element: <Game />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/highScores",
    element: <HighScores />,
    errorElement: <ErrorPage />,
  },
];

export default routes;