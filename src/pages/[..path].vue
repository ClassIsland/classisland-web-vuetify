<script setup lang="ts">
import FluentButton from '../components/fluent/FluentButton.vue';
import FluentSystemIcon from '../components/FluentSystemIcon.vue';
</script>

<template>
  <div class="page-margin-x mt-12">
    <h2 class="align-self-center text-center mb-6 text-h3 font-weight-bold fluent-title">Σ(っ °Д °;)っ</h2>
    <h2 class="align-self-center text-center mb-6 text-h4 font-weight-bold fluent-title">404</h2>
    <p class="text-center align-self-center mb-16 fluent-description">找不到请求的页面。</p>

    <div class="justify-center d-flex flex-row flex-wrap">
      <FluentButton variant="primary" to="/">
        <template #prepend><FluentSystemIcon name="home" /></template>
        返回首页
      </FluentButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fluent-title {
  font-family: var(--font-family-base);
  color: var(--fill-color-text-primary);
}

.fluent-description {
  font-family: var(--font-family-base);
  color: var(--fill-color-text-secondary);
}
</style>
