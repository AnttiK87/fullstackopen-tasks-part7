import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './reducers/store'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'

const rootElement = document.getElementById('root')

rootElement.style.minHeight = '100vh'

ReactDOM.createRoot(rootElement).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)
