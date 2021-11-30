import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Provider } from "react-redux";

import Init from "./components/Init";

import store from "./stores/index";

function App() {
  return (
    <Provider store={store}>
      <Init />
    </Provider>
  );
}

export default App;
