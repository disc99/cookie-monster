const vm = new Vue({
  el: '#app',
  data: {
    cookieSettings: []
  },
  methods: {
    addCookie: function (cidx) {
      this.cookieSettings[cidx].patterns.push({tag:"", value:""})
    },
    removeCookie: function (cidx, pidx) {
      this.cookieSettings[cidx].patterns.splice(pidx, 1)
    },
    addPattern: function(cidx) {
      this.cookieSettings.push({name:"", domain:"", patterns:[]})
    },
    removePattern: function(cidx) {
      this.cookieSettings.splice(cidx, 1)
    }
  }
})

chrome.storage.local.get("cookieSettings", data => {
  vm.cookieSettings = data.cookieSettings || [];
});

vm.$watch('cookieSettings', cookieSettings => {
  const filtered = cookieSettings
    .filter(c => c.name && c.domain)
    .map(c => ({
      name:c.name,
      domain:c.domain,
      patterns: c.patterns.filter(p => p.tag)
    }));

  chrome.storage.local.set({"cookieSettings": filtered});
}, {deep: true});

