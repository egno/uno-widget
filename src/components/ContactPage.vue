<template>
  <v-layout column>
    <v-flex>
      Личные данные
    </v-flex>
    <v-flex>
      <v-text-field
        v-model="name"
        label="Имя"
      />
    </v-flex>
    <v-flex>
      <v-text-field
        v-model="phone"
        label="Телефон"
      />
    </v-flex>
    <v-flex>
      <v-text-field
        v-model="email"
        label="Email"
      />
    </v-flex>
    <v-flex>
      <v-text-field
        v-model="reminder"
        label="Напомнить"
      />
    </v-flex>
    <v-flex>
      <v-text-field
        v-model="note"
        label="Комментарий"
      />
    </v-flex>
    <v-flex>
      <span>
        Нажимая кнопку "Записаться" вы соглашаетесь с условиями пользовательского соглашения
      </span>
    </v-flex>
    <v-flex>
      <v-card>
        <v-toolbar>
          <v-layout column>
            <v-flex>
              Записаться
            </v-flex>
          </v-layout>
          <v-btn
            flat
            icon
            :disabled="loading"
            @click="saveVisit()"
          >
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-toolbar>
      </v-card>
    </v-flex>
    <v-flex v-if="error">
      <v-alert
        :value="true"
        type="error"
      >
        {{ error }}
      </v-alert>
    </v-flex>
  </v-layout>
</template>

<script>
import Api from "@/api/backend"
import { dateISOInLocalTimeZone } from "@/utils"
import { mapActions, mapGetters } from "vuex"

export default {
  data () {
    return {
      error: "",
      loading: false
    }
  },
  computed: {
    ...mapGetters(["employeeId", "services", "ts", "duration"]),
    tsBegin () {
      return this.ts
    },
    tsEnd () {
      const d1 = new Date(this.ts)
      let d2 = d1.getTime() + this.duration * 60000
      return dateISOInLocalTimeZone(d2)
    },
    name: {
      get () {
        return this.$store.state.name
      },
      set (value) {
        this.$store.commit("SET_NAME", value)
      }
    },
    phone: {
      get () {
        return this.$store.state.phone
      },
      set (value) {
        this.$store.commit("SET_PHONE", value)
      }
    },
    email: {
      get () {
        return this.$store.state.email
      },
      set (value) {
        this.$store.commit("SET_EMAIL", value)
      }
    },
    reminder: {
      get () {
        return this.$store.state.reminder
      },
      set (value) {
        this.$store.commit("SET_REMINDER", value)
      }
    },
    note: {
      get () {
        return this.$store.state.note
      },
      set (value) {
        this.$store.commit("SET_NOTE", value)
      }
    }
  },
  methods: {
    ...mapActions(["setStep"]),
    saveVisit () {
      this.error = ""
      this.loading = true
      const params = {
        business_id: this.employeeId,
        ts_begin: this.tsBegin,
        ts_end: this.tsEnd,
        client: {
          name: this.name,
          phone: this.phone,
          email: this.email,
          note: this.note,
          reminder: this.reminder,
          services: this.services.map(x => x.service)
        }
      }
      console.log("save")
      Api()
        .post("rpc/new_visit", params)
        .then(() => {
          this.setStep("success")
        })
        .catch(err => {
          this.error =
            err.response && err.response.data && err.response.data.message
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>
