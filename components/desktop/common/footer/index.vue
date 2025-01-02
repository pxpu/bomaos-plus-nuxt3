<template>
  <a href="https://t.me/uomiss" id="linkzalo" target="_blank" rel="noopener noreferrer">
    <div class="fcta-zalo-vi-tri-nut">
        <div id="fcta-zalo-tracking" class="fcta-zalo-nen-nut">
            <div id="fcta-zalo-tracking" class="fcta-zalo-ben-trong-nut">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xml:space="preserve">
                    <path d="M19.2 4.4 2.9 10.7c-1.1.4-1.1 1.1-.2 1.3l4.1 1.3 1.6 4.8c.2.5.1.7.6.7.4 0 .6-.2.8-.4l2-2 4.2 3.1c.8.4 1.3.2 1.5-.7l2.8-13.1c.3-1.1-.4-1.7-1.1-1.3m-2.1 3-7.8 7.1-.3 3.3L7.4 13l9.2-5.8c.4-.3.8-.1.5.2"></path>
                    <path style="fill:none;" d="M0 0h24v24H0z"></path>
                </svg>
            </div>
            <div id="fcta-zalo-tracking" class="fcta-zalo-text">联系<br>客服</div>
        </div>
    </div>
    <div id="fcta-zalo-tracking" class="fcta-zalo-mess">
        <span id="fcta-zalo-tracking">联系Telegram</span>
    </div>
  </a>
  <div class="bomaos-footer">
    <div class="start-box">
      <div class="container">
        <div class="auto-width join-apy-wrap sm-p-lr-15">
          <ul style="margin-bottom: 0px">
            <n-row gutter="15">
              <n-col :span="6" v-for="(item, index) in JSON.parse(setting.storeServiceConfig as string)" :key="index" >
                <li :class="{ 'box-sizing-show': index !== (JSON.parse(setting.storeServiceConfig as string).length - 1) }">
                  <template v-html="item.icon"></template>
                  <div>
                    <h3 class="font-weight-bold font-size-24">{{ item.name }}</h3>
                    <p class="color-main-596680">{{ item.summary }}</p>
                  </div>
                </li>
              </n-col>
            </n-row>
          </ul>
        </div>
      </div>
    </div>
    <div class="bomaos-tools-widget">
      <div class="container" style="display: flex">
        <n-row gutter="15">
          <n-col :span="6">
            <nav style="margin-right: 15px">
              <div class="title">商城简介</div>
              <div class="turn" style="color: #666; line-height: 1.5;">
                {{ setting.introduction }}
              </div>
            </nav>
          </n-col>
          <n-col :span="3">
            <nav>
              <div class="title">功能导航</div>
              <div class="turn" style="color: #666">
                <nuxt-link to="https://2fa.uno" target="_blank">2FA工具箱</nuxt-link>
                <nuxt-link to="/" target="_blank">GPT镜像站</nuxt-link>
                <nuxt-link to="/" target="_blank">本站发布页</nuxt-link>
              </div>
            </nav>
          </n-col>
          <n-col :span="3">
            <nav>
              <div class="title">条款政策</div>
              <div class="turn" style="color: #666">
                <nuxt-link to="/agreement/privacy">隐私政策</nuxt-link>
                <nuxt-link to="/agreement/user">用户协议</nuxt-link>
              </div>
            </nav>
          </n-col>
          <n-col :span="6">
            <nav>
              <div class="title">工作时间</div>
              <div class="turn" style="color: #666">
                <div>{{JSON.parse(setting.workTimeConfig as string).operatingHours}}</div>
                <div>{{JSON.parse(setting.workTimeConfig as string).weekends}}</div>
                <div>{{JSON.parse(setting.workTimeConfig as string).description}}</div>
              </div>
            </nav>
          </n-col>
          <n-col :span="6">
            <nav>
              <div class="title">联系我们</div>
              <div class="turn" style="color: #666">
                <div v-for="(item, index) in JSON.parse(setting.customerServiceConfig as string)" :key="index" style="display: flex; align-items: center;">
                  <span style="width: 80px">{{ item.label }}</span>
                  <a :href="item.url" target="_blank" style="margin-top: 0px">{{ item.name }}</a>
                </div>
              </div>
            </nav>
          </n-col>
        </n-row>
      </div>
    </div>
    <div style="border-top: var(--bomaos-border-color);">
      <div class="container">
        <div class="link-box">
          <div class="container beian">
            <n-space justify="center">
              <span>Copyright © 2025 {{ setting.websiteName }}</span>
            </n-space>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {StoreSetting} from "~/api/settings/store-setting/model";
import {useSettingStore} from "~/store/useSettingStore";

const setting = useSettingStore().setting as StoreSetting;
</script>

<style scoped lang="less">
.bomaos-footer {
  border-top: 1px solid #f0f0f0;
  background-color: var(--bomaos-background-color);
}

.link-box {
  height: auto;
  .beian {
    text-align: center;
    padding-top: 15px;
    padding-bottom: 15px;
    font-size: .8rem;
    font-weight: 400;
    font-family: Content-font, Roboto, sans-serif;
    color: #222;
  }
}

