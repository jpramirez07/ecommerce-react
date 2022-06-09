import { HashRouter, Route, Routes } from 'react-router-dom';
import './Styles.css';
import {Home, Login, ProductDetail, Purchases} from './pages'
import {LoadingScreen} from './components'
import {useSelector} from 'react-redux'

function App() {

  const isLoading = useSelector(state => state.isLoading)
  return (
    <HashRouter>
      <div className="container">
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Products/:id' element={<ProductDetail />}/>
          <Route path='/Purchases' element={<Purchases />}/>
          <Route path='/Login' element={<Login />}/>
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
