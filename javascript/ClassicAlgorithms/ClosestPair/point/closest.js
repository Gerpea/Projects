const { pointDistance } = require('./utils')

exports.closestDistance = function (points) {
  const xPoints = points.sort(function (a, b) {
    return a.x - b.x
  })
  const yPoints = points.sort(function (a, b) {
    return a.y - b.y
  })
  return closest(xPoints, yPoints)
}

function closest(xPoints, yPoints) {
  let length = xPoints.length

  if (length <= 3) {
    return bruteForce(xPoints)
  }

  let mid = Math.floor(length / 2)
  const midPoint = xPoints[mid]

  let pyl = []
  let pyr = []
  yPoints.forEach(function (yPoint) {
    if (yPoint.x <= midPoint.x && pyl.length < mid) {
      pyl.push(yPoint)
    } else {
      pyr.push(yPoint)
    }
  })

  let dl = closest(xPoints.slice(0, mid), yPoints.slice(0, mid))
  let dr = closest(xPoints.slice(mid), yPoints.slice(mid))

  let d = Math.min(dl, dr)
  let strip = []
  yPoints.forEach(function (yPoint) {
    if (Math.abs(yPoint.x - midPoint.x) < d) {
      strip.push(yPoint)
    }
  })

  return stripClosest(strip, d)
}

function stripClosest(strip, d) {
  let length = strip.length

  let min = d
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length && strip[j].y - strip[i].y < min; j++) {
      const dist = pointDistance(strip[i], strip[j])
      if (dist < min) {
        min = dist
      }
    }
  }

  return min
}

function bruteForce(points) {
  const length = points.length
  let min = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      const dist = pointDistance(points[i], points[j])
      if (dist < min) {
        min = dist
      }
    }
  }
  return min
}
