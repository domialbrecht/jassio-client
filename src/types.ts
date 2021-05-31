export interface IHostSetting {
  winAmount: number
  enableWise: boolean
}

export interface IPlayer {
  self: boolean
  isHost: boolean
  id: string
  name: string
  place: number
}

export interface ICard {
  id: number
  display: string
  value: number
  suit: 'heart' | 'diamond' | 'spade' | 'club'
}

export interface ITeamSlots {
  r1: string | undefined
  r2: string | undefined
  b1: string | undefined
  b2: string | undefined
}

export interface IBoard {
  r1: ICard
  b1: ICard
  r2: ICard
  b2: ICard
}
