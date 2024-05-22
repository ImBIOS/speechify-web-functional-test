import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';

function App() {
  // const [sentences, setSentences] = useState<Array<string>>([]);
  // const { currentWord, currentSentence, controls } = useSpeech(sentences);

  return (
    <div className="App">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading/>
      </div>
      <div>
        <Controls/>
      </div>
    </div>
  );
}

export default App;
