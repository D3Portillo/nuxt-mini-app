<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui"

const router = useRouter()
const route = useRoute()

const items: TabsItem[] = [
  {
    label: "Welcome",
    icon: "i-fluent-emoji-flat-vulcan-salute",
    value: "/",
  },
  {
    label: "My NFTs",
    icon: "i-fxemoji-gem",
    value: "/collection",
  },
]

const modelActiveTab = computed({
  get: () => route.path,
  set: (path) =>
    router.push({
      path,
    }),
})
</script>

<template>
  <nav class="sticky flex bottom-0 z-10 bg-white border-t border-gray-200">
    <UTabs
      size="lg"
      color="info"
      :content="false"
      :items="items"
      v-model="modelActiveTab"
      class="w-full"
    />
  </nav>
</template>
