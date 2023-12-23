import { TurnType, WisType } from './types'
import type { IPlayer } from './types'
import Undeufe from '~/components/rulesTypes/Undeufe.vue'
import Trumpf from '~/components/rulesTypes/Trumpf.vue'
import Slalom from '~/components/rulesTypes/Slalom.vue'
import Obeabe from '~/components/rulesTypes/Obeabe.vue'
import IconUp from '~/components/helpers/TypeUpIcon.vue'
import IconDown from '~/components/helpers/TypeDownIcon.vue'
import IconSlalom from '~/components/helpers/TypeSlalomIcon.vue'
import IconTrumpf from '~/components/helpers/TypeTrumpfIcon.vue'

import IconBlatt from '~/components/helpers/WisBlattIcon.vue'
import IconSimilar from '~/components/helpers/WisSimilarIcon.vue'

export const PlayerPlaceholder: IPlayer = {
  self: true,
  isHost: false,
  id: '',
  name: '',
  place: 0
}

export const RuleTypes = [
  {
    name: TurnType.UPDOWN,
    color: 'bg-blue-300',
    component: Obeabe,
    icon: IconUp
  },
  {
    name: TurnType.DOWNUP,
    color: 'bg-indigo-300',
    component: Undeufe,
    icon: IconDown
  },
  {
    name: 'Trumpf',
    color: 'bg-purple-300',
    component: Trumpf,
    icon: IconTrumpf
  },
  {
    name: 'Slalom',
    color: 'bg-pink-300',
    component: Slalom,
    icon: IconSlalom
  }
]

export const WisTypes = [
  {
    name: WisType.BLATT,
    icon: IconBlatt
  },
  {
    name: WisType.SIMILAR,
    icon: IconSimilar
  }
]
