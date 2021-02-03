<template>
  <div class="h-screen flex space-x-4 items-stretch">
    <div class="overflow-auto">
      <div class="space-y-2 p-4">
        <CurveEditor
          v-model="hue"
          title="Hue"
          :min="0"
          :max="360"
          :default-start="200"
          :default-end="220"
        />
        <CurveEditor
          v-model="saturation"
          title="Saturation"
          :min="0"
          :max="100"
          :default-start="85"
          :default-end="100"
        />
        <CurveEditor
          v-model="lightness"
          title="Brightness"
          :min="100"
          :max="0"
          :default-start="95"
          :default-end="20"
        />
      </div>
    </div>
    <div class="py-4 pr-4 flex-grow flex">
      <div
        class="rounded-lg shadow-lg shadow-lg flex-grow flex flex-col overflow-hidden"
      >
        <div
          v-for="(color, index) in colors"
          :key="color + index"
          :style="{ backgroundColor: color }"
          class="h-full flex-shrink w-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import Bezier from '~/lib/Bezier'

interface CurveConfig {
  start: number
  end: number
  curve: Bezier
}

const solve = (config: CurveConfig, progress: number) => {
  const curveProgress = config.curve.solve(progress)
  return Math.round(
    config.end * curveProgress + config.start * (1 - curveProgress)
  )
}

export default defineComponent({
  name: 'Index',
  setup() {
    const hue = ref<CurveConfig | null>(null)
    const saturation = ref<CurveConfig | null>(null)
    const lightness = ref<CurveConfig | null>(null)

    const samples = 500

    const colors = computed<string[]>(() => {
      if (!hue.value || !saturation.value || !lightness.value) {
        return []
      }

      const out = []
      for (let i = 0; i <= samples; i++) {
        const progress = i / samples
        out.push(
          `hsl(${solve(hue.value as CurveConfig, progress)}, ${solve(
            saturation.value as CurveConfig,
            progress
          )}%, ${solve(lightness.value as CurveConfig, progress)}%)`
        )
      }

      return out
    })

    return {
      hue,
      saturation,
      lightness,
      colors,
    }
  },
})
</script>
