<template>
    <div>
       <TypeNav />
       <div class="main">
        <div class="py-container">
            <!--bread-->
            <div class="bread">
            <ul class="fl sui-breadcrumb">
                <li>
                <a href="#">全部结果</a>
                </li>
            </ul>
            <ul class="fl sui-tag">
                <!-- 分类的面包屑 -->
                <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
                <!-- 关键字的面包屑 -->
                <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
                <!-- 品牌的面包屑 -->
                <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrademark">×</i></li>
                <!-- 平台的售卖属性值展示，是数组形式 -->
                <li class="with-x" v-for="(attrVal,i) in searchParams.props" :key="i">{{attrVal.split(':')[1]}}<i @click="removeAttr(i)">×</i></li>
            </ul>
            </div>

            <!--selector-->
            <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

            <!--details-->
            <div class="details clearfix">
            <div class="sui-navbar">
                <div class="navbar-inner filter">
                <ul class="sui-nav">
                    <!-- 不包含== -1，包含 != -1 -->
                    <!-- <li :class="{active:isOne}">
                    <a>综合<span :class="{'icon-up':isAsc,'icon-down':isDesc}">⬆</span></a>
                    </li> -->
                    <li :class="{active:isOne}" @click="changeOrder('1')">
                    <a>综合<span v-show="isOne && isAsc">⬆</span><span v-show="isOne && isDesc">⬇</span></a>
                    </li>
                    <li :class="{active:isTwo}" @click="changeOrder('2')">
                    <a>综合<span v-show="isTwo && isAsc">⬆</span><span v-show="isTwo && isDesc">⬇</span></a>
                    </li>
                </ul>
                </div>
            </div>
            <div class="goods-list">
                <ul class="yui3-g">
                <li class="yui3-u-1-5" v-for="good in goodsList" :key="good.id">
                    <div class="list-wrap">
                    <div class="p-img">
                        <a href="item.html" target="_blank"><img :src="good.defaultImg" /></a>
                    </div>
                    <div class="price">
                        <strong>
                        <em>¥</em>
                        <i>{{good.price.toFixed(2)}}</i>
                        </strong>
                    </div>
                    <div class="attr">
                        <a target="_blank" href="item.html" title="">{{htmltag(good.title)}}</a>
                    </div>
                    <div class="commit">
                        <i class="command">已有<span>2000</span>人评价</i>
                    </div>
                    <div class="operate">
                        <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                        <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                    </div>
                    </div>
                </li>
                
                </ul>
            </div>
            <!-- 分页,测试阶段用假数据测试，pageNo:当前页码，pageSize:当前条数，total:总数，continues:连续页码多少页 -->
            <!-- <Pagination :pageNo="5" :pageSize="3" :total="91" :continues="5" /> -->
            <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import SearchSelector from './SearchSelector'
  import {mapGetters,mapState} from 'vuex'
  export default {
    name:'Search',
    data() {
      return {
        searchParams:{
          category1Id:'',
          category2Id:'',
          category3Id:'',
          categoryName:'',
          keyword:'',
          //排序-初始状态应该是综合|降序
          order:'1:desc',
          //平台售卖属性操作带的参数
          props:[],
          //品牌
          trademark:'',
          //页码
          pageNo:1,
          //每页条数
          pageSize:5
        }
      }
    },
    //在挂载之前调用一次|可以在发请求之前将带有参数进行修改
    beforeMount() {
      //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
      //ES6新增语法：合并对象
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
    },

    //组件挂载完毕执行一次[仅仅执行一次]
    mounted() {
      //必须派发actions
      this.getData()
    },

    methods: {
      //封装成函数向服务器发请求获取search模块数据，可以根据参数不同返回不同数据进行展示
      getData(){
        this.$store.dispatch('getSearchList',this.searchParams)
      },

      //去掉所有的html标记
      htmltag(item) {
        return item.replace(/<[^>]+>/g, '')
      },

      //删除分类名称
      removeCategoryName(){
        this.searchParams.categoryName = undefined
        this.resetVal()
        this.getData()
        //地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
        //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
        if (this.$route.params) {
          this.$router.push({name:'Search',params:this.$route.params})
        }
      },

      //删除关键字
      removeKeyword(){
        //给服务器发送参数keyword置空
        this.searchParams.keyword = undefined
        this.getData()
        //通知兄弟组件Header清除关键字
        this.$bus.$emit('clear')
        //处理路由跳转
        if (this.$route.query) {
          this.$router.push({name:'Search',query:this.$route.query})
        }
      },

      //子父组件自定义事件回调
      trademarkInfo(item){
        //整理品牌字段参数---"ID:品牌名称"
          this.searchParams.trademark = `${item.tmId}:${item.tmName}`
          sessionStorage.setItem('trademark',JSON.stringify(this.searchParams.trademark))
          // sessionStorage.setItem('abc',window.btoa(window.encodeURIComponent(JSON.stringify(this.searchParams.trademark))))
            //再发请求
          this.getData()
      },

      //收集平台属性值回调函数(自定义事件)
      attrInfo(attr,attrVal){
        //整合参数形式：["属性ID:属性值:属性名"]
        let props = `${attr.attrId}:${attrVal}:${attr.attrName}`
        //多条数据添加
        //数组去重
        if (this.searchParams.props.indexOf(props) == -1) this.searchParams.props.push(props)
        this.getData()
      },

      //删除品牌信息
      removeTrademark(){
        this.searchParams.trademark = undefined
        this.getData()
      },

      //删除售卖属性
      removeAttr(i){
        //再次整理参数。删除数组
        this.searchParams.props.splice(i,1)
        //再次发请求
        this.getData()
      },

      //排序操作
      changeOrder(flag){
        //flag形参：它是个标记，代表用户点击的是综合(1)还是价格(2)
        let originOrder = this.searchParams.order
        //获取到的是最开始状态
        let originFlag = this.searchParams.order.split(':')[0]
        let originSort =this.searchParams.order.split(':')[1]
        //准备一个新的order属性值
        let newOrder = ''
        //点击默认的是综合
        if (flag == originFlag) {
          newOrder = `${originFlag}:${originSort == 'desc' ? 'asc' : 'desc'}`
        }else {
          newOrder = `${flag}:${"desc"}`
        }
        //将新的neworder赋予seaechParams
        this.searchParams.order = newOrder
        this.getData()
      },

      resetVal(){
        //带给服务器的参数可有可无的：
        //如果属性值为空的字符串还是会把相应的字段带给服务器增加服务压力
        //如果把相应的字段变为undefined，当前这个字段不会带给服务器
        this.searchParams.category1Id = undefined
        this.searchParams.category2Id = undefined
        this.searchParams.category3Id = undefined
      },

      //自定义事件回调--获取当前第几页
      getPageNo(pageNo){
        this.searchParams.pageNo = pageNo
        this.getData()
      }
    },

    computed:{
      //mapGetters里面写法：传递的是数组,没有大小仓库之分
      ...mapGetters(['goodsList']),
      //捞取分页总条数
      ...mapState({
        total:state=>state.search.searchList.total
      }),
      isOne(){
        return this.searchParams.order.indexOf('1') != -1
      },
      isTwo(){
        return this.searchParams.order.indexOf('2') != -1
      },
      isAsc(){
        return this.searchParams.order.indexOf('asc') != -1
      },
      isDesc(){
        return this.searchParams.order.indexOf('desc') != -1
      }
    },

    //监听组件实例上的属性的属性值变化。可根据vuedeloot的data观察
    watch:{
      //监听路由信息是否发生变化，如果变化，再次发请求
      $route:{
        immediate:true,
        handler(newVal,oldVal){
          let sessionTrade = sessionStorage.getItem('trademark')
          let parseTrade = JSON.parse(sessionTrade)
          // let parseTrade = JSON.parse(decodeURIComponent(window.atob(sessionTrade)))
          
          if (oldVal == 'undefined') {
            Object.assign(this.searchParams, this.$route.query, this.$route.params,this.searchParams.trademark)
          }else{
            Object.assign(this.searchParams, this.$route.query, this.$route.params)
            sessionStorage.removeItem('trademark')
            this.searchParams.trademark = this.searchParams.trademark
          }
          this.getData()
          this.resetVal()
          this.searchParams.trademark = parseTrade
        }
        // //再次发请求之前整理带给服务器的参数
        // Object.assign(this.searchParams, this.$route.query, this.$route.params)
        // //再发请求
        // this.getData()
        //每一次请求完毕，应该把相应的1，2，3级id置空，让它接收下一次相应的id值
        // this.resetVal()
      }
    },
    components: {
      SearchSelector
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        
      }
    }
  }
</style>