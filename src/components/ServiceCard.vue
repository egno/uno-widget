<template>
  <v-card
    flat
    class="rounded"
    :img="serviceImage"
  >
    <v-card-text>
      <v-layout column>
        <v-flex>
          <span class="body-2 text-truncate">{{ serviceName }}</span>
        </v-flex>
        <v-flex>
          <v-layout row>
            <v-flex xs3>
              <span class="caption">
                <DurationDisplay :value="+duration" />
              </span>
            </v-flex>
            <v-flex xs4>
              <span class="caption">
                <PriceDisplay
                  :value="+price"
                  prefix="от"
                />
              </span>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex>
          {{ employeeDisplay }}
        </v-flex>
      </v-layout>
    </v-card-text>

    <ButtonToolbar
      :color="(selected) ? 'green': 'primary'"
      :icon="(selected) ? 'check': 'add'"
      @click="onToolButtonClick"
    >
      <v-layout column>
        {{ selected? 'Выбрано' : 'Выбрать' }}
      </v-layout>
    </ButtonToolbar>
  </v-card>
</template>

<script>
import {
  employeeDisplay,
} from "@/utils"
import ButtonToolbar from "@/components/ButtonToolbar.vue"
import DurationDisplay from "@/components/DurationDisplay.vue"
import PriceDisplay from "@/components/PriceDisplay.vue"
import { mapGetters, mapActions } from "vuex"

export default {
  components: {
    ButtonToolbar,
    DurationDisplay,
    PriceDisplay
  },
  props: {
    group: {
      type: Object,
      default () {
        return {}
      }
    },
    service: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      firstFreeTimestamp: undefined
    }
  },
  computed: {
    ...mapGetters(["filialId", "services"]),
    duration () {
      return this.service.service.duration
    },
    employeeCount () {
      return this.service.service.employees.length
    },
    employeeDisplay () {
      return employeeDisplay(this.employeeCount)
    },
    serviceImage () {
      return (
        this.group &&
        this.group.j &&
        this.group.j.image &&
        `${process.env.VUE_APP_IMAGES}service_group/${this.group.j.image}`
      )
    },
    price () {
      return this.service.service.price
    },
    selected () {
      return (
        this.service &&
        this.service.service &&
        this.services &&
        this.services.some(x => x.service.id === this.service.service.id)
      )
    },
    serviceName () {
      return this.service.service.name
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    ...mapActions(["addService", "delService", "setDate", "setStep"]),
    onToolButtonClick () {
      if (this.selected) {
        this.delService(this.service)
      } else {
        this.addService(this.service)
      }
    },
    onSelectTime () {
      this.setDate(this.firstFreeTimestamp)
      this.addService(this.service)
      this.setStep("main")
    }
  }
}
</script>

<style scoped>
.caption {
  color: grey;
}
.small-text {
  font-size: 0.55em;
}
.compact {
  line-height: 1em;
}
</style>
