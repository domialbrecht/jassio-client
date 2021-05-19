import Undeufe from '~/components/rulesTypes/Undeufe.vue'
import Trumpf from '~/components/rulesTypes/Trumpf.vue'
import Slalom from '~/components/rulesTypes/Slalom.vue'
import Obeabe from '~/components/rulesTypes/Obeabe.vue'

export const RuleTypes = [
  {
    name: 'Obeabe',
    color: 'bg-green-400',
    component: Obeabe,
  },
  {
    name: 'Undeufe',
    color: 'bg-blue-400',
    component: Undeufe,
  },
  {
    name: 'Trumpf',
    color: 'bg-red-400',
    component: Trumpf,
  },
  {
    name: 'Slalom',
    color: 'bg-violet-400',
    component: Slalom,
  },
]
