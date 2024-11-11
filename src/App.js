import "./App.css";
import Layout from "./Layout/Layout";
import Login from "./pages/Login/login";
import { RoutesPage } from "./routes/RoutePage";

function App() {
  return (
    <div className="App">
      {/* <Login/> */}
      {/* <Layout/> */}
        <RoutesPage />

    </div>
  );
}

export default App;
