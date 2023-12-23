import { Socket } from 'socket.io-client'
import { ref } from 'vue'
export default function useTurnFunctions(socket: Socket) {
  const showPicker = ref(false)
  const isSwitch = ref(false)
  const selectedTypeName = ref('')
  // TODO: Secure me on server with check
  socket.on('turnselect', (sw: boolean) => {
    showPicker.value = true
    isSwitch.value = sw
  })
  const onSelectType = (type: string) => {
    showPicker.value = false
    selectedTypeName.value = type
    socket.emit('typeselected', type)
  }
  socket.on('typegotselected', (type: string) => {
    selectedTypeName.value = type
  })
  return {
    selectedTypeName,
    showPicker,
    isSwitch,
    onSelectType
  }
}
