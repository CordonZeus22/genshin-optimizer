import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { isDev } from '@genshin-optimizer/common/util'
import React from 'react'
import { createRoot } from 'react-dom/client'
import ReactGA from 'react-ga4'
import App from './app/App'
import NewTab from './app/NewTab'
import './index.css'
ReactGA.initialize(process.env.NX_GA_TRACKINGID as any, {
  testMode: isDev,
})
let mode: 'main' | 'newtab' = 'main'
let root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// Detect a storage event, and unmount the main page to show a newTab event.
function handleStorage(this: Window, event: StorageEvent) {
  if (event.key !== 'GONewTabDetection') return
  if (mode === 'newtab') return
  mode = 'newtab'
  this.document.title = 'ERROR'
  root.unmount()
  root = createRoot(document.getElementById('root') as HTMLElement)
  root.render(
    <React.StrictMode>
      <NewTab />
    </React.StrictMode>
  )
}
window.addEventListener('storage', handleStorage)
