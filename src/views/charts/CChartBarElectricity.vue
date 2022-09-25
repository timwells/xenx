<template>
  <CChartBar :data="chartData" />
</template>

<script>
import { CChartBar } from '@coreui/vue-chartjs'

export default {
  name: 'CChartBarElectricity',
  props: {
    labels: { type: Array, default() { return [] } },
    data:   { type: Array, default() { return [] } },
  },
  components: { CChartBar },
  computed: {
    chartData() {
      return {
         labels: this.labels,
         datasets: [
            {
              label: 'Electricity Units',
              backgroundColor: '#6495ED',
              data: this.data,
            },
          ],
        }
    },
  },
}
</script>
