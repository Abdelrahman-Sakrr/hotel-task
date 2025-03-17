import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./components/error/NotFound";
import Home from "./components/home/Home";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <MantineProvider>
        <BrowserRouter>
          <Routes>
            <Route path={`*`} element={<NotFound />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </>
  );
}

export default App;
