<template>
  <v-layout column>
    <template v-if="progress">
      <div class="text-xs-center">
        <v-progress-circular
          indeterminate
          color="primary"
        />
      </div>
    </template>
    <template v-else>
      <v-flex>
        <h2 class="content-heading">
          Выберите филиал
        </h2>
      </v-flex>
      <v-flex>
        <v-switch
          v-model="filialSelectorView"
          label="На карте"
        />
      </v-flex>
      <v-flex v-if="filialSelectorView">
        <yandex-map
          :bounds="mapBounds"
          :max-zoom="10"
          :controls="['geolocationControl','zoomControl']"
          style="width: 370px; height: 370px;"
        >
          <template v-for="f in filials">
            <template v-if="f.j && f.j.address && f.j.address.point">
              <yandex-map-marker
                :key="f.id"
                :marker-id="f.id"
                marker-type="placemark"
                :coords="f.j.address.point.split(' ').reverse()"
                :hint-content="f.j.name"
                :icon="{color: `${(f===focusedFilial)?'blue':'grey'}`}"
                cluster-name="1"
                :callbacks="{ click: openHandler}"
              />
            </template>
          </template>
        </yandex-map>
      </v-flex>
      <v-flex v-if="filialSelectorView && focusedFilial">
        <FilialCard
          :filial="focusedFilial"
          @onSelectFilial="onSelectFilial($event)"
        />
      </v-flex>
      <v-flex v-if="!filialSelectorView">
        <v-layout column>
          <v-flex
            v-for="f in filials"
            :key="f.id"
          >
            <FilialCard
              :filial="f"
              @onSelectFilial="onSelectFilial($event)"
            />
          </v-flex>
        </v-layout>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import FilialCard from "@/components/FilialCard.vue"
import YandexMap from "@/components/yandex/YMap"
import YandexMapMarker from "@/components/yandex/Marker"

export default {
  components: { FilialCard, YandexMap, YandexMapMarker },
  data () {
    return {
      filialSelectorView: false,
      focusedFilial: undefined
    }
  },
  computed: {
    ...mapGetters(["filial", "filials", "progress"]),
    points () {
      return this.filials
        .map(
          x =>
            x.j &&
            x.j.address &&
            x.j.address.point &&
            x.j.address.point.split(" ").reverse()
        )
        .filter(x => !!x)
    },
    mapBounds () {
      const dBound = 0.004
      const lat = this.points.map(x => +x[0]).sort()
      const lon = this.points.map(x => +x[1]).sort()
      const dLat = (lat[lat.length - 1] - lat[0]) / 4 + dBound
      const dLon = (lon[lon.length - 1] - lon[0]) / 4 + dBound
      return [
        [lat[0] - dLat, lon[0] - dLon],
        [lat[lat.length - 1] + dLat, lon[lon.length - 1] + dLon]
      ]
    }
  },
  methods: {
    ...mapActions(["setFilial", "setStep"]),
    onSelectFilial (payload) {
      this.setFilial(payload)
      this.setStep("main")
    },
    openHandler (event) {
      const id = event.originalEvent.target.properties.get("markerId")
      this.focusedFilial = id && this.filials.find(x => x.id === id)
    }
  }
}
</script>

<style scoped>
  .content-heading {
    font: 400 24px 'Roboto Slab', serif;
    color: #07101C;
  }
</style>
