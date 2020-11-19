exports.distance = function (fP, sP) {
  const R = 6371000
  const phi1 = (fP.lat * Math.PI) / 180
  const phi2 = (sP.lat * Math.PI) / 180
  const dPhi = ((sP.lat - fP.lat) * Math.PI) / 180
  const dLa = ((sP.lon - fP.lon) * Math.PI) / 180

  const a =
    Math.sin(dPhi / 2) * Math.sin(dPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLa / 2) * Math.sin(dLa / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return R * c
}
