import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import Travel from '../pages/Travel'
import TrainTicket from '../pages/TrainTicket'

// import Header from './components/Header'

const App = () => {
    return (
        <div className='App'>
            <BrowserRouter>
                <Route path='/' exact component={Travel} />
                <Route path='/train/list' component={TrainTicket}/>
            </BrowserRouter>
        </div>
    )
}

export default App
