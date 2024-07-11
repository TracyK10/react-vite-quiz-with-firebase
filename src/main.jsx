import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
// import Firebase from "./components/Firebase/Firebase";
// import { FirebaseContext } from "./components/Firebase/FirebaseContext";
// <FirebaseContext.Provider value={new Firebase()}></FirebaseContext.Provider>;


const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <RouterProvider router={router} />
);
