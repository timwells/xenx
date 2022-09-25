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
    },
    getters: {
      getLabels: (state) => state.labels,
      getTotals: (state) => state.totals,
    },
    mutations: {
        SET_LABELS: (state, payload) => { state.labels = payload },
        SET_TOTALS: (state, payload) => { state.totals = payload }
    },
    actions: {
        getEvents({ commit }) {
            const dbRef = ref(getDatabase());
            get(child(dbRef, `events/`)).then((snapshot) => {
                let labels = [];
                let totals = []
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
    }
}
