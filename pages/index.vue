<template>
  <div id="div-home-box" class="div-home-box">
    <div id="div-home-left" class="div-home-left">
      <img class="img-avatar" :src="adminInfo.avatar" />
      <div class="div-user-name">{{ adminInfo.userName }}</div>
      <div class="div-sign">{{ adminInfo.sign }}</div>
      <div class="div-show-category">
        <div
          v-for="item in listCategory"
          :key="item.id"
          class="div-category"
          :class="{ 'div-category-selected': item.id == currentCategoryId }"
          @click="listArticleByCategoryId(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div id="div-home-middle" class="div-home-middle">
      <el-carousel height="200px">
        <el-carousel-item v-for="item in listloopImages" :key="item.id">
          <el-image style="height:200px" :src="item.imageUrl" fit="cover"></el-image>
        </el-carousel-item>
      </el-carousel>
      <div class="div-show-top-article">
        <div v-for="item in listTopArticles" :key="item.id" class="div-article">
          <el-image
            v-if="item.cover"
            style="width:100px;height:100px"
            :src="$constant.baseImageUrl + item.cover"
            fit="cover"
          />
          <div class="div-article-text">
            <div>
              <el-tag type="danger" effect="dark"> 置顶 </el-tag>
              <el-link class="article-title">{{ item.title }}</el-link>
            </div>
            <div>
              <span>{{ item.summary }}</span>
            </div>
            <div>
              <el-tag
                v-for="label in item.labels"
                :key="label"
                class="article-label"
                @click="doSearch(label)"
              >
                {{ label }}
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <div class="div-list-article">
        <div v-for="item in listArticles" :key="item.id" class="div-article">
          <el-image v-if="item.cover" :src="$constant.baseImageUrl + item.cover" fit="cover" />
          <div class="div-article-text">
            <div>
              <el-link class="article-title">{{ item.title }}</el-link>
            </div>
            <div>
              <span>{{ item.summary }}</span>
            </div>
            <div>
              <el-tag v-for="label in item.labels" :key="label" class="article-label">{{
                label
              }}</el-tag>
            </div>
          </div>
        </div>
        <el-pagination
          class="article-page"
          layout="prev, pager, next"
          :current-page="currentPageIndex"
          :page-size="currentPageSize"
          :total="totalCount"
          @current-change="pageChange"
        />
      </div>
    </div>
    <div class="div-home-right">
      <div id="div-search" class="div-part div-search">
        <div class="part-title">搜索</div>
        <el-input
          v-model="searchParams"
          placeholder="请输入要搜索的内容"
          @keyup.enter.native="doSearch(searchParams)"
        >
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <div id="div-labels" class="div-part div-labels">
        <div class="part-title">标签云</div>
        <client-only>
          <wordcloud
            :data="defaultLabels"
            :fontSize="fontSize"
            :margin="margin"
            nameKey="name"
            valueKey="count"
            :rotate="rotate"
            :showTooltip="false"
            :wordClick="wordClickHandler"
          />
        </client-only>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  async asyncData({ params, app }) {
    const resAdminInfo = await app.$request.getUserInfo('752549712338354176')
    const resListCategory = await app.$request.getCategories()
    const resLoopImages = await app.$request.getLoopImages()
    const resTopArticles = await app.$request.getTopArticles()
    const resListArticles = await app.$request.getListArticles('', 1, 10)
    const currentPageIndex = resListArticles.data.currentPage
    const currentPageSize = resListArticles.data.pageSize
    const totalCount = resListArticles.data.totalCount
    let listCategory = []
    listCategory.push({
      name: '全部分类',
      id: ''
    })
    listCategory = listCategory.concat(resListCategory.data)
    return {
      currentPageIndex,
      currentPageSize,
      totalCount,
      adminInfo: resAdminInfo.data,
      listCategory,
      listloopImages: resLoopImages.data,
      listTopArticles: resTopArticles.data,
      listArticles: resListArticles.data.contents,
      currentCategoryId: ''
    }
  },
  data() {
    return {
      defaultLabels: [],
      fontSize: [20, 30],
      margin: { top: 0, right: 0, bottom: 0, left: 0 },
      rotate: { from: -10, to: 10, numOfOrientation: 20 },
      searchParams: ''
    }
  },
  mounted() {
    this.getLabels()
    this.onWindowScroll()
    window.addEventListener('scroll', this.onWindowScroll)
    window.onresize = () => {
      this.onWindowScroll()
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll)
  },
  methods: {
    doSearch(param) {
      this.searchParams = param
      if (this.searchParams === '') {
        this.$message.error('查询条件不能为空')
        return false
      }
      window.open('/search?keyword=' + this.searchParams.trim())
      // this.$router.push({
      //   name: 'search',
      //   query: {
      //     keyword: this.searchParams.trim()
      //   }
      // })
    },
    async listArticleByCategoryId(categoryId) {
      this.currentCategoryId = categoryId
      this.currentPageIndex = 1
      const res = await this.$request.getListArticles(
        this.currentCategoryId,
        this.currentPageIndex,
        this.currentPageSize
      )
      if (res.code === this.$constant.successCode) {
        this.listArticles = res.data.contents
        this.totalCount = res.data.totalCount
      } else {
        this.$message.error(res.message)
      }
    },
    onWindowScroll() {
      const scrolledTop = document.documentElement.scrollTop
      const scrolledLeft = document.documentElement.scrollLeft
      const leftDivElement = document.getElementById('div-home-left')
      const centerDivElement = document.getElementById('div-home-middle')
      const parentElement = document.getElementById('div-home-box')
      if (leftDivElement && centerDivElement && parentElement) {
        // 处理上下滑动
        const centerTop = centerDivElement.offsetTop
        if (scrolledTop <= centerTop) {
          leftDivElement.style.top = centerTop - scrolledTop + 'px'
        } else {
          leftDivElement.style.top = '10px'
        }
        // 处理左右滑动
        if (scrolledLeft > 0) {
          leftDivElement.style.left = -scrolledLeft + 'px'
        } else {
          leftDivElement.style.left = parentElement.offsetLeft + 'px'
        }
      }
      // 右侧标签云悬浮控制
      const searchDivElement = document.getElementById('div-search')
      const labelDivElement = document.getElementById('div-labels')
      if (searchDivElement && labelDivElement) {
        // 搜索框底部距离顶部的到校
        const bottomOfSearch = searchDivElement.offsetTop + searchDivElement.offsetHeight
        if (scrolledTop >= bottomOfSearch) {
          labelDivElement.style.position = 'fixed'
          labelDivElement.style.top = '10px'
          labelDivElement.style.width = '225px'
        } else {
          labelDivElement.style.position = ''
          labelDivElement.style.top = ''
        }
        // 处理左右滑动
        if (scrolledLeft > 0) {
          labelDivElement.style.left =
            parentElement.offsetWidth +
            parentElement.offsetLeft -
            scrolledLeft -
            labelDivElement.offsetWidth +
            'px'
        } else {
          labelDivElement.style.left =
            parentElement.offsetWidth -
            labelDivElement.offsetWidth +
            parentElement.offsetLeft +
            'px'
        }
      }
    },
    async pageChange(page) {
      this.currentPageIndex = page
      const res = await this.$request.getListArticles(
        this.currentCategoryId,
        this.currentPageIndex,
        this.currentPageSize
      )
      if (res.code === this.$constant.successCode) {
        this.listArticles = res.data.contents
        this.totalCount = res.data.totalCount
        // 回到顶部
        const topHeader = document.getElementById('div-header-box')
        if (topHeader) {
          topHeader.scrollIntoView({
            block: 'start',
            behavior: 'smooth'
          })
        }
      } else {
        this.currentPageIndex = 1
        this.$message.error(res.message)
      }
    },
    async getLabels() {
      const res = await this.$request.getListLabels(10)
      if (res.code === this.$constant.successCode) {
        this.defaultLabels = res.data.content
      } else {
        this.$message.error(res.message)
      }
    },
    wordClickHandler(name, value, vm) {
      this.doSearch(name)
    }
  }
}
</script>

