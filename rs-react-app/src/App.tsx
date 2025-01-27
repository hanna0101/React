import SearchForm from './components/top-controls/SearchForm.tsx';
import Results from './components/results/Results.tsx';
import './app.css';

function App() {
  return (
    <div className="body">
      <SearchForm />
      <Results />
    </div>
  );
}

export default App;
