import Vue from 'vue'
import Vuex from 'vuex'
import Api from "@/api/backend"
import { numberText } from "@/utils"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        businessType: '',
        date: '',
        time: '',
        filial: '',
        filials: [],
        services: [],
        employee: {},
        step: ''
    },
    getters: {
        businessType: state => state.businessType,
        date: state => state.date,
        time: state => state.time,
        ts: state => state.date && state.time && `${state.date}T${state.time}:00`,
        filial: state => state.filial,
        filialId: state => state.filial && state.filial.id,
        filials: state => state.filials,
        hasFilials: state => state.filials && state.filials.length > 1,
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
        employee: state => state.employee,
        employeeId: state => state.employee && state.employee.id,
        step: state => state.step,
        duration: state => state.services
            .map(x => +x.service.duration)
            .reduce((result, x) => result + x, 0),
        price: state => state.services
            .map(x => +x.service.price)
            .reduce((result, x) => result + x, 0)
    },
    mutations: {
        SET_BUSINESS_TYPE (state, payload) {
            state.businessType = payload
        },
        SET_DATE (state, payload) {
            state.date = payload
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
        DEL_SERVICE (state, payload) {
            const idx = state.services.findIndex(x => x.service.id === payload.service.id)
            if (idx > -1) {
                state.services.splice(idx, 1)
            }
        },
        SET_STEP (state, payload) {
            state.step = payload
        },
        SET_EMPLOYEE (state, payload) {
            state.employee = payload
        }
    },
    actions: {
        loadFilials ({ commit, state }, payload) {
            if (!payload) {
                return
            }
            if (state.businessType === "business") {
                Api()
                    .get(`business?id=eq.${payload}`)
                    .then(res => {
                        commit('SET_FILIALS', res.data)
                    })
            }
            if (!state.businessType) {
                Api()
                    .get(`business?parent=eq.${payload}`)
                    .then(res => {
                        commit('SET_BUSINESS_TYPE', res.data.length ? "company" : "business")
                        commit('SET_FILIALS', res.data)
                    })
            }
        },
        setDate ({ commit }, payload) {
            commit('SET_DATE', payload)
        },
        setTime ({ commit }, payload) {
            commit('SET_TIME', payload)
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
        }
    }
})
