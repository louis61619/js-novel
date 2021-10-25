<template>
  <Layout>
    <template #page>
      <main class="home home-container">
        <header class="hero">
          <img src="/images/home.svg" alt="home-logo" />

          <h1>{{ localData.title }}</h1>
          <p class="description" :style="{ height: `${domHeight}px` }">
            <span ref="desDom"></span>
          </p>
          <button class="actions">
            <a :href="data.actions[0].link">{{ data.actions[0].text }}</a>
          </button>
        </header>
        <div class="footer">
          {{ data.footer }}
        </div>
      </main>
    </template>
  </Layout>
</template>

<script>
import { defineComponent, onMounted, ref, onUnmounted } from 'vue'
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

    const setDesHeight = () => {
      domHeight.value = desHeight.value.clientHeight
    }

    onMounted(() => {
      // setDesHeight()
      // window.addEventListener('resize', setDesHeight)
      init(desDom.value, { showCursor: true, strings: [localData.value.description + '...'] })
    })

    onUnmounted(() => {
      // window.removeEventListener('resize', setDesHeight)
    })

    return {
      data,
      localData,
      desDom,
      desHeight,
      domHeight
    }
  }
})
</script>

<style lang="scss" scoped>
.hero {
  /* padding-top: 1rem;
  height: calc(100vh - 8rem);
  padding-left: 2rem; */
  /* padding-bottom: 3rem; */

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
