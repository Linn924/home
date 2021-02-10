<template>
    <!-- 格言模块 -->
    <transition name="motto">
        <div id="motto" v-if="isMotto">
            <span>{{motto}}</span>
        </div>
    </transition>
</template>

<script>
export default {
    name:'Motto',
    props:{
        isMotto:{
            type:Boolean,
            reuqired:true
        },
        motto:{
            type:String,
            reuqired:true
        }
    }
}
</script>

<style scoped lang="less">
@time:.5s;
#motto{
    position: absolute;
    bottom: 12vh;
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span{
        display: block;
        color: #fff;
        font-size: 14px;
        cursor: default;
        pointer-events: none;
    }
    &:hover{
        transition: all @time;
        background-color:rgba(0, 0, 0, .5);
    }
}   

#motto-enter-active,
#motto-leave-active
{transition: all @time;}

#motto-enter,
#motto-leave-to
{opacity: 0;}
</style>