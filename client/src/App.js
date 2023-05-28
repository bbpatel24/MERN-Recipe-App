import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { Auth } from "./pages/auth";
import { CreateRecipe } from "./pages/create-recipe";
import { Home } from "./pages/home";
import { SavedRecipes } from "./pages/saved-recipes";
import Register from "./pages/register";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={callApi}>Call API</button>
      </header>

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/create-recipe" element={<CreateRecipe />} />
          <Route path="/saved-recipes" element={<SavedRecipes />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}
function callApi() {
  fetch("https://simple-node-server-niru.herokuapp.com/", { method: "GET" })
    .then((data) => data.json())
    .then((json) => alert(JSON.stringify(json)));
}
export default App;
