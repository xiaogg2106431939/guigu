<template>
<div class="type-nav">
    <div class="container">
        <!-- 父级事件委托 -->
        <div @mouseleave="leaveIndex" @mouseover="enterShow">
            <h2 class="all">全部商品分类</h2>
            <transition name="sort">
            <div class="sort" v-show="show">
                <div class="all-sort-list2" @click="goSearch">
                    <div class="item" v-for="(c1,i) in categoryList" :key="c1.categoryId">
                        <h3 @mouseover="changeIndex(i)" :class="{curr:currentIndex == i}">
                            <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                        </h3>
                        <div class="item-list clearfix" :style="{display:currentIndex == i ? 'block' : 'none'}">
                            <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </transition>
        </div>
        
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
    </div>
</div>
</template>

<script>
    import {mapState} from 'vuex'
    import throttle from 'lodash/throttle'
    export default {
        name:'TypeNav',
        data() {
            return {
                currentIndex:-1,
                show:true
            }
        },
        mounted(){
            
            //当组件挂载完毕，让show变为false
            if(this.$route.path != '/home'){
                this.show = false
            }
        },
        methods: {
            // changeIndex(i){
            //     this.currentIndex = i
            // },
            //节流：把频繁的操作变为少量的操作,throttle回调函数别用箭头函数，可能出现上下文this问题
            changeIndex:throttle(function(i){
                this.currentIndex = i
                console.log('执行',i);
            },20),
            leaveIndex(){
                this.currentIndex = -1
                if (this.$route.path !== '/home') {
                    this.show = false
                }
            },
            enterShow(){
                if (this.$route.path != '/home') {
                    this.show = true
                }
            },

            //进行路由跳转
            goSearch(e){
                //第一个问题：事件委托(全部元素都有影响)怎么确定点击的一定是a元素
                //a中加上自定义属性：data-categoryName,其他元素没有
                let el = e.target
                //节点有一个属性dataset属性，可以获取节点的自定义属性与值
                //如果标签身上拥有categoryname一定是指定的标签,category1id区分是哪一级的标签
                let {categoryname,category1id,category2id,category3id} = el.dataset
                if (categoryname) {
                    //整理路由跳转参数
                    let location = {name:'Search'}
                    let query = {categoryName:categoryname}
                    //判断是哪一分类a标签
                    if(category1id){
                        query.category1Id =category1id
                    }else if(category2id){
                        query.category2Id =category2id
                    }else{
                        query.category3Id =category3id
                    }

                   //判断：如果路由跳转的时候，带有params参数，捎带脚也传递过去
                   if (this.$route.params) {
                        location.params = this.$route.params
                        //整理完整参数
                        location.query = query
                        this.$router.push(location)
                   }
                }
            }
        },
        computed: {
            ...mapState({
                categoryList:state=> state.home.categoryList.slice(0,16)
            })
        },
    }
</script>

<style lang="less" scoped>
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

                        // &:hover {
                        //     .item-list {
                        //         display: block;
                        //     }
                        // }
                    }
                    .curr{
                        background: skyblue;
                    }
                }
            }
            .sort-enter{
                height: 0;
            }
            .sort-enter-to{
                height: 461px;
            }
            .sort-enter-active{
                transition: 0.2s all linear;
            }
        }
    }
</style>