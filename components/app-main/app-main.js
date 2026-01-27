/* global ClipboardUtils */

let appMain = {
  data: appMainData,
  mounted: appMainMounted,
  computed: {
    ...appMainComputed,
  },
  watch: {
    ...appMainWatch,
  },
  methods: {
    ...appMainMethods,
    ...appMainMethodsLoading,
    ...appMainMethodsDnD,
    ...appMainMethodsFilter,
    ...appMainMethodsDraw,
  }
}

module.exports = appMain
