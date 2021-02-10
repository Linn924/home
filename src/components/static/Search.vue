<template>
    <!-- 搜索框模块 -->
    <transition name="search">
        <div 
            id="search" 
            v-show="isSearch"
            @mouseover="enlarge" 
            @mouseout="narrow">
            <input 
                type="text" 
                placeholder="search" 
                @keyup="search($event,value)"
                v-model="value" 
                @click="clickInput"
                :class="{enlarge:isEnlarge,narrow:isNarrow,bgColor:isBgColor}"
                :style="{background:flagInput?'#FFF':'rgba(255,255,255,.2)'}" />
        </div>
    </transition>
</template>

<script>
export default {
    name:'Search',
    props:{
        isSearch:{
            type:Boolean,
            required:true
        },
        isBgColor:{
            type:Boolean,
            required:true
        },
        isEnlarge:{
            type:Boolean,
            required:true
        },
        isNarrow:{
            type:Boolean,
            required:true
        },
        flagInput:{
            type:Boolean,
            required:true
        },
        enlarge:{
            type:Function,
            required:true
        },
        narrow:{
            type:Function,
            required:true
        },
        search:{
            type:Function,
            required:true
        },
        clickInput:{
            type:Function,
            required:true
        }
    },
    data(){
        return {
            value:''
        }
    },
    methods:{
        empty(){
            this.value = ''
        }
    }
}
</script>

<style scoped lang="less">
@time:.5s;
#search{
    position: absolute;
    top: 20vh;
    left: 50%;
    transform: translateX(-50%);
    input{
        width: 270px;
        height: 40px;
        outline: none;
        border: none;
        cursor: text;
        border-radius: 20px;
        text-align: center;
        background: none;
        backdrop-filter: blur(30px);
        box-shadow: 0 0 15px rgba(0, 0, 0, .2);
        transition: all @time;
        &::placeholder{color:rgba(255,255,255,.8);}
    }
}

.bgColor:hover{
    background: rgba(255, 255, 255, .5)!important;
    &::placeholder{color:rgba(0,0,0,.5)!important;}
}
.enlarge{animation: enlarge .15s ease forwards;}
.narrow{animation: narrow .15s ease forwards;}
@keyframes enlarge{from{width: 270px;}to{width: 550px;}}
@keyframes narrow{from{width: 550px;}to{width: 270px;}}

#search-enter-active,
#search-leave-active
{transition: all @time;}

#search-enter,
#search-leave-to
{opacity: 0;}
</style>