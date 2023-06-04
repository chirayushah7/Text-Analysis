import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import routes from "./routes";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  return (
    <MantineProvider className="App" >
      <NotificationsProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} {...route} />
            ))}
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
