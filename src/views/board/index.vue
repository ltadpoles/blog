<template>
  <div class="view">
    <div class="view-content">
      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="board" />
            <span>留言板</span>
          </div>
        </div>
        <el-divider />
        <comment-form @submit="onMainSubmit" />
      </div>

      <div class="card">
        <div class="card-header">
          <div class="card-header-left">
            <SvgIcon name="more" />
            <span>留言列表</span>
          </div>
        </div>
        <el-divider />

        <ul class="board-list">
          <li class="board-item" v-for="item in messages" :key="item.id">
            <div class="board-item-inner">
              <el-avatar
                class="board-avatar"
                @click="formatWebsite(item.user?.website)"
                :src="item.user?.avatar || defaultAvatar"
                :size="32"
              />
              <div class="board-body">
                <div class="board-header">
                  <h4 class="board-name">
                    <span>{{ item.user?.name }}</span>
                  </h4>
                  <div class="board-meta">
                    <span v-if="item.ipCountry" class="board-location">{{
                      item.ipCountry + item.ipProvince + item.ipCity
                    }}</span>
                  </div>
                </div>

                <!-- 留言内容 -->
                <p class="board-content">{{ item.content }}</p>

                <!-- 留言操作 -->
                <div class="board-actions">
                  <span class="board-time">{{ dayjs(item.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                  <div class="board-action-item" @click="toggleLike(item.id)" :class="{ liked: item.liked }">
                    <SvgIcon name="like" :class="{ liked: item.liked }" />
                    <span>{{ item.likes || 0 }}</span>
                  </div>
                  <div
                    class="board-action-item"
                    @click="toggleReply(item.id)"
                    :class="{ 'reply-active': replying[item.id] }"
                  >
                    <SvgIcon name="message" :class="{ 'reply-active': replying[item.id] }" />
                    <span>{{ replying[item.id] ? '取消回复' : '回复' }}</span>
                  </div>
                </div>

                <!-- 回复输入框组件 -->
                <div class="reply-box">
                  <comment-form
                    :ref="
                      el => {
                        if (el) replyFormRefs[item.id] = el
                      }
                    "
                    :rows="2"
                    :parentId="item.id"
                    v-if="replying[item.id]"
                    @submit="onReplySubmit"
                  />
                </div>

                <!-- 回复列表 -->
                <div v-if="item.list && item.list.length" class="reply-list">
                  <div v-for="reply in getDisplayReplies(item)" :key="reply.id" class="reply-list-item">
                    <el-avatar
                      class="reply-avatar"
                      @click="formatWebsite(reply.user?.website)"
                      :src="reply.user?.avatar || defaultAvatar"
                      :size="24"
                    />
                    <div class="reply-content-wrapper">
                      <div class="reply-header">
                        <span class="reply-name">{{ reply.user?.name }}</span>
                        <span class="reply-reply-to">回复 {{ item.user?.name }}</span>
                        <!-- <span class="reply-time">{{ dayjs(reply.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span> -->
                      </div>
                      <div class="reply-content">{{ reply.content }}</div>

                      <div class="board-actions">
                        <span class="board-time">{{ dayjs(reply.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                        <div
                          class="board-action-item"
                          @click="toggleLikeReply(item.id, reply.id)"
                          :class="{ liked: reply.liked }"
                        >
                          <SvgIcon name="like" :class="{ liked: reply.liked }" />
                          <span>{{ reply.likes || 0 }}</span>
                        </div>
                        <div
                          class="board-action-item"
                          @click="toggleReplyToReply(item.id, reply.id)"
                          :class="{ 'reply-active': replyingToReply[`${item.id}-${reply.id}`] }"
                        >
                          <SvgIcon
                            name="message"
                            :class="{ 'reply-active': replyingToReply[`${item.id}-${reply.id}`] }"
                          />
                          <span>{{ replyingToReply[`${item.id}-${reply.id}`] ? '取消回复' : '回复' }}</span>
                        </div>
                      </div>

                      <div class="reply-box">
                        <comment-form
                          :ref="
                            el => {
                              if (el) replyFormRefs[`${item.id}-${reply.id}`] = el
                            }
                          "
                          :rows="2"
                          :parentId="item.id"
                          v-if="replyingToReply[`${item.id}-${reply.id}`]"
                          @submit="onReplySubmit"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- 展开/收起更多回复 -->
                  <div v-if="item.list.length > maxCollapsedReplies" class="reply-more">
                    <el-button type="text" size="small" @click="toggleRepliesExpand(item.id)">
                      {{ getMoreLabel(item) }}
                    </el-button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- 分页组件 -->
        <div class="pagination-wrapper">
          <el-pagination
            v-model:current-page="pagination.pageNum"
            :page-size="pagination.pageSize"
            :total="pagination.total"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import defaultAvatar from '@/assets/images/avatar.jpg'
import CommentForm from '@/components/comment-form/index.vue'
import { getBoardList, getBoardPage } from '@/api/board'
import { dayjs } from 'element-plus'

// 留言数据
const messages = ref([])

// 分页配置
const pagination = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})

// 响应式状态
const replying = reactive({})
const replyContent = reactive({})
const repliesExpanded = reactive({})
const maxCollapsedReplies = 2

// 回复的回复状态
const replyingToReply = reactive({})
const replyToReplyContent = reactive({})

// 回复组件ref
const replyFormRefs = reactive({})

const getList = async () => {
  try {
    let { data } = await getBoardPage({
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize
    })

    messages.value = data.data.list
    pagination.total = data.data.total
  } catch {
    // 获取留言列表失败
  }
}

// 格式化网站链接
const formatWebsite = website => {
  if (!website) {
    return
  }
  window.open(/^https?:\/\//i.test(website) ? website : `https://${website}`, '_blank')
}

// 切换回复输入框
const toggleReply = id => {
  // 如果当前回复框已经打开，则关闭它
  if (replying[id]) {
    replying[id] = false
    return
  }

  // 关闭所有其他回复框
  Object.keys(replying).forEach(key => {
    replying[key] = false
  })

  // 关闭所有嵌套回复框
  Object.keys(replyingToReply).forEach(key => {
    replyingToReply[key] = false
  })

  // 打开当前回复框
  replying[id] = true

  if (!replyContent[id]) {
    replyContent[id] = ''
  }

  // 自动获取焦点
  nextTick(() => {
    if (replyFormRefs[id]) {
      replyFormRefs[id].focus()
    } else {
      setTimeout(() => {
        if (replyFormRefs[id]) {
          replyFormRefs[id].focus()
        }
      }, 100)
    }
  })
}

// 主留言提交处理
const onMainSubmit = async () => {
  // 刷新留言列表，回到第一页
  pagination.pageNum = 1
  await getList()
}

// 关闭所有回复框
const closeAllReplyBoxes = () => {
  // 关闭所有主回复框
  Object.keys(replying).forEach(id => {
    replying[id] = false
  })

  // 关闭所有嵌套回复框
  Object.keys(replyingToReply).forEach(key => {
    replyingToReply[key] = false
  })
}

// 回复提交处理
const onReplySubmit = async id => {
  try {
    // 关闭所有回复框
    closeAllReplyBoxes()

    // 刷新本条留言的回复列表
    let { data } = await getBoardList({ parentId: id })
    const item = messages.value.find(m => m.id === id)
    if (item) {
      item.list = Object.assign([], data.data.list)
    }
  } catch {
    // 获取回复列表失败
  }
}

// 当前页改变
const handleCurrentChange = current => {
  pagination.pageNum = current
  getList()
}

// 切换回复展开状态
const toggleRepliesExpand = id => {
  repliesExpanded[id] = !repliesExpanded[id]
}

// 获取显示的回复列表
const getDisplayReplies = item => {
  if (!item.list || !item.list.length) {
    return []
  }

  if (repliesExpanded[item.id] || item.list.length <= maxCollapsedReplies) {
    return item.list
  }

  return item.list.slice(0, maxCollapsedReplies)
}

// 获取更多回复的标签
const getMoreLabel = item => {
  return repliesExpanded[item.id] ? '收起' : `展开更多 ${item.list.length - maxCollapsedReplies} 条`
}

// 切换点赞状态
const toggleLike = id => {
  const item = messages.value.find(m => m.id === id)
  if (item) {
    item.liked = !item.liked
    item.likes = item.liked ? (item.likes || 0) + 1 : Math.max(0, (item.likes || 0) - 1)
  }
}

// 切换回复点赞状态
const toggleLikeReply = (messageId, replyId) => {
  const message = messages.value.find(m => m.id === messageId)
  if (message && message.list) {
    const reply = message.list.find(r => r.id === replyId)
    if (reply) {
      reply.liked = !reply.liked
      reply.likes = reply.liked ? (reply.likes || 0) + 1 : Math.max(0, (reply.likes || 0) - 1)
    }
  }
}

// 切换回复到回复输入框
const toggleReplyToReply = (messageId, replyId) => {
  const key = `${messageId}-${replyId}`

  // 如果当前嵌套回复框已经打开，则关闭它
  if (replyingToReply[key]) {
    replyingToReply[key] = false
    return
  }

  // 关闭所有主回复框
  Object.keys(replying).forEach(id => {
    replying[id] = false
  })

  // 关闭所有其他嵌套回复框
  Object.keys(replyingToReply).forEach(otherKey => {
    replyingToReply[otherKey] = false
  })

  // 打开当前嵌套回复框
  replyingToReply[key] = true

  if (!replyToReplyContent[key]) {
    replyToReplyContent[key] = ''
  }

  // 自动获取焦点
  nextTick(() => {
    if (replyFormRefs[key]) {
      replyFormRefs[key].focus()
    } else {
      setTimeout(() => {
        if (replyFormRefs[key]) {
          replyFormRefs[key].focus()
        }
      }, 100)
    }
  })
}

// 监听回复状态变化，自动获取焦点
watch(
  replying,
  (newVal, oldVal) => {
    Object.keys(newVal).forEach(id => {
      if (newVal[id] && !oldVal[id]) {
        // 回复框刚显示，尝试获取焦点
        const focusReply = () => {
          if (replyFormRefs[id]) {
            replyFormRefs[id].focus()
          }
        }
        nextTick(() => {
          setTimeout(focusReply, 50)
        })
      }
    })
  },
  { deep: true }
)

// 监听嵌套回复状态变化，自动获取焦点
watch(
  replyingToReply,
  (newVal, oldVal) => {
    Object.keys(newVal).forEach(key => {
      if (newVal[key] && !oldVal[key]) {
        // 嵌套回复框刚显示，尝试获取焦点
        const focusNestedReply = () => {
          if (replyFormRefs[key]) {
            replyFormRefs[key].focus()
          }
        }
        nextTick(() => {
          setTimeout(focusNestedReply, 50)
        })
      }
    })
  },
  { deep: true }
)

onMounted(() => {
  getList()
})
</script>

<style lang="scss" scoped>
@use './index.scss' as *;
</style>
