export interface IHostSetting {
  winAmount: number
  enableWise: boolean
}

export interface User {
  email: string
}

export interface GameStats {
  amount: number
}

export enum TurnType {
  UPDOWN = 'Obeabe',
  DOWNUP = 'Undeufe',
  SLALOM_UP = 'Slalom_up',
  SLALOM_DOWN = 'Slalom_down',
  T_HEART = 'Trumpf_heart',
  T_DIAMOND = 'Trumpf_diamond',
  T_SPADE = 'Trumpf_spade',
  T_CLUB = 'Trumpf_club'
}

export enum WisType {
  BLATT = 'blatt',
  STOECK = 'stoeck',
  SIMILAR = 'similar'
}

export enum Team {
  TeamA,
  TeamB
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

export type PlayedCard = {
  display: string
  place: number
  value: number
}

export type WisInfo = {
  playerId: string
  playerPlace: number
  wise: number[]
}

export type WisDeclare = {
  id: number
  type: string
  cards: ICard[]
}
