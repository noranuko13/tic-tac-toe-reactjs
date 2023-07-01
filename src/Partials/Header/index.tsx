import React from 'react'
import './style.scss'
import { useTranslation } from 'react-i18next'

export function Header() {
  const { t } = useTranslation()
  return (
    <header data-testid="header" className="header">
      <h1>{t('title')}</h1>
    </header>
  )
}
