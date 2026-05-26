import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'
import { applySeoMetadata, getPageOrigin, injectJsonLd } from './lib/seo'
import { assetUrl } from './lib/assets'
import { SITE } from './config/site'

function preloadLcpImage() {
  const href = assetUrl(SITE.lcpImagePath)
  if (document.querySelector(`link[rel="preload"][href="${href}"]`)) return
  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = href
  link.setAttribute('fetchpriority', 'high')
  document.head.appendChild(link)
}

preloadLcpImage()
applySeoMetadata()
injectJsonLd(getPageOrigin())

/** GitHub Pages: BASE_URL = /demo/ — без basename маршрут "/" не матчится, экран чёрный */
const routerBasename = import.meta.env.BASE_URL.replace(/\/$/, '') || undefined

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
