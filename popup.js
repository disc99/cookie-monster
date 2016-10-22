const vm = new Vue({
  el: '#app',
  data: {
    cookies: []
  },
  methods: {
    clickTag(cidx, pidx) {
      this.cookies[cidx].value = this.cookies[cidx].patterns[pidx].value;
    }
  }
});

chrome.storage.local.get("cookieSettings", obj => {
  chrome.tabs.getSelected(null, tab => {
    chrome.cookies.getAll({ url: tab.url }, cookies => {
      vm.cookies = obj.cookieSettings
        .map(cs => ({
          cs: cs,
          c: cookies.find(c => c.name == cs.name && c.domain == cs.domain)
        }))
        .filter(o => o.c)
        .map(o => ({
          name: o.cs.name,
          value: o.c.value,
          domain: o.cs.domain,
          path: o.c.path,
          patterns: o.cs.patterns.map(p => ({
            tag: p.tag,
            value: p.value,
            isActive: p.value == o.c.value
          }))
        }));
    });
  });
});

vm.$watch('cookies', cookies => {

  const newCookies = cookies.map(c => ({
    name: c.name,
    value: c.value,
    domain: c.domain,
    path: c.path,
    patterns: c.patterns.map(p => ({
      tag: p.tag,
      value: p.value,
      isActive: p.value == c.value
    }))
  }));

  if (JSON.stringify(cookies) !== JSON.stringify(newCookies)) {
    vm.cookies = newCookies;
  }

  chrome.tabs.getSelected(null, tab => {
    cookies.forEach(c => {
      chrome.cookies.set({
        url: tab.url,
        domain: c.domain,
        path: c.path,
        name: c.name,
        value: c.value
      });
    });
  });

}, { deep: true });

document.querySelector('#options').addEventListener("click", function() {
    chrome.runtime.openOptionsPage();
});
