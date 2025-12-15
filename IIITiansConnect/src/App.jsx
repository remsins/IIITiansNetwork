import { useEffect } from 'react';

function App() {
  useEffect(() => {
    fetch('http://localhost:5000/')
      .then(res => res.text())
      .then(data => console.log('BACKEND:', data))
      .catch(err => console.error('ERROR:', err));
  }, []);

  return 
  
}

export default App;
