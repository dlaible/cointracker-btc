import {
  ChakraProvider,
  Container,
} from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'

import Profile from './components/profile/profile'
import ProfileData from './components/profiledata/profiledata'
import theme from './helpers/theme'

import './index.css'

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Container maxW='container.md' my='6'>
        <Profile />
        <ProfileData />
      </Container>
    </ChakraProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
