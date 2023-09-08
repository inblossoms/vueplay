<template>
  <div>
    <h1>{{ count }}</h1>
    <button @click="increase">add</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  name: "HelloWorld",

  computed: {
    ...mapState(["count"]),
  },
  methods: {
    // ...mapMutations(["increase"]),
    increase() {
      // this.$store.commit("event", {})
      this.$store.commit("increase");
      this.log();
    },
    log() {
		const info = "A async task."
      //   this.$store.dispatch();
      this.$store.dispatch("getListMesg", info);
      console.log(this.$store.getters.showInfo);
    },
  },
};
</script>
