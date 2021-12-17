import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./screens/LandingPages/LandingPage";

const App = () => (
  <>
    {/* <h1 classname="App">Hello</h1> */}
    <Header />
    <main>
      <LandingPage />
    </main>
    <Footer />
  </>
);

export default App;
