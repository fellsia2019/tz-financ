<template>
  <section class="wrapper">
    <svgInline />
    <div class="container">
      <div class="flex-rov">
        <div class="flex-col-50">
          <div class="currencies block-ex">
            <div class="currencies__header">
              <span
                class="currencies__header-fc title-sm color-secondary text-light"
              >
                {{ currentCurrencies }}
              </span>
            </div>
            <div class="currencies__body">
              <p class="currencies__body-main title-sm">
                <span>1</span>
                <span>{{ mainSelectValue }}</span>
              </p>
              <span class="separator">
                <svg class="separator__double-arrow">
                  <use xlink:href="#icon-doublearrow"></use>
                </svg>
              </span>
              <p class="currencies__body-received title-sm">
                <span>{{ priceFromMainValue }}</span>
                <span>{{ secondSelectValue }}</span>
              </p>
            </div>
            <div
              class="currencies__changed title-xs"
              :class="{ 'color-success': trendUp, 'color-danger': !trendUp }"
            >
              <svg
                class="currencies__changed-arr"
                :class="{
                  'currencies__changed-arr--up': trendUp,
                  'currencies__changed-arr--down': !trendUp
                }"
              >
                <use xlink:href="#icon-arrowup"></use>
              </svg>
              <span>{{ trendValue }}</span>
            </div>
          </div>
        </div>
        <div class="flex-col-50">
          <div class="converter">
            <div class="converter__item block-ex">
              <span class="converter__item-currencies">
                {{ currentCurrencies }}
              </span>
              <div class="converter__item-body">
                <select
                  class="converter__item-select select-currencies"
                  v-model="mainSelectValue"
                >
                  <option
                    v-for="currencies in allFinanc"
                    :key="currencies.ID"
                    :value="currencies.CharCode"
                    >{{ currencies.CharCode }}</option
                  >
                </select>
                <input
                  type="text"
                  class="input converter__item-input"
                  name="inp-currencies"
                  v-model="mainInputValue"
                />
              </div>
            </div>
            <button
              class="btn btn-switch converter__switch"
              type="button"
              @click="switchCurrencies"
            >
              <svg class="icon-switch btn-switch__icon">
                <use xlink:href="#icon-switch"></use>
              </svg>
            </button>
            <div class="converter__item block-ex">
              <span class="converter__item-currencies">
                {{ secondCurrentCurrencies }}
              </span>
              <div class="converter__item-body">
                <select
                  class="converter__item-select select-currencies"
                  v-model="secondSelectValue"
                >
                  <option
                    v-for="currencies in allFinanc"
                    :key="currencies.ID"
                    :value="currencies.CharCode"
                    >{{ currencies.CharCode }}</option
                  >
                </select>
                <input
                  type="text"
                  class="input converter__item-input"
                  name="inp-currencies"
                  v-model="secondInputValue"
                  readonly
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import svgInline from '@/components/Svg-inline.vue'
import { mapActions, mapMutations, mapGetters } from 'vuex'
export default {
  data() {
    return {
      mainSelectValue: 'AUD',
      secondSelectValue: 'BYN',
      mainInputValue: '1',
      secondCurrentValue: '',
      mainCurrentValue: '',
      mainNominal: '',
      secondNominal: '',
      mainPreviousValue: '',
      secondPreviousValue: '',
      trendUp: null
    }
  },
  components: {
    svgInline
  },
  computed: {
    ...mapGetters(['allFinanc']),
    currentCurrencies() {
      let objFinanc = this.$store.state.financ.financ
      if (objFinanc) {
        for (let key in objFinanc) {
          if (objFinanc[key].CharCode == this.mainSelectValue) {
            this.mainCurrentValue = objFinanc[key].Value
            this.mainNominal = objFinanc[key].Nominal
            this.mainPreviousValue = objFinanc[key].Previous
            // console.log(this.mainCurrentValue)
            return objFinanc[key].Name
          }
        }
      }
      return 'Австралийский доллар'
    },
    secondCurrentCurrencies() {
      let objFinanc = this.$store.state.financ.financ
      if (objFinanc) {
        for (let key in objFinanc) {
          if (objFinanc[key].CharCode == this.secondSelectValue) {
            this.secondCurrentValue = objFinanc[key].Value
            this.secondNominal = objFinanc[key].Nominal
            this.secondPreviousValue = objFinanc[key].Previous
            // console.log(this.secondCurrentValue)
            return objFinanc[key].Name
          }
        }
      }
      return 'Белорусский рубль'
    },
    secondInputValue() {
      // console.log(`
      // ${this.mainInputValue} ${this.mainCurrentValue} ${this.secondCurrentValue}
      // `)
      return (
        (this.mainInputValue * this.mainCurrentValue) /
        this.secondCurrentValue /
        (this.mainNominal / this.secondNominal)
      ).toFixed(2)
    },
    priceFromMainValue() {
      return (
        this.mainCurrentValue /
        this.secondCurrentValue /
        (this.mainNominal / this.secondNominal)
      ).toFixed(4)
    },
    trendValue() {
      let trend = (
        this.mainCurrentValue /
          this.secondCurrentValue /
          (this.mainNominal / this.secondNominal) -
        this.mainPreviousValue /
          this.secondPreviousValue /
          (this.mainNominal / this.secondNominal)
      ).toFixed(4)
      if (trend > 0) {
        this.trendUp = true
      } else {
        this.trendUp = false
      }
      return trend
    }
  },
  methods: {
    ...mapActions(['axiosFinanc']),
    switchCurrencies() {
      let newMainValue = this.secondSelectValue
      let newSecondValue = this.mainSelectValue
      this.mainSelectValue = newMainValue
      this.secondSelectValue = newSecondValue
    }
  },
  async mounted() {
    this.axiosFinanc()
  }
}
</script>
