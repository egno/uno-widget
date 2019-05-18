<template>
  <v-layout column>
    <v-flex>
      <h2>Личные данные</h2>
    </v-flex>
    <v-flex>
      <v-card
        flat
        class="rounded"
      >
        <v-card-text>
          <v-layout column>
            <v-flex>
              <v-text-field
                v-model="name"
                label="Имя"
                :rules="[rules.required]"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="phone"
                label="Телефон"
                mask="phone"
                prefix="+7"
                :rules="[rules.required, rules.phone]"
              />
            </v-flex>
            <v-flex>
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[rules.email]"
              />
            </v-flex>
            <v-flex>
              <v-select
                v-model="reminder"
                :items="reminders"
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
          </v-layout>
        </v-card-text>
        <ButtonToolbar
          :disabled="loading"
          @click="saveVisit"
        >
          <v-layout column>
            <v-flex>
              Записаться
            </v-flex>
          </v-layout>
        </ButtonToolbar>
      </v-card>
    </v-flex>
    <v-flex v-if="loading">
      <template>
        <div class="text-xs-center">
          <v-progress-circular
            indeterminate
            color="primary"
          />
        </div>
      </template>
    </v-flex>
    <v-flex>
      <v-alert
        :value="!!error"
        dismissible
        type="error"
        transition="slide-y-transition"
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
import ButtonToolbar from "@/components/ButtonToolbar.vue"

export default {
  components: { ButtonToolbar },
  data () {
    return {
      error: "",
      loading: false,
      reminders: [
        { text: "За 1 час", value: 1 },
        { text: "За 3 часа", value: 3 },
        { text: "За 6 часов", value: 6 },
        { text: "За сутки", value: 24 },
        { text: "Не напоминать", value: null }
      ],
      rules: {
        required: value => !!value || "Обязательно для заполения",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return !value || pattern.test(value) || "Некорректный e-mail"
        },
        phone: value => {
          const pattern = /^[0-9]{10}$/
          return pattern.test(value) || "Некорректный телефон"
        }
      }
    }
  },
  computed: {
    ...mapGetters(["employeeId", "filialId", "services", "ts", "duration"]),
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
  mounted () {
    this.error = ""
  },
  methods: {
    ...mapActions(["setStep", "setApiResult"]),
    saveVisit () {
      this.error = ""
      this.loading = true
      const params = {
        business_id: this.employeeId || this.filialId,
        ts_begin: this.tsBegin,
        ts_end: this.tsEnd,
        j: {
          client: {
            name: this.name,
            phone: this.phone,
            email: this.email
          },
          notes: this.note,
          reminder: this.reminder,
          services: this.services.map(x => x.service)
        }
      }
      Api()
        .post("rpc/new_visit", params)
        .then(res => {
          this.setApiResult(res.data)
          this.setStep("success")
        })
        .catch(err => {
          if (
            err.response &&
            err.response.data &&
            err.response.data.code === "23P01"
          ) {
            this.setStep("fail")
          }
          this.error =
            err.response && err.response.data && err.response.data.message
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>
