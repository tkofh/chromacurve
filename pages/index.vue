<template>
  <div class="h-screen flex space-x-4 items-stretch">
    <div class="overflow-auto">
      <div class="space-y-2 p-4 pr-2">
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
          v-model="brightness"
          title="Brightness"
          :min="0"
          :max="100"
          :default-start="100"
          :default-end="20"
        />
      </div>
    </div>
    <div class="flex-grow flex overflow-y-auto">
      <div class="p-4 pl-2 w-full">
        <div class="rounded-lg shadow-lg">
          <div
            v-for="(color, index) in colors"
            :key="color + index"
            :style="{ backgroundColor: color.hex }"
            class="h-6 w-full flex justify-between px-2 items-center"
          >
            <span
              class="block rounded-sm h-4 pl-1 pr-4 leading-4 bg-black text-white text-xs"
            >
              {{ color.hex }}
            </span>
            <span
              class="block rounded-sm h-4 pr-1 pl-4 leading-4 bg-white text-black text-xs"
            >
              {{ color.hex }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@nuxtjs/composition-api'
import { generate } from '@k-vyn/coloralgorithm/src/index.ts'
import { Color } from '@k-vyn/coloralgorithm/src/types.ts'

interface CurveConfig {
  start: number
  end: number
  curve: number[]
}

export default defineComponent({
  name: 'Index',
  setup() {
    const hue = ref<CurveConfig | null>(null)
    const saturation = ref<CurveConfig | null>(null)
    const brightness = ref<CurveConfig | null>(null)

    const steps = 100

    const colors = computed<Color[]>(() => {
      if (!hue.value || !saturation.value || !brightness.value) {
        return []
      }

      const { colors } = generate({
        steps,
        hue: hue.value,
        saturation: {
          curve: saturation.value.curve,
          start: saturation.value.start * 0.01,
          end: saturation.value.end * 0.01,
          rate: 1,
        },
        brightness: {
          curve: brightness.value.curve,
          start: brightness.value.start * 0.01,
          end: brightness.value.end * 0.01,
        },
      })[0]

      console.log({
        steps,
        hue: hue.value,
        saturation: {
          curve: saturation.value.curve,
          start: saturation.value.start * 0.01,
          end: saturation.value.end * 0.01,
          rate: 1,
        },
        brightness: {
          curve: brightness.value.curve,
          start: brightness.value.start * 0.01,
          end: brightness.value.end * 0.01,
        },
      })

      return colors
    })

    return {
      hue,
      saturation,
      brightness,
      colors,
    }
  },
})
</script>
