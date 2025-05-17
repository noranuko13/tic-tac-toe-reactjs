import { useTranslation } from 'react-i18next'
import classNames from 'classnames'

export function Header() {
  const { t } = useTranslation()
  return (
    <header data-testid="header" className={classNames('pb-5 text-center')}>
      <h1
        className={classNames(
          'py-1 text-xl font-semibold italic',
          'border-b-4 border-t-4 border-double border-stone-400',
        )}
      >
        {t('title')}
      </h1>
    </header>
  )
}
