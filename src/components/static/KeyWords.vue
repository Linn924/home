<template>
    <!-- 关键词模块 -->
    <transition name="keyWords">
        <div 
            id="keyWords" 
            v-if="searchList.length">
            <div 
                v-for="(item,index) in searchList" 
                @click="clickKeyWords(item.url)"
                :key="index">
                {{item.title}}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name:'KeyWords',
    props:{
        searchList:{
            type:Array,
            required:true
        },
        clickKeyWords:{
            type:Function,
            required:true
        }
    }
}
</script>

<style scoped lang="less">
@time:.5s;
#keyWords{
    position: absolute;
    top: 31vh;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    width: 560px;
    background-color:rgba(255, 255, 255, .2);
    backdrop-filter: blur(30px);
    list-style: none;
    border-radius: 15px;
    box-sizing: border-box;
    font-size: 14px;
    div{
        padding: 10px 20px;
        color: rgba(255, 255, 255, .8);
        transition: all @time;
        cursor: pointer;
        &:hover{background-color:rgba(255, 255, 255, .2);padding: 10px 25px;}
        &:first-child{border-radius: 15px 15px 0 0;}
        &:last-child{border-radius: 0 0 15px 15px;}
    }
}

#keyWords-enter-active,
#keyWords-leave-active
{transition: all @time;}

#keyWords-enter,
#keyWords-leave-to
{opacity: 0;}
</style>