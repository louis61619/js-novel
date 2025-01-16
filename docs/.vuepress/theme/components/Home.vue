<template>
  <Layout>
    <template #page>
      <main class="vp-home">
        <header class="vp-hero">
          <img class="vp-hero-image" :src="withBase(data.heroImage)" alt="home-logo" />

          <h1>{{ localData.title }}</h1>
          <p class="vp-hero-description">
            <span ref="desDom"></span>
          </p>
          <p class="vp-hero-actions">
            <AutoLink class="vp-hero-action-button" :config="data.actions[0]">
              {{ data.actions[0].text }}
            </AutoLink>
          </p>
        </header>
        <div class="vp-footer">
          {{ data.footer }}
        </div>
      </main>
    </template>
  </Layout>
</template>

<script>
import { defineComponent, onMounted, ref } from 'vue'
import Layout from '@vuepress/theme-default/lib/client/layouts/Layout.vue'
import { usePageFrontmatter, useSiteLocaleData, withBase } from '@vuepress/client'
import { init } from 'ityped'
import { AutoLink } from 'vuepress/client'

export default defineComponent({
  name: 'HomePage',
  components: {
    Layout,
    AutoLink
  },
  setup() {
    const data = usePageFrontmatter()
    const desDom = ref(null)
    const desHeight = ref(null)
    const domHeight = ref(0)
    const localData = useSiteLocaleData()

    onMounted(() => {
      init(desDom.value, { showCursor: true, strings: [localData.value.description + '...'] })
    })

    return {
      data,
      localData,
      desDom,
      desHeight,
      domHeight,
      withBase
    }
  }
})
</script>

<style lang="scss" scoped>
.hero {
  .description {
    padding-bottom: 3rem;
  }
}
.vp-hero-action-button {
  display: block;
  border: none;
  outline: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.75rem;
  letter-spacing: 4px;
  color: white;
  background: #000000;
  border-radius: 8px;
  margin: 3rem 0;

  &:hover {
    background-color: #1a1a26;
  }
}
</style>
