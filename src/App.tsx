import './App.css';
import { Flex } from '@radix-ui/themes';
import HomePage from './pages/HomePage';
import Header from './components/Header/Header';

function App() {
  return (
    <Flex direction='column' align='center'>
      <Header />
      <HomePage />
    </Flex>
  );
}

export default App;
