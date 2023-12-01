import { defineComponent, createVNode } from "vue";

let Vue;

export default class VueRouter {
  constructor(options) {
    this.$options = options.routes;
    this.routesMap = {};
    // this.vm = new Vue({
    //   data() {
    //     return {
    //       currentPath: "/",
    //     };
    //   },
    // });
  }

  init() {
    this.bindEvent();
    this.createRouteMap();
  }

  bindEvent() {
    window.addEventListener(
      "DOMContentLoaded",
      this.handelHashChange.bind(this)
    );
    window.addEventListener("hashchange", this.handelHashChange.bind(this));
  }

  handelHashChange() {
    console.log("hash: ", window.location.hash);
  }

  createRouteMap() {
    this.$options.forEach((item) => {
      this.routesMap[item.path] = item;
    });
  }

  createRouteCompoment() {
    defineComponent((props) => {}, {});
  }

  install(instance) {
    instance.mixin({
      beforeCreate() {
        console.log(this.$options);

        if (this.$options.router) {
          this.$options.router.init();
        }
      },
    });
    console.log("install vue router.");
  }
}
