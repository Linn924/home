<template>
    <!-- 圆点切换模块 -->
    <transition name="dot">
        <div 
            id="dot" 
            v-if="isDot" 
            @click="clickDot($event)">
            <span 
                :class="dotIndex == 0 ?'current':''" 
                data-id = "0">
            </span>
            <span 
                :class="dotIndex == 1 ?'current':''" 
                data-id = "1">
            </span>
        </div>
    </transition>
</template>

<script>
export default {
    name:'Dot',
    props:{
        isDot:{
            type:Boolean,
            required:true
        },
        dotIndex:{
            type:Number,
            required:true
        },
        clickDot:{
            type:Function,
            required:true
        }
    }
}
</script>

<style scoped lang="less">
@time:.3s;
#dot{
    position: absolute;
    bottom: 15vh;
    left: 50%;
    transform: translateX(-50%);
    width: 45px;
    display: flex;
    justify-content: space-between;
    span{
        display: block;
        width: 20px;
        height: 4px;
        border-radius: 2px;
        background-color:#9D9D9F;
        cursor: pointer;
        transition: all @time;
        &:hover{background-color: #fff;}
    }
}

.current{background-color: #fff!important;}

#dot-enter-active,
#dot-leave-active
{transition: all @time;}

#dot-enter,
#dot-leave-to
{opacity: 0;}
</style>