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
          @click="saveVisit()"
        >
          <v-icon>arrow_forward</v-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data () {
    return {
      name: "",
      phone: "",
      email: "",
      reminder: "",
      note: ""
    }
  },
  methods: {
      saveVisit () {
          console.log('save')
      }
  }
}
</script>
