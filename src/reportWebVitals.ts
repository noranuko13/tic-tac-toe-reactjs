import { MetricType } from 'web-vitals'

const reportWebVitals = (onPerfEntry?: (metric: MetricType) => void) => {
  // noinspection SuspiciousTypeOfGuard
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ onCLS, onFCP, onINP, onLCP, onTTFB }) => {
      onCLS(onPerfEntry)
      onFCP(onPerfEntry)
      onINP(onPerfEntry)
      onLCP(onPerfEntry)
      onTTFB(onPerfEntry)
    })
  }
}

export default reportWebVitals
