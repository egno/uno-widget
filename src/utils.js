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

  function format (n, template) {
    if (template.indexOf('%') > -1) {
      return template.replace('%', ''+n)
    }
    return `${n} ${template}`
  }

  if (!n) {
    return (textArray[3] !== undefined) ? textArray[3] : format(n, textArray[2])
  }
  if (n % 10 == 1 && (~~(n / 10)) % 10 != 1) {
    return format(n, textArray[0])
  }
  if (n % 10 < 5 && (~~(n / 10)) % 10 != 1) {
    return format(n, textArray[1])
  }
  return format(n, textArray[2])
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
export function formatDateISO (date) {
  if (!date) return
  let d = date
  return [
    d.getFullYear(),
    ('0' + (d.getMonth() + 1)).slice(-2),
    ('0' + d.getDate()).slice(-2)
  ].join('-')
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

export function dateFromISO (s) {
  const a = s.split(/[^0-9]/)
  let d=new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] )
  return d
}

export function displayRESTDate (s) {
  const d = dateFromISO(s)
  return displayDate(d)
}

export function displayRESTTime (s) {
  const d = dateFromISO(s)
  console.log(d)
  return formatTime(d)
}

export function timestampLocalISO (diff = 30) {
  let dt = new Date()
  dt = new Date(dt.getTime() + diff * 60000)
  return dateISOInLocalTimeZone(dt)
}

export function dateLocalISO (diff = 30) {
  let dt = new Date()
  dt = new Date(dt.getTime() + diff * 60000)
  return formatDateISO(dt)
}

export function employeeDisplay (n) {
    const masterForms = ["мастер", "мастера", "мастеров", "Нет мастеров"]
    return numberText(n, masterForms)
}

export function pgArray (a) {
  return `{${a.join(',')}}`
}

export function displayFullDate (dt) {
  let d = new Date(dt)
  return d.toLocaleString('ru', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).replace(' г.', '')
}

export function colorFromArray (id, colors){
  let h = Math.abs(hash(id))
  return colors[h % colors.length]
}

export function uuidToColor (id) {
  const colors = [
    ['#f3aa57', '#dfc496'],
    ['#f36b6b', '#f3a857'],
    ['#f36b6b', '#ef4e38'],
    ['#df8cb2', '#f36b6c'],
    ['#b88ab2', '#de8cb2'],
    ['#b88ab2', '#8689de'],
    ['#5a96df', '#8489df'],
    ['#49c9b7', '#5a97de'],
    ['#49c9b7', '#83ca87'],
    ['#85ca86', '#ddc497']
  ]
  return colorFromArray(id, colors)
}