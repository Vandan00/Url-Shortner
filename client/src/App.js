import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPages/LandingPage";
import MyUrls from "./screens/MyUrls/MyUrls";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import CreateUrl from "./screens/CreateUrl/CreateUrl";

const App = () => (
  <Router>
    <Header />
    <main>
      <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/login" element={<LoginScreen />}></Route>
        <Route exact path="/register" element={<RegisterScreen />}></Route>
        <Route exact path="/createurl" element={<CreateUrl />}></Route>
        <Route exact path="/myurls" element={<MyUrls />}></Route>
      </Routes>
      {/* <Route path="/MyUrls" component={() => <MyUrls />} exact></Route> */}
    </main>
    <Footer />
  </Router>
);

export default App;
