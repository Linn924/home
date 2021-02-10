<template>
    <!-- 搜索引擎模块 --> 
    <transition name="searchOpt">
        <div id="searchOpt" v-if="isSearchOpt">
            <span 
                v-for="(item,index) in browserIcons" 
                :key="index" @click="clickIcon(index)"
                :class="browserIndex == index ? 'current':''">
                <svg class="icon" aria-hidden="true">
                    <use :xlink:href="item.className"></use>
                </svg>
            </span>
        </div>
    </transition>
</template>

<script>
export default {
    name:'SearchOpt',
    props:{
        isSearchOpt:{
            type:Boolean,
            required:true
        },
        browserIndex:{
            type:Number,
            required:true
        },
        browserIcons:{
            type:Array,
            required:true
        },
        clickIcon:{
            type:Function,
            required:true
        }
    }
}
</script>

<style scoped lang="less">
@time:.5s;
#searchOpt{
    position: absolute;
    top: 26vh;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    span{
        display: inline-block;
        padding: 8px 30px;
        background-color:rgba(255,255,255, .2);
        border-radius: 20px;
        transition: all @time;
        cursor: pointer;
        font-size: 12px;
        color: #fff;
        text-align: center;
        &:not(:first-child):not(:last-child){margin: 0 10px;}
        svg{pointer-events: none;}
        z-index: 999;
    }
}    

.current{background-color:rgba(255,255,255, .4)!important;}

#searchOpt-enter-active,
#searchOpt-leave-active
{transition: all @time;}

#searchOpt-enter,
#searchOpt-leave-to
{opacity: 0;}
</style>