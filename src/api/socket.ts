import { io } from 'socket.io-client'

const URL = 'http://localhost:5100'
const socket = io(URL, { autoConnect: false, reconnectionAttempts: 5 })

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export default socket
