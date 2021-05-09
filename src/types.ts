export interface IHostSetting {
  winAmount: number
  enableWise: boolean
}
export interface IPlayer {
  self: boolean
  isHost: boolean
  id: string
  name: string
  teamRed: boolean
}
