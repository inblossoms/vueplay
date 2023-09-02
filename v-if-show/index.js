class V {
  constructor({ el, data, methods }) {
    this.el = document.querySelector(el);
    this.data = data;
    this.methods = methods;

    this.dataPool = new Map();
    this.eventPool = new Map();

    this.init(this);
  }

  init(vm) {
    this.initData(vm);
    this.initDom(this.el);
    this.initView(this.dataPool);
    this.bindEvent(this.eventPool);
    // console.log(this.dataPool, this.eventPool);
  }

  initData(vm) {
    for (const key in this.data) {
      vm.__defineGetter__(key, function () {
        console.log("Geter:", key, "->", this.data[key]);
        return this.data[key];
      });
      vm.__defineSetter__(key, function (nv) {
        console.log("Setter:", key, "->", nv);
        this.data[key] = nv;
        this.updateView(key, this.dataPool);
      });
    }
  }

  initDom(el) {
    const _childNodes = el.childNodes;
    if (!_childNodes.length) return;

    _childNodes.forEach((childNode) => {
      if (childNode.nodeType === 1) {
        const vIf = childNode.getAttribute("v-if");
        const vShow = childNode.getAttribute("v-show");
        const vEvent = childNode.getAttribute("@click");

        if (vIf) {
          this.dataPool.set(childNode, {
            type: "if",
            isShow: this.data[vIf],
            data: vIf,
          });
        } else if (vShow) {
          this.dataPool.set(childNode, {
            type: "show",
            isShow: this.data[vShow],
            data: vShow,
          });
        }

        if (vEvent) {
          this.eventPool.set(childNode, this.methods[vEvent]);
        }
      }

      this.initDom(childNode);
    });
  }

  initView(pool) {
    for (let [k, v] of pool) {
      switch (v.type) {
        case "if":
          v.comment = document.createComment("v-if");
          !v.isShow && k.parentNode.replaceChild(v.comment, k);
          break;
        case "show":
          !v.isShow && (k.style.display = "none");
          break;
        default:
          break;
      }
    }
  }

  updateView(key, pool) {
    for (let [k, v] of pool) {
      if (v.data === key) {
        if (v.type === "if") {
          v.isShow
            ? k.parentNode.replaceChild(v.comment, k)
            : v.comment.parentNode.replaceChild(k, v.comment);
          v.isShow = !v.isShow;
        } else if (v.type === "show") {
          v.isShow ? (k.style.display = "block") : (k.style.display = "none");
          v.isShow = !v.isShow;
        }
      }
    }
  }

  bindEvent(pool) {
    for (let [k, v] of pool) {
      k.addEventListener("click", v.bind(this), false);
    }
  }
}
