import SearchForm from './components/SearchForm.tsx';
import Results from './components/Results/Results.tsx';
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
