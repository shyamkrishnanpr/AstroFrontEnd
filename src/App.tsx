import { BrowserRouter as Routers, Route, Routes } from "react-router-dom";
import Router from "./routes/Router";
import "./App.css";

function App() {
  return (
    <>
      <Routers>
        <Routes>
          <Route path="/*" element={<Router />} />
        </Routes>
      </Routers>
    </>
  );
}

export default App;
