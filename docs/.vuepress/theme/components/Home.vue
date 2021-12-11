<template>
  <Layout>
    <template #page>
      <main class="home home-container">
        <header class="hero">
          <img :src="withBase(data.heroImage)" alt="home-logo" />

          <h1>{{ localData.title }}</h1>
          <p class="description" :style="{ height: `${domHeight}px` }">
            <span ref="desDom"></span>
          </p>
          <a :href="withBase(data.actions[0].link)">
            <button class="actions">
              {{ data.actions[0].text }}
            </button>
          </a>
        </header>
        <div class="footer">
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

export default defineComponent({
  name: 'HomePage',
  components: {
    Layout
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

  button {
    display: block;
    border: none;
    outline: none;
    cursor: pointer;
    font-weight: bold;
    font-size: 1rem;
    line-height: 1.75rem;
    letter-spacing: 4px;
    color: white;
    padding: 8px 32px;
    background: #000000;
    border-radius: 8px;
    margin: 3rem 0;

    &:hover {
      background-color: #1a1a26;
    }

    a {
      color: inherit;

      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
