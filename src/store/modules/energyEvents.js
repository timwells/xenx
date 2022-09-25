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
        dailyLabels: [],
        dailyData: [],
    },
    getters: {
      getLabels: (state) => state.labels,
      getTotals: (state) => state.totals,
    },
    mutations: {
        SET_LABELS: (state, payload) => { state.labels = payload },
        SET_TOTALS: (state, payload) => { state.totals = payload },
        SET_DAILY_LABELS: (state, payload) => { state.dailyLabels = payload },
        SET_DAILY_DATA: (state, payload) => { state.dailyData = payload },
    },
    actions: {
        getEvents({ commit }) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `events/`)).then((snapshot) => {
                let labels = [];
                let totals = [];
                if (snapshot.exists()) {
                    for (const [key, value] of Object.entries(snapshot.val())) {
                        labels.push(key)
                        totals.push(value.total)
                    }
                }
                commit("SET_LABELS", labels) 
                commit("SET_TOTALS", totals) 
            }).catch((error) => { console.error(error); });
        },
        getDailyEvents({ commit }, { dateIndex }) {
            get(child(ref(getDatabase()), `events/${dateIndex}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(`events/${dateIndex}`, snapshot.val())
                        let dailyLabels = [];
                        let dailyData = [];

                        commit("SET_DAILY_LABELS", [])
                        commit("SET_DAILY_DATA", [])

                        for (const [key, value] of Object.entries(snapshot.val())) {
                            if(value.hasOwnProperty("counts")) {
                                dailyData.push(value.counts)
                                dailyLabels.push(`${key}`)
                            }
                        }
                        commit("SET_DAILY_LABELS", dailyLabels)
                        commit("SET_DAILY_DATA", dailyData)
                    }
                })
        }
    }
}
