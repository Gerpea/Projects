const axios = require('axios').default
const getUrls = require('get-urls')
var Url = require('url-parse')

const { Graph } = require('../utils/graph')

async function buildGraph(firstLink, depth = 0, onlyOrigin = true) {
  const linkGraph = new Graph()

  let firstLinks = [firstLink]
  while (depth-- > 0) {
    let nextLinks = new Set()

    for (let i = 0; i < firstLinks.length; i++) {
      let links = (await getLinks(firstLinks[i])).map(function (link) {
        const url = new Url(link)
        return onlyOrigin ? url.hostname : `${url.hostname}${url.pathname}`
      })

      for (let link of links) {
        linkGraph.addEdge(firstLinks[i], link, {
          directed: true,
        })
      }

      links.forEach(function (link) {
        nextLinks.add(link)
      })
    }

    firstLinks = Array.from(nextLinks)
  }

  return linkGraph
}

async function getLinks(url) {
  const site = await axios
    .get(`http://${url}`)
    .then((value) => value.data)
    .catch((_) => '')
  return Array.from(
    getUrls(site, {
      stripHash: true,
      requireSchemeOrWww: true,
    })
  )
}

module.exports = buildGraph
