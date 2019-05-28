<template>
  <div class="wcocontainer">
    <h1>Élection</h1>
    <div v-if="allDelegates && allDelegates.length" class="flex-grow">
      <info>
        Bienvenue sur la page de délégation de votre vote. Vous pouvez choisir une personne qui va vous représenter lors de vos prochains votes
        <b>Votre vote est réatribuable à tout moment.</b> Si aucun délégue n'est sélectionné, le vote est à faire manuellement depuis la carte
      </info>
      <div class="flex" v-for="delegate in allDelegates" :key="delegate.id">
        <DelegatePreview
          v-bind="delegate"
          v-touch:swipe.left="() => openMenuStart(delegate.id)"
          v-touch:swipe.right="closeMenu"
        />
        <transition name="width">
          <delegate-picker :id="delegate.id" v-if="openedMenu === delegate.id"/>
        </transition>
      </div>
    </div>
    <info v-else title="Aucun représentant(s)" class="mt-3">Revenez plus tard</info>
  </div>
</template>

<script>
import DelegatePreview from '@/components/DelegatePreview'
import info from '@/components/info'
import delegatePicker from '@/components/delegatePicker'
import { allDelegates } from '@/graphql/query'

export default {
  name: 'Delegation',
  components: {
    DelegatePreview,
    info,
    delegatePicker
  },
  data: () => ({
    allDelegates: null,
    openedMenu: null
  }),
  apollo: {
    allDelegates
  },
  asyncData () {
    return new Promise(resolve => {
      setTimeout(() => {
        return resolve()
      }, 1000)
    })
  },
  methods: {
    openMenuStart (id) {
      if (id === this.openedMenu) {
        this.openedMenu = false
      } else {
        this.openedMenu = false
        this.openedMenu = id
      }
    },
    closeMenu () {
      this.openedMenu = null
    }
  }
}
</script>
