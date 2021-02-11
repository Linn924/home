<template>
    <!-- 操作导航模块 -->
    <div id="handel" v-show="isHandel">
        <div class="handelItem" @click="closeNavOpenList">
            <svg class="icon icon-zhedie" aria-hidden="true">
                <use xlink:href="#icon-zhedie"></use>
            </svg>
            <span>折叠</span>
        </div>
        <div class="handelItem" @click="openPutNavDialog">
            <svg class="icon icon-bianji" aria-hidden="true">
                <use xlink:href="#icon-bianji"></use>
            </svg>
            <span>编辑</span>
        </div>
        <div class="handelItem" @click="openDeleteNavDialog">
            <svg class="icon icon-shanchu" aria-hidden="true">
                <use xlink:href="#icon-shanchu"></use>
            </svg>
            <span>删除</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'Handel',
    props:{
        isHandel:{
            type:Boolean,
            reuqired:true
        },
        closeNavOpenList:{
            type:Function,
            required:true
        },
        openPutNavDialog:{
            type:Function,
            required:true
        },
        openDeleteNavDialog:{
            type:Function,
            required:true
        },
    }
}
</script>

<style scoped lang="less">
@time:.3s;
#handel{
    position: absolute;
    top: 0;
    left: 0;
    width: 130px;
    height: 80px;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
    color: #626262;
    transition: all @time;
    .handelItem{
        width: 100%;
        height: 40px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        padding: 0 20px;
        cursor: pointer;
        &:first-child{border-radius: 10px 10px 0 0;}
        &:last-child{border-radius: 0 0 10px 10px;}
        &:hover{background-color:rgba(192,192,192, .5);color: #2468F2;}
        span{margin-left: 10px;}
    }
    .icon-bianji,.icon-shanchu,.icon-zhedie{
        fill: currentColor;
        color: #6C6C6C;
    }
}    
</style>