<style>
.div-home-box {
  margin-top: 10px;
}
.div-home-left {
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 235px;
  margin-right: 10px;
  background-color: white;
  text-align: center;
  position: fixed;
}
.div-home-middle {
  width: 630px;
  margin-right: 10px;
  float: left;
  margin-left: 255px;
}
.div-home-right {
  width: 245px;
  float: left;
}
.img-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.div-user-name {
  font-size: 23px;
  font-weight: 400;
}
.div-sign {
  color: #909399;
}
.div-show-category {
  margin-top: 10px;
}
.div-category {
  cursor: pointer;
  padding-top: 5px;
  padding-bottom: 5px;
}
.div-category:hover {
  background-color: aliceblue;
}
.div-category-selected {
  background-color: #ebeef5;
}
.div-article {
  margin-top: 10px;
  background-color: white;
  padding: 10px;
  display: flex;
}
.article-label {
  cursor: pointer;
  margin-right: 5px;
}
.div-article .el-image {
  width: 100px;
  height: 100px;
  margin-right: 10px;
}
.div-article-text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100px;
}
.article-page {
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
}
.part-title {
  font-size: 20px;
  font-weight: 400;
  margin-bottom: 10px;
}
.div-part {
  background-color: white;
  margin-bottom: 10px;
  padding: 10px;
}
.wordCloud {
  height: 260px !important;
}
.wordCloud .text {
  cursor: pointer;
}
.article-title {
  font-size: 20px;
  font-weight: 600;
}
</style>
