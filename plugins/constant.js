import Vue from 'vue'
const baseUrl = 'http://192.168.63.128:2020'
const baseImageUrl = baseUrl + '/portal/image/'
Vue.prototype.$constant = {
  baseUrl,
  baseImageUrl,
  successCode: 20000
}
// const baseUrl = 'http://192.168.63.128:2020'
// const baseImageUrl = baseUrl + '/portal/image/'
// export default ({ app }, inject) => {
//   inject('constant', { baseUrl, baseImageUrl, successCode: 20000 })
// }
