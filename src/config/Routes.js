import {Routes, Route} from 'react-router-dom';

import Home from '../pages/Home';
import Catalog from '../pages/Catalog';
import Detail from '../pages/Detail';
import View from '../pages/View';
import SearchPage from '../pages/SearchPage';
import ManageAcc from '../pages/ManageAcc';
const PageRoutes = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={<Home/>}
            />
            <Route
                path='/:category/:page'
                element={<Catalog/>}
            />
            <Route
                path='/:category'
                element={<Catalog/>}
            />
            <Route
                path='/:category/type/:type/:page'
                element={<Catalog/>}
            />
            <Route
                path='/:category/type/:type'
                element={<Catalog/>}
            />
            <Route
                path='/:category/detail/:id'
                element={<Detail/>}
            />
            <Route
                path='/:category/view/:id'
                element={<View/>}
            />
            <Route
                path='/:category/view/:id/:episodeId'
                element={<View/>}
            />
            <Route
                path='/genre/:genre/:page'
                element={<Catalog/>}
            />
            <Route
                path='/genre/:genre'
                element={<Catalog/>}
            />
            <Route
                path='/search/:keyword'
                element={<SearchPage/>}
            ></Route>
            <Route
                path='/manage-acount'
                element={<ManageAcc/>}
            >
            </Route>
        </Routes>
    )
}

export default PageRoutes;