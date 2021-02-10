<template>
    <!-- 初始模块 -->
    <div id="init">
        <img 
          :src="defaultImg" 
          :style="{transform:flag?'scale(1.1)':'scale(1)'}">
        <div 
          class="mask" 
          :style="{'backgroundColor':flag?'rgba(0,0,0,.5)':''}">
        </div>
        <h1 @click="clickTime">{{time}}</h1>
        <footer>
            <span>© 2021 LinnCooper</span>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'Init',
    props:{
        flag:{
          type:Boolean,
          required:true
        },
        clickTime:{
          type:Function,
          required:true
        },
        time:{
          type:String,
          required:true
        },
        defaultImg:{
          type:String,
          required:true
        }
    }
}
</script>

<style scoped lang="less">
@time:.25s;
#init{
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    user-select:none;
    img{
        width: inherit;
        height: inherit;
        object-fit: cover;
        position: absolute;
        transition:all @time;
    }
    .mask{
        position: relative; 
        height: inherit;
        transition:all @time;
        background-image: radial-gradient(rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%),
                          radial-gradient(rgba(0,0,0,0) 33%,rgba(0,0,0,0.3) 166%);
    }
    h1{
        position: absolute;
        top: 12vh;
        left: 50%;
        transform: translateX(-50%);
        color: #FAFBFC;
        font-size: 36px;
        font-weight: 400;
        cursor: pointer;
        transition:all .15s;
        &:hover{font-size: 40px;}
    }
    footer{
        position: absolute;
        bottom: 1vh;
        left: 50%;
        transform: translateX(-50%);
        color:#B1B1B2;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition:all .15s;
        span{
            cursor: pointer;
            color: #fff;
        }
    }
}
</style>