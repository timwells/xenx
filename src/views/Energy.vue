<template>
  <div>
    <CCard>
      <CCardHeader>Electricity</CCardHeader>
        <CCardBody v-if="labels.length>0">
          <CChartBarElectricity :labels="labels" :data="totals" />
        </CCardBody>
    </CCard>
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
    ...mapState("energyEvents", ["events","labels","totals"])
	},
  setup() {
    return {
    }
  },
  mounted() {
    this.$store.dispatch("energyEvents/getEvents")
	}	
}
</script>
