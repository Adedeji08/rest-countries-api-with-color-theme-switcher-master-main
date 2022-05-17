/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 17/05/2022 - 09:02:23
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 17/05/2022
    * - Author          : 
    * - Modification    : 
**/
import './App.css';
import { Countries } from './components/Countries';
import Selectedcountry from './components/Selectedcountry';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import useLocalStorage from 'use-local-storage';



function App() {
  return (
   
      <main className='main'>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Countries />}></Route>
            <Route path="/name/:slug" element={<Selectedcountry />}></Route>
          </Routes>
        </BrowserRouter>
      </main>
  
  );
}

export default App;
