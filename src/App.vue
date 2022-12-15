<template>
  <div>
    <Header />
    <router-view />
    <Footer v-show="$route.meta.show" />
  </div>
</template>
<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
export default {
  name:'',
  components:{
    Header,
    Footer
  },
  mounted() {
    //typeNav请求只会执行一次，此处为了请求性能
    this.$store.dispatch('categoryList')
  }
}
</script>
<style lang="less">

</style>
