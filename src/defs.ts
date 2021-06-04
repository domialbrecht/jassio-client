import { IPlayer } from './types'
import Undeufe from '~/components/rulesTypes/Undeufe.vue'
import Trumpf from '~/components/rulesTypes/Trumpf.vue'
import Slalom from '~/components/rulesTypes/Slalom.vue'
import Obeabe from '~/components/rulesTypes/Obeabe.vue'
import IconUp from '~/components/helpers/TypeUpIcon.vue'
import IconDown from '~/components/helpers/TypeDownIcon.vue'
import IconSlalom from '~/components/helpers/TypeSlalomIcon.vue'
import IconTrumpf from '~/components/helpers/TypeTrumpfIcon.vue'

export const PlayerPlaceholder: IPlayer = {
  self: true,
  isHost: false,
  id: '',
  name: '',
  place: 0,
}

export const RuleTypes = [
  {
    name: 'Obeabe',
    color: 'bg-green-400',
    component: Obeabe,
    icon: IconUp,
  },
  {
    name: 'Undeufe',
    color: 'bg-blue-400',
    component: Undeufe,
    icon: IconDown,
  },
  {
    name: 'Trumpf',
    color: 'bg-red-400',
    component: Trumpf,
    icon: IconTrumpf,
  },
  {
    name: 'Slalom',
    color: 'bg-violet-400',
    component: Slalom,
    icon: IconSlalom,
  },
]
