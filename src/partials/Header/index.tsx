import { useTranslation } from 'react-i18next'
import './style.scss'

export function Header() {
  const { t } = useTranslation()
  return (
    <header data-testid="header" className="header">
      <h1>{t('title')}</h1>
    </header>
  )
}
