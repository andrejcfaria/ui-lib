import React from 'react'
import ReactDOM from 'react-dom/client'
import { Button } from './Button'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Button onClick={() => console.log('tab click')}>Click Here</Button>
  </React.StrictMode>,
)
