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

export interface ICard {
  id: number
  display: string
  value: number
  suit: 'heart' | 'diamond' | 'spade' | 'club'
}

export interface IBoard {
  r1: ICard
  b1: ICard
  r2: ICard
  b2: ICard
}
