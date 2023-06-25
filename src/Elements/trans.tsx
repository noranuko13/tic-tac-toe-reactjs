import React, { ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

interface TransProps {
  text: string
}

export function Trans(props: TransProps): ReactElement {
  const { t } = useTranslation()
  return <>{t(props.text)}</>
}
