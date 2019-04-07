export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('it-IT')
  return time.substr(0, 5)  + ' ' + d.toLocaleDateString()
}
