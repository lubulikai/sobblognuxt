export default ({ $axios }, inject) => {
  const requestGet = (url) => {
    return new Promise((resolve, reject) => {
      $axios
        .get(url)
        .then((res) => {
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const request = {
    getUserInfo: (id) => {
      return requestGet('/user/user_info/' + id)
    },
    getCategories: () => {
      return requestGet('/portal/article/categories')
    },
    getLoopImages: () => {
      return requestGet('/portal/web_size_info/loop')
    },
    getTopArticles: () => {
      return requestGet('/portal/article/top')
    },
    getListArticles: (categoryId = '', page, size) => {
      if (categoryId !== '') {
        return requestGet('/portal/article/list/' + categoryId + '/' + page + '/' + size)
      } else {
        return requestGet('/portal/article/list/' + page + '/' + size)
      }
    },
    getListLabels: (size) => {
      return requestGet('/portal/article/label/' + size)
    },
    getFriendLink: () => {
      return requestGet('/portal/web_size_info/friend_link')
    }
  }

  inject('request', request)
}
