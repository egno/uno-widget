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