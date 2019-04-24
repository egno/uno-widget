<template>
  <v-footer
    flat
    app
    height="auto"
  >
    <v-container grid-list-sm text-xs-center pa-1>
      <v-layout column>
        <v-flex v-if="showPhone">
          <v-layout
            row
            justify-center
          >
            <v-flex v-if="showIcons">
              <v-btn
                flat
                icon
                outline
                @click="showIcons=false"
              >
                <v-icon>phone</v-icon>
              </v-btn>
            </v-flex>
            <v-flex v-else>
              <v-list>
                <v-list-tile-content v-for="phone in phones" :key="phone">
                  {{ phone }}
                </v-list-tile-content>
              </v-list>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-divider />
        <v-flex pa-2>
          <v-layout
            justify-center
            row
          >
            Работает на UNO
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-footer>
</template>

<script>
import {mapGetters} from "vuex"
export default {
    data () {
        return {
            showIcons: true
        }
    },
    computed:{
        ...mapGetters(['step', 'filial']),
        showPhone () {
            const steps = [
                'main',
                'contact',
                'success',
                'fail'
            ]
            return steps.indexOf(this.step) > -1
        },
        phones () {
            return this.filial && this.filial.j && this.filial.j.phones
        }
    }
    
}
</script>
