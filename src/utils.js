export function hash (s) {
  if (!s) {
    return 0
  }
  return s.split('').reduce(function (a, b) {
    a = (a << 5) - a + b.charCodeAt(0)
    return a & a
  }, 0)
}

export function hashColor (value, sat = 100, light = 50) {
  let h = hash(value) % 360
  return `hsl(${h}, ${sat}%, ${light}%)`
}

export function uuidv4 () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export function numberText (n, textArray) {
  if (!n) {
    return (textArray[3] !== undefined) ? textArray[3] : `${n} ${textArray[2]}`
  }
  if (n % 10 == 1 && (~~(n / 10)) % 10 != 1) {
    return `${n} ${textArray[0]}`
  }
  if (n % 10 < 5 && (~~(n / 10)) % 10 != 1) {
    return `${n} ${textArray[1]}`
  }
  return `${n} ${textArray[2]}`
}

export function dateISOInLocalTimeZone (date) {
  const d = new Date(date)
  const l = d.getTime() - d.getTimezoneOffset() * 60000
  const dl = new Date(l)
  return dl.toISOString().slice(0, 19)
}


function displayDate (date) {
  if (!date) return
  let d = date
  return [
    ('0' + d.getDate()).slice(-2),
    ('0' + (d.getMonth() + 1)).slice(-2),
    d.getFullYear()
  ].join('.')
}

export function formatTime (date) {
  if (!date) return
  let d = date
  // console.log(date, d);
  return [
    ('0' + d.getHours()).slice(-2),
    ('0' + d.getMinutes()).slice(-2)
  ].join(':')
}

export function displayRESTDate (s) {
  const d = new Date(Date.parse(s))
  return displayDate(d)
}

export function displayRESTTime (s) {
  const d = new Date(Date.parse(s))
  return formatTime(d)
}

export function timestampLocalISO (diff = 30) {
  let dt = new Date()
  dt = new Date(dt.getTime() + diff * 60000)
  return dateISOInLocalTimeZone(dt)
}

export function employeeDisplay (n) {
    const masterForms = ["мастер", "мастера", "мастеров", "Нет мастеров"]
    return numberText(n, masterForms)
}