<template>
  <div>
    <div class="div-top-search">
      <el-input
        v-model="currentKeyword"
        placeholder="请输入搜索内容"
        prefix-icon="el-icon-search"
        class="search-input"
        @keyup.enter.native="doSearch"
      />
      <el-button type="primary" @click="doSearch">搜索</el-button>
    </div>
    <div class="div-sort-info">
      <el-button
        :type="currentSort === 1 || currentSort === 2 ? 'primary' : ''"
        @click="doSearchBySort('createTime', currentSort === 1 || currentSort === 2)"
      >
        按发布时间<i :class="getClassNameForSortByCreateName(currentSort)"></i>
      </el-button>
      <el-button
        :type="currentSort === 3 || currentSort === 4 ? 'primary' : ''"
        @click="doSearchBySort('viewCount', currentSort === 3 || currentSort === 4)"
      >
        按浏览量<i :class="getClassNameForSortByViewCount(currentSort)"></i>
      </el-button>
    </div>
    <div class="div-category-info">
      <el-button :type="currentCategoryId === '' ? 'primary' : ''" @click="clickCategory('')">
        全部分类
      </el-button>
      <el-button
        v-for="item in listCategories"
        :key="item.id"
        :type="currentCategoryId === item.id ? 'primary' : ''"
        class="btn-category"
        @click="clickCategory(item.id)"
      >
        {{ item.name }}
      </el-button>
    </div>
    <div v-if="totalCount > 0" class="div-search-info">
      <div class="div-search-info-item" v-for="item in listArticleInfo" :key="item.id">
        <!-- <el-link
          class="el-link-article-title"
          :href="item.blogUrl"
          target="_blank"
          v-html="item.blogTitle"
        /> -->
        <div class="div-article-title" v-html="item.blogTitle" />
        <div class="div-article-content" v-html="item.blogContent" />
        <div class="div-other-info">
          <div class="div-createTime"><i class="el-icon-date"></i>{{ item.blogCreateTime }}</div>
          <div><i class="el-icon-view"></i>{{ item.blogViewCount }}</div>
        </div>
      </div>
      <el-pagination
        class="article-page"
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="currentSize"
        :total="totalCount"
        @current-change="changeCurrentPage"
      />
    </div>
    <div v-else class="div-search-nothing">
      没有查询到相关数据
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ query, app }) {
    let currentPage = 1
    let currentSize = 2
    let currentKeyword = ''
    let currentCategoryId = ''
    let totalCount = 0
    let totalPage = 0
    let isFirst = false
    let isLast = false
    let listArticleInfo = null
    let currentSort = 1
    if (query !== {}) {
      const { keyword, page, size, categoryId, sort } = query
      currentPage = page ? parseInt(page) : 1
      currentSize = size ? parseInt(size) : 2
      currentKeyword = keyword
      currentCategoryId = categoryId || ''
      currentSort = sort ? parseInt(sort) : 1
      const resSearchInfo = await app.$request.getSearchInfo(
        currentCategoryId,
        currentKeyword,
        currentPage,
        currentSize,
        currentSort
      )

      listArticleInfo = resSearchInfo.data.contents
      totalCount = resSearchInfo.data.totalCount
      totalPage = resSearchInfo.data.totalPage
      isFirst = resSearchInfo.data.first
      isLast = resSearchInfo.data.last
    }

    const resCategory = await app.$request.getCategories()

    return {
      currentPage,
      currentSize,
      currentKeyword,
      currentCategoryId,
      totalCount,
      totalPage,
      isFirst,
      isLast,
      listArticleInfo,
      currentSort,
      listCategories: resCategory.data
    }
  },
  methods: {
    doSearchBySort(type, isSelected) {
      if (type === 'createTime') {
        if (isSelected) {
          this.currentSort === 1 ? (this.currentSort = 2) : (this.currentSort = 1)
        } else {
          this.currentSort = 2
        }
      } else if (type === 'viewCount') {
        if (isSelected) {
          this.currentSort === 3 ? (this.currentSort = 4) : (this.currentSort = 3)
        } else {
          this.currentSort = 4
        }
      }
      this.doSearch()
    },
    getClassNameForSortByCreateName(sort) {
      if (sort === 1) {
        return 'el-icon-caret-top'
      } else if (sort === 2) {
        return 'el-icon-caret-bottom'
      } else {
        return 'el-icon-caret-bottom'
      }
    },
    getClassNameForSortByViewCount(sort) {
      if (sort === 3) {
        return 'el-icon-caret-top'
      } else if (sort === 4) {
        return 'el-icon-caret-bottom'
      } else {
        return 'el-icon-caret-bottom'
      }
    },
    changeCurrentPage(page) {
      this.currentPage = page
      location.href = `/search?keyword=${this.currentKeyword}&page=${this.currentPage}&size=${this.currentSize}&categoryId=${this.currentCategoryId}&sort=${this.currentSort}`
    },
    doSearch() {
      this.currentPage = 1
      location.href = `/search?keyword=${this.currentKeyword}&page=${this.currentPage}&size=${this.currentSize}&categoryId=${this.currentCategoryId}&sort=${this.currentSort}`
    },
    clickCategory(categoryId) {
      this.currentCategoryId = categoryId
      this.doSearch()
    }
  }
}
</script>
<style>
.div-top-search {
  margin-top: 20px;
  width: 100%;
  background-color: white;
  padding-top: 30px;
  padding-bottom: 30px;
  text-align: center;
}
.search-input {
  width: 500px;
}
.div-search-info {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  background-color: white;
  margin-top: 20px;
  margin-bottom: 20px;
}
.div-article-title {
  font-size: 20px;
  color: #409eff;
}
.div-search-info-item {
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f3f3f3;
}
.div-article-content {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.div-other-info {
  display: flex;
}
.div-createTime {
  margin-right: 20px;
}
.article-page {
  margin-top: 20px;
  text-align: center;
}
.div-search-nothing {
  background-color: white;
  text-align: center;
  padding: 20px;
  margin-top: 20px;
}
.div-category-info {
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 10px;
  background-color: white;
}
.div-sort-info {
  border-top: 1px solid #f3f3f3;
  background-color: white;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 10px;
  padding-top: 20px;
}
</style>
