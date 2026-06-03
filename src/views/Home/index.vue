<script setup>
import HomeBanner from './components/HomeBanner.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeHot from './components/HomeHot.vue';
import HomeNew from './components/HomeNew.vue';
import HomeProduct from './components/HomeProduct.vue';
import HomePanel from './components/HomePanel.vue';
</script>

<template>
  <div class="container">
    <HomeBanner></HomeBanner>
    <HomeCategory></HomeCategory>
  </div>
  <HomeHot></HomeHot>
  <HomeNew></HomeNew>
  <HomeProduct></HomeProduct>
  <HomePanel title="新鲜好物" subTitle="新鲜好物 人气推荐">
    <div>我是新鲜好物的插槽</div>
  </HomePanel>
  <HomePanel title="人气推荐" subTitle="新鲜好物 人气推荐">
    <div>我是人气推荐的插槽</div>
  </HomePanel>
</template>
