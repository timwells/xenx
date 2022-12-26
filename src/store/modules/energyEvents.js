import { getDatabase, ref, child, get} from "firebase/database";

/*
 events2\20220924\total = 203
 events2\20220924\01\subtotal = 13 
*/

export default {
    namespaced: true,
    state: {
        labels: [],
        totals: [],
        average: 0.0,
        dailyLabels: [],
        dailyData: [],
        dailyAverage: 0.0
    },
    getters: {
      getLabels: (state) => state.labels,
      getTotals: (state) => state.totals,
    },
    mutations: {
        SET_LABELS: (state, payload) => { state.labels = payload },
        SET_TOTALS: (state, payload) => { state.totals = payload },
        SET_AVERAGE: (state, payload) => { state.average = payload },
        SET_DAILY_LABELS: (state, payload) => { state.dailyLabels = payload },
        SET_DAILY_DATA: (state, payload) => { state.dailyData = payload },
        SET_DAILY_AVERAGE: (state, payload) => { state.dailyAverage = payload },
    },
    actions: {
        getEvents({ commit }) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `events/`)).then((snapshot) => {
                let labels = [];
                let totals = [];
                let average = 0.0;
                
                commit("SET_AVERAGE",average)
                commit("SET_LABELS", labels) 
                commit("SET_TOTALS", totals) 

                if (snapshot.exists()) {
                    for (const [key, value] of Object.entries(snapshot.val())) {
                        labels.push(key)
                        totals.push(value.total)
                    }
                    average = totals.reduce((a, b) => a + b, 0) / totals.length;
                    commit("SET_AVERAGE",average)
                    commit("SET_LABELS", labels) 
                    commit("SET_TOTALS", totals) 
                }
            }).catch((error) => { console.error(error); });
        },
        getDailyEvents({ commit }, { dateIndex }) {
            get(child(ref(getDatabase()), `events/${dateIndex}`))
                .then((snapshot) => {
                    let dailyLabels = [];
                    let dailyData = [];
                    let average = 0.0

                    commit("SET_DAILY_LABELS", dailyLabels)
                    commit("SET_DAILY_DATA", dailyData)
                    commit("SET_DAILY_AVERAGE", average)
 
                    if (snapshot.exists()) {
                       for (const [key, value] of Object.entries(snapshot.val())) {
                            if(value.hasOwnProperty("counts")) {
                                dailyData.push(value.counts)
                                dailyLabels.push(`${key}`)
                            }
                            average = dailyData.reduce((a, b) => a + b, 0) / dailyData.length;
                        }
                        commit("SET_DAILY_LABELS", dailyLabels)
                        commit("SET_DAILY_DATA", dailyData)
                        commit("SET_DAILY_AVERAGE", average)
                    }
                })
        }
    }
}
