import './style/App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Operation from './components/Operation';
import Context from "./Context";

function App() {
  return (
    <div className="App">
      <Context>
        <Header />
        <Sidebar />
        <Operation />
      </Context>
    </div>
  );
}

export default App;
