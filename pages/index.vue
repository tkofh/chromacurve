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
        <div class="flex flex-col space-y-1">
          <label for="rate">Saturation Rate</label>
          <input
            id="rate"
            v-model="rate"
            name="rate"
            type="range"
            min="0"
            max="2"
            step="0.01"
          />
        </div>
        <div class="flex flex-col space-y-1">
          <label for="rotation">Rotation</label>
          <select
            id="rotation"
            v-model="rotation"
            name="rotation"
            class="border border-gray-300 rounded p-1 w-full"
          >
            <option value="cw">Clockwise</option>
            <option value="ccw">Counter Clockwise</option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex-grow flex overflow-y-auto">
      <div class="p-4 pl-2 w-full">
        <div class="rounded-lg shadow-lg">
          <div
            v-for="(color, index) in colors"
            :key="color + index"
            :style="{ backgroundColor: color.hex }"
            class="h-5 w-full flex justify-between px-2 items-center"
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
import { generate } from '@k-vyn/coloralgorithm'

type Color = {
  step: number
  hue: number
  saturation: number
  brightness: number
  isMajor: boolean
  isLocked: boolean
  hex: string
  hsl: number[]
  hsv: number[]
  lab: number[]
  rgbString: string
  rgbArray: number[]
  rgbaString: string
  rgbaArray: number[]
}

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
    const rate = ref<number>(1)

    const brightness = ref<CurveConfig | null>(null)

    const rotation = ref<'cw' | 'ccw'>('cw')

    const steps = 100

    const colors = computed<Color[]>(() => {
      if (!hue.value || !saturation.value || !brightness.value) {
        return []
      }

      const properties = {
        steps,
        hue: {
          curve: hue.value.curve,
          start: hue.value.start * 1,
          end: hue.value.end * 1,
        },
        saturation: {
          curve: saturation.value.curve,
          start: saturation.value.start * 0.01,
          end: saturation.value.end * 0.01,
          rate: rate.value,
        },
        brightness: {
          curve: brightness.value.curve,
          start: brightness.value.start * 0.01,
          end: brightness.value.end * 0.01,
        },
      }
      const options = {
        minorSteps: [],
        provideInverted: false,
        rotation: rotation.value,
      }

      const { colors } = generate(properties, options)[0]

      // eslint-disable-next-line no-console
      console.log(JSON.stringify([{ properties, options }]))

      return colors
    })

    return {
      hue,
      saturation,
      rate,
      brightness,
      rotation,
      colors,
    }
  },
})
</script>
