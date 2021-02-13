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
            <a href="http://www.linncode.cn" target="_blank">© 2021 LinnCooper</a>
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
        time:{
          type:String,
          required:true
        },
        defaultImg:{
          type:String,
          required:true
        },
        clickTime:{
          type:Function,
          required:true
        }
    }
}
</script>

<style scoped lang="less">
@time:.3s;
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
        font-size: 40px;
        font-family: Helvetica, Tahoma, Arial;
        font-weight: 400;
        cursor: pointer;
        transition:all @time;
        &:hover{color: #2468F2;}
    }
    footer{
        position: absolute;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            cursor: pointer;
            color:#fff;
        }
    }
}
</style>