.start-box {
  width: 100%;
  padding: 30px 0;
  background: var(--bomaos-background-color) url(https://www.apayun.com/static/images/apy/common/bg-footer.jpg) no-repeat center center;
  background-size: cover;
}

.auto-width {
  max-width: 1200px;
  margin: 0 auto;
}

.join-apy-wrap li {
  position: relative;
}

.join-apy-wrap li {
  display: flex;
  justify-content: center;
}

.join-apy-wrap svg {
  margin-right: 15px;
  width: 34px;
  height: 34px;
}

.font-weight-bold {
  font-weight: 900;
}

.font-size-24 {
  font-size: 24px;
}

.color-main-596680 {
  color: #979ead;
}

.join-apy-wrap li p {
  font-size: 16px;
  margin-top: 10px;
}

.join-apy-wrap .box-sizing-show:after {
  position: absolute;
  content: '';
  right: -10px;
  display: block;
  width: 1px;
  height: 55px;
  background-color: #e5e5e5;
}

.join-apy-wrap svg  {
  fill: var(--bomaos-color-primary);
}

.beian-url {
  color: #222;
}

.beian-url:hover {
  color: var(--bomaos-color-primary);
}

.bomaos-tools-widget {
  border-top: var(--bomaos-border-color);
  background-color: var(--bomaos-background-color);
  padding: 30px 0;
}

nav .title {
  color: #222;
  font-size: 1.125rem;
}

nav .turn {
  margin-top: 15px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div, a {
    margin-top: 8px;
    &:first-child {
      margin-top: 0px;
    }
  }
}

nav .turn a {
  font-size: 1rem;
  color: #666;
  display: block;

  &:hover {
    color: var(--bomaos-color-primary);
  }
}

.icon_links {
  display: flex;
  margin-top: 20px;
}

.icon_links a {
  margin-right: 20px;
}

nav .turn .follow {
  cursor: pointer;
}

nav .turn svg {
  padding: 5px;
  background-color: #7e7e7e;
  border-radius: 50%;
}

.qr-img {
  margin-top: 5px;
  width: 100px;
  height: 100px;
}

div.fcta-zalo-mess {
    opacity: 0;
    transform: translateX(100%);
    transition: opacity .5s ease, transform .5s ease;
}

.fcta-zalo-vi-tri-nut:hover + div.fcta-zalo-mess {
    opacity: 1;
    transform: translateX(0);
}

@keyframes zoom {
    0% {
        opacity: 0;
        transform: scale(.5);
    }
    50% {
        opacity: 1;
    }
    to {
        opacity: 0;
        transform: scale(1);
    }
}

@keyframes lucidgenzalo {
    0%, to {
        transform: rotate(-25deg);
    }
    50% {
        transform: rotate(25deg);
    }
}

.jscroll-to-top {
    bottom: 100px;
}

.fcta-zalo-ben-trong-nut svg path {
    fill: #fff;
}

.fcta-zalo-vi-tri-nut {
    bottom: 50px;
    position: fixed;
    right: 20px;
    z-index: 999;
}

.fcta-zalo-nen-nut,
div.fcta-zalo-mess {
    box-shadow: 0 1px 6px rgba(0, 0, 0, .06), 0 2px 32px rgba(0, 0, 0, .16);
}

.fcta-zalo-nen-nut {
    background: #0068ff;
    border-radius: 50%;
    color: #fff;
    height: 50px;
    position: relative;
    text-align: center;
    width: 50px;
}

.fcta-zalo-nen-nut:after,
.fcta-zalo-nen-nut:before {
    animation: zoom 1.9s linear infinite;
    background: #0068ff80;
    border: 1px solid #0068ff;
    border-radius: 50%;
    bottom: -20px;
    content: "";
    left: -20px;
    position: absolute;
    right: -20px;
    top: -20px;
    z-index: -1;
}

.fcta-zalo-nen-nut:after {
    animation-delay: .4s;
}

.fcta-zalo-ben-trong-nut,
.fcta-zalo-ben-trong-nut i {
    transition: all 1s;
}

.fcta-zalo-ben-trong-nut {
    bottom: 10px;
    font-size: 25px;
    height: 60%;
    left: 10px;
    opacity: 1;
    position: absolute;
    text-align: center;
    width: 60%;
}

.fcta-zalo-ben-trong-nut i {
    animation: lucidgenzalo 1s linear infinite;
}

.fcta-zalo-nen-nut:hover .fcta-zalo-ben-trong-nut,
.fcta-zalo-text {
    opacity: 0;
}

.fcta-zalo-nen-nut:hover i {
    transform: scale(.5);
    transition: all .5s ease-in;
}

.fcta-zalo-text a {
    color: #fff;
    text-decoration: none;
}

.fcta-zalo-text {
    font-size: 12px;
    font-weight: 700;
    left: 13px;
    line-height: 1.5;
    position: absolute;
    text-transform: uppercase;
    top: 8px;
    transform: scaleX(-1);
    transition: all .5s;
}

.fcta-zalo-nen-nut:hover .fcta-zalo-text {
    opacity: 1;
    transform: scaleX(1);
}

div.fcta-zalo-mess {
    background: #fff;
    border-radius: 50px 0 0 50px;
    bottom: 55px;
    color: #0068ff;
    font-size: 15px;
    font-weight: 700;
    padding: 7px 25px 7px 15px;
    position: fixed;
    right: 58px;
    z-index: 99;
}

div.fcta-zalo-mess span {
    color: #0068ff !important;
}

span#fcta-zalo-tracking {
    font-family: Roboto;
    line-height: 1.5;
}

.fcta-zalo-text {
    font-family: Roboto;
}
</style>
