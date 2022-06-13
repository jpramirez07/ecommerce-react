import { HashRouter, Route, Routes } from 'react-router-dom';
import './Styles.css';
import {CardSide, Home, Login, ProductDetail, Purchases} from './pages'
import {LoadingScreen, NavBar, ProtectedRoutes} from './components'
import {useSelector} from 'react-redux'



function App() {

  const isLoading = useSelector(state => state.isLoading)
  return (
    <HashRouter>
      <NavBar />
      <div className="container">
        {isLoading && <LoadingScreen />}
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Products/:id' element={<ProductDetail />}/>
          <Route path='/Login' element={<Login />}/>


          <Route element={<ProtectedRoutes />}>
            <Route path='/Purchases' element={<Purchases />}/>
            <Route path='/Cart' element={<CardSide />}/>

          </Route>

        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
