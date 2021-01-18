import net from 'net'

const server = net
  .createServer((socket) => {
    socket.on('data', (data) => {
      console.log(data.toString())
    })

    socket.write('SERVER: Hello! This is server speaking.')
    socket.end('SERVER: Closing connection now.')
  })
  .on('error', (err) => {
    console.log(err)
  })

server.listen(9898, () => {
  console.log('opened server on', server.address().port)
})
