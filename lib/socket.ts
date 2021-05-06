import { io } from 'socket.io-client'

const URL = process.env.NEXT_PUBLIC_SOCKET_SERVER
const socket = io(URL, { autoConnect: false })

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export default socket
