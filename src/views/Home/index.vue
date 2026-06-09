<script setup>
import { ref, onMounted } from 'vue';
import { getBannerAPI, findNewAPI, getHotAPI, getGoodsAPI } from '@/apis/home';

import HomeBanner from './components/HomeBanner.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeHot from './components/HomeHot.vue';
import HomeNew from './components/HomeNew.vue';
import HomeProduct from './components/HomeProduct.vue';
import HomePanel from './components/HomePanel.vue';

const bannerList = ref([])
const newList = ref([])
const hotList = ref([])
const goodsProduct = ref([])

onMounted(async () => {
  const res = await Promise.all([
    getBannerAPI(),
    findNewAPI(),
    getHotAPI(),
    getGoodsAPI()
  ])
  bannerList.value = res[0].result
  newList.value = res[1].result
  hotList.value = res[2].result
  goodsProduct.value = res[3].result
})
</script>

<template>
  <div class="container">
    <HomeBanner :banner-list="bannerList"></HomeBanner>
    <HomeCategory></HomeCategory>
  </div>
  <HomeNew :new-list="newList"></HomeNew>
  <HomeHot :hot-list="hotList"></HomeHot>
  <HomeProduct :goods-product="goodsProduct"></HomeProduct>
  <HomePanel title="新鲜好物" subTitle="新鲜好物 人气推荐">
    <div>我是新鲜好物的插槽</div>
  </HomePanel>
  <HomePanel title="人气推荐" subTitle="新鲜好物 人气推荐">
    <div>我是人气推荐的插槽</div>
  </HomePanel>
</template>
