const vm = new Vue({
  el: '#app',
  data: {
    cookies: [
    ]
  },
  methods: {
    // addCookie: function () {
    //   var name = this.newCookie.trim()
    //   if (name) {
    //     this.cookies.push({ name: name })
    //     this.newCookie = ''
    //   }
    // },
    // removeCookie: function (index) {
    //   this.cookies.splice(index, 1)
    // }
  }
})


chrome.cookies.getAllCookieStores(function(a){
console.log(a);
console.log(vm);
})
