<template>
    <div>
        <!-- 三级联动组件 -->
        <TypeNav />
        <!-- 列表 -->
        <ListContainer />
        <!-- 今日推荐 -->
        <Recommend />
        <!-- 排行 -->
        <Rank />
        <!-- 猜你喜欢 -->
        <Like />
        <!-- 楼层 -->
        <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
        <Brand />
    </div>
</template>

<script>
    import ListContainer from '@/views/Home/ListContainer'
    import Recommend from '@/views/Home/Recommend'
    import Rank from '@/views/Home/Rank'
    import Like from '@/views/Home/Like'
    import Floor from '@/views/Home/Floor'
    import Brand from '@/views/Home/Brand'

    import {mapState} from 'vuex'
    export default {
        components:{
            ListContainer,
            Recommend,
            Rank,
            Like,
            Floor,
            Brand
        },
        mounted() {
            //派发actions，获取父组件派发多个floor组件的数据
            this.$store.dispatch('getFloorList')
            //获取用户信息再首页展示
        },
        computed:{
            ...mapState({
                floorList:state => state.home.floorList
            })
        }
    }
</script>

<style lang="less" scoped>

</style>