// importing required modules
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// importing required components
import Home from './Home';
import Chat from './Chat';

// importing css
import '../style.css';

// Router Setup
const ReactRouterSetup = () => {

    return <>
        <div className='container clearfix'>
            {/* Router component */}
            <Router>
                {/* Home component */}
                <Home />

                {/* Routes component */}
                <Routes>

                    {/* Route for Chat component */}
                    <Route path='/chat/:id' element={<Chat />}></Route>
                </Routes>
            </Router>
        </div>
    </>
}

// exporting Router Setup
export default ReactRouterSetup