<script setup>
import { reactive, computed, onMounted, defineProps, defineEmits, watch } from 'vue'
import { useStore } from 'vuex'

import TeamLabel from '@/components/TeamLabel.vue'

const store = useStore()

const props = defineProps({
  spaceTeam: Object
})

const isSpaceMember = computed(() => store.getters['currentUser/isSpaceMember']())
const spacePrivacyIsOpen = computed(() => store.state.currentSpace.privacy === 'open')
const showInExplore = computed(() => store.state.currentSpace.showInExplore)
</script>

<template lang="pug">
template(v-if="!isSpaceMember")
  .row.align-items-top.read-only-space-info-badges
    .badge.info(v-if="!spacePrivacyIsOpen")
      span Read Only
    .badge.success(v-if="spacePrivacyIsOpen")
      img.icon.comment(src="@/assets/comment.svg")
      span Open to Comments
    .badge.status(v-if="showInExplore")
      img.icon.sunglasses(src="@/assets/sunglasses.svg")
      span In Explore
  .row(v-if="props.spaceTeam")
    .badge.secondary
      TeamLabel(:team="props.spaceTeam" :showName="true")
</template>

<style lang="stylus">
.read-only-space-info-badges
  align-items flex-start
  flex-wrap wrap
  .sunglasses
    margin-left 1px
</style>
