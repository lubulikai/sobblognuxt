<template>
  <div class="friend-link-base">
    <div class="div-friend-link-title">友情链接</div>
    <div class="div-list-friend-link">
      <div v-for="item in listFriendLink" :key="item.id" :title="item.name" class="div-friend-link">
        <a :href="item.url" target="_blank">
          <el-image class="image-friend-link" :src="item.logo" :fit="fit"></el-image>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ params, app }) {
    const resFriendLink = await app.$request.getFriendLink()
    return {
      listFriendLink: resFriendLink.data
    }
  }
}
</script>

<style>
.friend-link-base {
  background-color: white;
  margin-top: 20px;
  padding: 20px;
}
.div-friend-link-title {
  margin-top: 30px;
  text-align: center;
  font-size: 30px;
  margin-bottom: 30px;
}
.div-list-friend-link {
  display: flex;
}
.div-friend-link {
  padding: 10px;
  margin-right: 10px;
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid #dcdfe6;
}
.div-friend-link:hover {
  border-color: #409eff;
}
.image-friend-link {
  width: 240px;
  height: 100px;
}
</style>
