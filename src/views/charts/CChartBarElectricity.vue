<template>
  <CChart
    type="bar"
    :data="chartData"
    @get-element-at-event="chartElementEvent"
  />
</template>

<script>
/*
@get-dataset-at-event="chartDatasetEvent"
@get-element-at-event="chartElementEvent"
@get-elements-at-event="chartElementsEvent"
*/
import { CChart } from '@coreui/vue-chartjs'

export default {
  name: 'CChartBarElectricity',
  props: {
    label:  { type: String, default:''},
    labels: { type: Array, default() { return [] } },
    data:   { type: Array, default() { return [] } },
  },
  components: { 
    CChart
  },
  computed: {
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: this.label,
            backgroundColor: '#6495ED',
            data: this.data,
          },
        ],
      }
    },
  },
  methods: {
    // https://coreui.io/vue/docs/components/chart.html#cchart
    chartElementEvent(value) {
      this.$emit("onBarClick", this.labels[value[0].index])
    }
  }
}
</script>
