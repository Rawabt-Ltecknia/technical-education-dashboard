<script setup>
import { ref, onMounted, onBeforeUnmount, watch, computed, defineProps } from 'vue'
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Tooltip,
  Legend
} from 'chart.js'
import 'chartjs-adapter-date-fns'

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, Tooltip, Legend)

const props = defineProps({
  measurements: { type: Array, required: true },
  title: { type: String, default: 'Gas Measurements Over Time' },
  height: { type: Number, default: 360 }
})

const canvasRef = ref(null)
let chartInstance = null

// تجهيز البيانات للشارت
const chartData = computed(() => {
  const sorted = [...props.measurements].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  return {
    propane: sorted.map(d => ({ x: new Date(d.timestamp), y: d.propane ?? null })),
    butane: sorted.map(d => ({ x: new Date(d.timestamp), y: d.butane ?? null }))
  }
})

function createChart() {
  const ctx = canvasRef.value.getContext('2d')
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'Propane',
          data: chartData.value.propane,
          borderColor: 'rgba(59,130,246,0.9)',
          fill: false,      // خطوط فقط بدون تعبئة
          tension: 0.25,
          pointRadius: 3
        },
        {
          label: 'Butane',
          data: chartData.value.butane,
          borderColor: 'rgba(16,185,129,0.9)',
          fill: false,
          tension: 0.25,
          pointRadius: 3
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: 'time',    // محور الوقت
          title: {
            display: true,
            text: 'Time',
            font: { size: 16, weight: 'bold' }
          },
          time: {
            unit: 'minute',  // أو 'hour' إذا تريد تقسيم بالساعات
            tooltipFormat: 'HH:mm',   // عند تمرير الماوس يظهر فقط ساعة:دقيقة
            displayFormats: { minute: 'HH:mm', hour: 'HH:mm' } // كيف يظهر على المحور
          }
        },
        y: {
          type: 'linear',
          beginAtZero: true,
          title: {
            display: true,
            text: 'Butane / Propane Concentration',
            font: { size: 16, weight: 'bold' }
          }
        }
      },
      plugins: {
        legend: { position: 'top' },
        tooltip: { mode: 'nearest', intersect: false }
      }
    }
  })
}

function updateChart() {
  if (!chartInstance) return
  chartInstance.data.datasets[0].data = chartData.value.propane
  chartInstance.data.datasets[1].data = chartData.value.butane
  chartInstance.update()
}

function exportChart() {
  if (!chartInstance) return
  const link = document.createElement('a')
  link.href = chartInstance.toBase64Image()
  link.download = 'gas_measurements_chart.png'
  link.click()
}

onMounted(createChart)
onBeforeUnmount(() => chartInstance?.destroy())
watch(() => props.measurements, updateChart, { deep: true })
</script>

<template>
  <v-card class="rounded-2xl" elevation="2">
    <v-card-title class="text-h6 py-3 d-flex align-center justify-space-between">
      <span>{{ title }}</span>
      <v-btn size="small" variant="outlined" color="primary" @click="exportChart">
        تصدير كصورة
      </v-btn>
    </v-card-title>
    <v-divider />
    <v-card-text class="pt-4">
      <div :style="{ height: height + 'px' }">
        <canvas ref="canvasRef" :height="height"></canvas>
      </div>
    </v-card-text>
  </v-card>
</template>
