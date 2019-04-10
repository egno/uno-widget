<template>
  <div>
    <TopBar :filial="filial" :filials="availableFilials" :step="step" :logo="logo" />
    <div v-if="!step">
      <FilialPage :filial="filial" :filials="availableFilials" />
    </div>
  </div>
</template>

<script>
import Api from "@/api/backend"
import TopBar from '@/components/TopBar.vue'
import FilialPage from '@/components/FilialPage.vue'

export default {
  components:{FilialPage, TopBar},
  data () {
    return {
      businessType: "",
      filials: undefined,
      filial: undefined,
      employee: undefined,
      service: undefined,
      date: undefined,
      step: 0
    }
  },
  computed: {
    availableFilials () {
      if (!this.filials) return
      return this.filials.filter(x => x.j && x.j.address && x.j.address.point)
    },
    companyId () {
      let uri = window.location.search.substring(1)
      let params = new URLSearchParams(uri)
      return params.get("b")
    },
    logo () {
      return this.companyId && `${process.env.VUE_APP_IMAGES}${this.companyId}.png`
    }
  },
  watch: {
    companyId: "init",
    businessType: "loadCompany",
    filials: "selectFilial"
  },
  mounted () {
    this.init()
  },
  methods: {
    loadCompany () {
      if (!this.companyId) {
        return
      }
      if (this.businessType === "business") {
        Api()
          .get(`business?id=eq.${this.companyId}`)
          .then(res => {
            this.filials = res.data
          })
      }
      if (!this.businessType) {
        Api()
          .get(`business?parent=eq.${this.companyId}`)
          .then(res => {
            this.businessType = res.data.length ? "company" : "business"
            this.filials = res.data
          })
      }
    },
    init () {
      this.loadCompany()
    },
    selectFilial () {
      if (this.filials && this.availableFilials.length === 1) {
        this.filial = this.filials[0]['id']
      }
    }
  }
}
</script>
