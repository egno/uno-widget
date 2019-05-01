import Vue from 'vue'
import Vuex from 'vuex'
import Api from "@/api/backend"
import { numberText } from "@/utils"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        apiResult: undefined,
        businessType: '',
        date: '',
        time: '',
        filial: '',
        filials: [],
        services: [],
        employee: {},
        step: '',
        timeSelector: '',
        name: "",
        phone: "",
        email: "",
        reminder: "",
        note: "",
        progress: false,
    },
    getters: {
        apiResult: state => state.apiResult,
        businessType: state => state.businessType,
        date: state => state.date,
        time: state => state.time,
        ts: state => state.date && state.time && `${state.date}T${state.time}:00`,
        filial: state => state.filial,
        filialId: state => state.filial && state.filial.id,
        filials: state => state.filials,
        hasFilials: state => state.filials && state.filials.length > 1,
        progress: state => state.progress,
        services: state => state.services,
        servicesCount: state => state.services && state.services.length,
        servicesCountDisplay: state => {
            const forms = [
                "Выбрана % услуга",
                "Выбраны % услуги",
                "Выбрано % услуг",
                "Услуга не выбрана"
            ]
            return state.services && numberText(state.services.length || 0, forms)
        },
        timeSelector: state => state.timeSelector,
        employee: state => state.employee,
        employeeId: state => state.employee && state.employee.id,
        step: state => state.step,
        duration: state => state.services
            .map(x => +x.service.duration)
            .reduce((result, x) => result + x, 0),
        price: state => state.services
            .map(x => +x.service.price)
            .reduce((result, x) => result + x, 0),
        name: state => state.name,
        phone: state => state.phone,
        email: state => state.email,
        reminder: state => state.reminder,
        note: state => state.note,
    },
    mutations: {
        SET_API_RESULT (state, payload) {
            state.apiResult = payload
        },
        SET_BUSINESS_TYPE (state, payload) {
            state.businessType = payload
        },
        SET_DATE (state, payload) {
            if (payload) {
                state.date = payload.slice(0, 10)
            } else {
                state.date = ''
            }
        },
        SET_TIME (state, payload) {
            state.time = payload
        },
        SET_FILIAL (state, payload) {
            if (!payload) { state.filial = '' }
            state.filial = state.filials.find(x => x.id === payload)
        },
        SET_FILIALS (state, payload) {
            state.filials = payload
        },
        ADD_SERVICE (state, payload) {
            const idx = state.services.findIndex(x => x.service.id === payload.service.id)
            if (idx > -1) {
                state.services.splice(idx, 1, payload)
            } else {
                state.services.push(payload)
            }
        },
        CLEAR_SERVICE (state) {
            state.services = []
        },
        DEL_SERVICE (state, payload) {
            const idx = state.services.findIndex(x => x.service.id === payload.service.id)
            if (idx > -1) {
                state.services.splice(idx, 1)
            }
        },
        SET_PROGRESS (state, payload) {
            state.progress = payload
        },
        SET_STEP (state, payload) {
            state.step = payload
        },
        SET_TIME_SELECTOR (state, payload) {
            state.timeSelector = payload
        },
        SET_EMPLOYEE (state, payload) {
            state.employee = payload
        },
        SET_NAME (state, payload) {
            state.name = payload
        },
        SET_PHONE (state, payload) {
            state.phone = payload
        },
        SET_EMAIL (state, payload) {
            state.email = payload
        },
        SET_REMINDER (state, payload) {
            state.reminder = payload
        },
        SET_NOTE (state, payload) {
            state.note = payload
        }
    },
    actions: {
        clearVisit ({ commit }) {
            commit('SET_DATE', undefined)
            commit('SET_TIME', undefined)
            commit('CLEAR_SERVICE')
            commit('SET_EMPLOYEE', {})
        },
        loadFilials ({ commit, state }, payload) {
            if (!payload) {
                commit('SET_BUSINESS_TYPE', "fail")
                return
            }
            commit('SET_PROGRESS', true)
            if (state.businessType === "business") {
                Api()
                    .get(`business?id=eq.${payload}`)
                    .then(res => {
                        commit('SET_FILIALS', res.data)
                        if (!res.data.length) {
                            commit('SET_BUSINESS_TYPE', "fail")
                        }
                    })
                    .finally(() => {
                        commit('SET_PROGRESS', false)
                    })
            }
            if (!state.businessType) {
                Api()
                    .get(`business?parent=eq.${payload}`)
                    .then(res => {
                        commit('SET_BUSINESS_TYPE', res.data.length ? "company" : "business")
                        commit('SET_FILIALS', res.data)
                    })
                    .catch((err) => {
                        if (err.response.status == 400) {
                            commit('SET_BUSINESS_TYPE', "fail")
                        }
                    })
                    .finally(() => {
                        commit('SET_PROGRESS', false)
                    })
            }
        },
        setApiResult ({ commit }, payload) {
            commit('SET_API_RESULT', payload)
        },
        setDate ({ commit }, payload) {
            commit('SET_DATE', payload)
        },
        setTime ({ commit }, payload) {
            commit('SET_TIME', payload)
        },
        setTimeSelector ({ commit }, payload) {
            commit('SET_TIME_SELECTOR', payload)
        },
        setFilial ({ commit }, payload) {
            commit('SET_FILIAL', payload)
        },
        addService ({ commit }, payload) {
            commit('ADD_SERVICE', payload)
        },
        delService ({ commit }, payload) {
            commit('DEL_SERVICE', payload)
        },
        setStep ({ commit }, payload) {
            commit('SET_STEP', payload)
        },
        setEmployee ({ commit }, payload) {
            commit('SET_EMPLOYEE', payload)
        },
        setName ({ commit }, payload) {
            commit('SET_NAME', payload)
        },
        setPhone ({ commit }, payload) {
            commit('SET_PHONE', payload)
        }, setEmail ({ commit }, payload) {
            commit('SET_EMAIL', payload)
        }, setNote ({ commit }, payload) {
            commit('SET_NOTE', payload)
        }, setReminder ({ commit }, payload) {
            commit('SET_REMINDER', payload)
        },
    }
})
