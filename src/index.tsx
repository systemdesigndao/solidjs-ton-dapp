/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route, Routes } from "@solidjs/router";

import './index.css'
import App from './App'
import { AnotherPage } from './pages/AnotherPage';

const root = document.getElementById('root')

render(() => (
    <Router>
      <Routes>
        <Route path="/" component={App} />
        <Route path="/another-page" component={AnotherPage} />
      </Routes>
    </Router>
), root!)
