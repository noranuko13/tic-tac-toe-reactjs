import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { I18nextProvider } from 'react-i18next'
import { Game } from './domains'
import { i18next } from './i18n'
import './index.css'
import { Footer, Header, Wrapper } from './partials'
import reportWebVitals from './reportWebVitals'

// prettier-ignore
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18next}>
      <Wrapper>
        <ErrorBoundary
          fallback={<div className="text-center">Something went wrong</div>}
        >
          <Header />
          <Game />
          <Footer />
        </ErrorBoundary>
      </Wrapper>
    </I18nextProvider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
