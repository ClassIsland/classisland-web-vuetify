<script setup lang="ts">
const props = defineProps({
  foreground: String,
  featureTag: String,
  featureHeader: String
})
</script>

<template>
<div class="text-center">
  <h2 class="headline-feature text-center" >
    一款<span class="gradient-base"
                :style="`background-image: ${props.foreground}`">{{ props.featureTag }}</span>的大屏课表软件</h2>
</div>
</template>

<style scoped lang="scss">
.headline-feature {
  font-size: 42px;
  font-weight: bold;
  margin-bottom: 20px;
  line-height: 48px;
}

.tag{
  font-weight: 500;
  font-size: 24px;
}
</style>
