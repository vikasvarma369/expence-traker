import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import GridBackground from './components/UI/GridBackground.jsx'

import { ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_NODE_ENV === 'development' ? import.meta.env.VITE_GRAPHQL_SERVER_URI : '/graphql',
  cache: new InMemoryCache(),
  credentials: 'include'
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
			<GridBackground>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>,
			</GridBackground>,
		</BrowserRouter>,
  </StrictMode>,
)
