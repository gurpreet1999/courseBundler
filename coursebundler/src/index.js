import { ColorModeScript } from '@chakra-ui/react';
import React  from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider ,theme} from '@chakra-ui/react';
import { Provider } from 'react-redux'
import STORE from './redux/Store';




const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  
  
 
 
    <ChakraProvider theme={theme}>
    <ColorModeScript />
    <Provider store={STORE}  >
    <App />
    </Provider>
    </ChakraProvider>

     
 
  
);

