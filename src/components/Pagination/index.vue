<template>
<div>
  <div class="fr page">
    <div class="sui-pagination clearfix">
    <ul>
        <li class="prev" :class="{disabled:pageNo == 1}" @click="$emit('getPageNo',pageNo - 1)">
        <a>«上一页</a>
        </li>
        <li v-if="startAndEndsum.start > 1" :class="{active:pageNo == 1}" @click="$emit('getPageNo',1)">
        <a>1</a>
        </li>
        <li v-if="startAndEndsum.start > 2" class="dotted"><span>...</span></li>
        <li>
        <template v-for="(page,i) in startAndEndsum.end">
            <li :key="i" v-if="page >= startAndEndsum.start" :class="{active:pageNo == page}" @click="$emit('getPageNo',page)">
            <a>{{page}}</a>
            </li>
        </template>
        <li v-if="startAndEndsum.end < totalPage - 1" class="dotted"><span>...</span></li>
        <li v-if="startAndEndsum.end < totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:pageNo == totalPage}">
        <a>{{totalPage}}</a>
        </li>
        <li class="next" :class="{disabled:pageNo == totalPage}" @click="$emit('getPageNo',pageNo + 1)">
        <a>下一页»</a>
        </li>
    </ul>
    <div><span>共{{total}}页&nbsp;</span></div>
    </div>
</div>
<h1>{{startAndEndsum}}----当前页码{{pageNo}}</h1>
</div>

            
</template>

<script>
    export default {
        name:'Pagination',
        props:['pageNo','pageSize','total','continues'],
        computed:{
            //总共多少页
            totalPage(){
                //向上取整
                return Math.ceil(this.total/this.pageSize)
            },
            //计算出连续的页码的起始数字与结束数字
            startAndEndsum(){
                let {continues,totalPage,pageNo} = this
                //先定义两个变量存储起始结束数字
                let start = 0, end = 0
                //连续页码数字[至少5页]，不正常现象[总共页码不够或小于5页]
                //不正常现象
                if (continues > totalPage) {
                    start = 1
                    end = totalPage
                }else{
                //正常现象，[连续5页，但总页数一定大于5页] 
                    start = pageNo - parseInt(continues/2)
                    end = pageNo + parseInt(continues/2)  
                    //把出现不正常现象[start数字为0或负数]纠正
                    if (start < 1) {
                        start = 1
                        end = continues
                    }
                    //把不正常现象[end数字大于总页码] 纠正
                    if (end > totalPage) {
                        start = totalPage - continues + 1
                        end = totalPage
                    }
                }

                return {start,end}
            }
        }
    }
</script>

<style lang="less" scoped>
.page {
          width: 845px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 590px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;
                cursor: pointer;
                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  pointer-events: none;
                  a {
                    color: #999;
                    cursor:no-drop;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
</style>