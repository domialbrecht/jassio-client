import { io } from 'socket.io-client'

const URL =
  import.meta.env.MODE === 'development' ? 'http://localhost:5100' : 'https://api.jasse.io'
const socket = io(URL, { autoConnect: false, reconnectionAttempts: 5 })

socket.onAny((event, ...args) => {
  console.log(event, args)
})

export default socket
