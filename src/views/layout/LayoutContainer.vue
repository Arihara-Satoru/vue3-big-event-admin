<script setup>
import {
  Management,
  Promotion,
  UserFilled,
  User,
  Crop,
  EditPen,
  SwitchButton,
  CaretBottom,
  Monitor,
  Moon,
  Sunny
} from '@element-plus/icons-vue'
import avatar from '@/assets/default.png'
import { useUserStore } from '@/stores/modelus/user'
import { useI18nStore } from '@/stores/modelus/i18n'
import { useThemeStore } from '@/stores/modelus/theme'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import router from '@/router'

const { t, locale } = useI18n()
const userStore = useUserStore()
const i18nStore = useI18nStore()
const themeStore = useThemeStore()

onMounted(() => {
  userStore.getUserInfo()
})

const toggleLanguage = () => {
  const newLocale = i18nStore.locale === 'zh' ? 'en' : 'zh'
  i18nStore.setLocale(newLocale)
  locale.value = newLocale
}

const handleCommand = async (key) => {
  if (key === 'logout') {
    await ElMessageBox.confirm(t('common.logout') + '?', t('common.confirm'), {
      type: 'warning',
      confirmButtonText: t('common.confirm'),
      cancelButtonText: t('common.cancel')
    })
    userStore.removeToken()
    userStore.setUserInfo()
    router.push('/login')
  } else {
    router.push(`/user/${key}`)
  }
}
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="200px">
      <div class="el-aside__logo"></div>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#232323"
        :default-active="$route.path"
        text-color="#fff"
        router>
        <el-menu-item index="/article/channel">
          <el-icon><Management /></el-icon>
          <span>{{ $t('nav.articleChannel') }}</span>
        </el-menu-item>
        <el-menu-item index="/article/manage">
          <el-icon><Promotion /></el-icon>
          <span>{{ $t('nav.articleManage') }}</span>
        </el-menu-item>
        <el-menu-item index="/health/dashboard">
          <el-icon><Monitor /></el-icon>
          <span>{{ $t('nav.health') }}</span>
        </el-menu-item>
        <el-sub-menu index="/user">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>{{ $t('nav.userProfile') }}</span>
          </template>
          <el-menu-item index="/user/profile">
            <el-icon><User /></el-icon>
            <span>{{ $t('nav.userProfile') }}</span>
          </el-menu-item>
          <el-menu-item index="/user/avatar">
            <el-icon><Crop /></el-icon>
            <span>{{ $t('nav.userAvatar') }}</span>
          </el-menu-item>
          <el-menu-item index="/user/password">
            <el-icon><EditPen /></el-icon>
            <span>{{ $t('nav.userPassword') }}</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div class="header-left">
          <strong>
            {{ userStore.userInfo.nickname || userStore.userInfo.username }}
          </strong>
        </div>
        <div class="header-right">
          <el-button
            circle
            :icon="themeStore.isDark ? Sunny : Moon"
            @click="themeStore.toggleDark()" />
          <el-button circle @click="toggleLanguage">
            {{ i18nStore.locale === 'zh' ? 'EN' : '中' }}
          </el-button>
          <el-dropdown placement="bottom-end" @command="handleCommand">
            <span class="el-dropdown__box">
              <el-avatar :src="userStore.userInfo.user_pic || avatar" />
              <el-icon><CaretBottom /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile" :icon="User">
                  {{ $t('nav.userProfile') }}
                </el-dropdown-item>
                <el-dropdown-item command="avatar" :icon="Crop">
                  {{ $t('nav.userAvatar') }}
                </el-dropdown-item>
                <el-dropdown-item command="password" :icon="EditPen">
                  {{ $t('nav.userPassword') }}
                </el-dropdown-item>
                <el-dropdown-item command="logout" :icon="SwitchButton">
                  {{ $t('common.logout') }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>大事件 ©2023 Created by</el-footer>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout-container {
  height: 100vh;

  .el-aside {
    background-color: #232323;

    &__logo {
      height: 120px;
      background: url('@/assets/logo.png') no-repeat center / 120px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: var(--el-bg-color);
    border-bottom: 1px solid var(--el-border-color);
    display: flex;
    align-items: center;
    justify-content: space-between;

    .header-right {
      display: flex;
      align-items: center;
      gap: 15px;
    }

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>
