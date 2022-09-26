<template>
  <div>
    <CRow>
      <CCol :md="6" class="mb-4">
        <CCard v-if="labels.length>0">
          <CCardHeader>Daily Electricity Watt Units</CCardHeader>
          <CCardBody>
            <CChartBarElectricity @onBarClick="onBarClickEvent" label="Daily Units" :labels="labels" :data="totals" />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol :md="6" class="mb-4">
        <CCard v-if="loadedDaily">
          <CCardHeader v-if="loadedDaily">Hourly Electricity Watt Units</CCardHeader>
          <CCardBody>
            <CChartBarElectricity :label="selectedDayLabel()" :labels="dailyLabels" :data="dailyData" />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
<script>
import { mapState } from "vuex";
import CChartBarElectricity from '@/views/charts/CChartBarElectricity'

export default {
  name: 'Energy',
  components: {
    CChartBarElectricity
  },
	computed: {
    ...mapState("energyEvents", ["events","labels","totals","dailyLabels","dailyData"]),
	},
  watch: {
    dailyData(n,o) {
      this.loadedDaily = true     
    }
  },
  data: () => ({
    loadedDaily: false,
    selectedDay: ""
  }),  
  setup() {
    return {}
  },
  methods: {
    onBarClickEvent(event) {
      this.loadedDaily = false
      this.$store.dispatch("energyEvents/getDailyEvents", {dateIndex: event})
      this.selectedDay = event
    },
    selectedDayLabel() { return `${this.selectedDay} - Hourly Electricity Watt Units` }
  },
  mounted() {
    this.$store.dispatch("energyEvents/getEvents")
	}	
}
</script>
