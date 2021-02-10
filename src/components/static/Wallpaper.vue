<template>
    <!-- 壁纸模块 -->
    <transition name="wallpaper">
        <div id="wallpaper" v-show="isWallpaper">
            <div class="wallpaperBox">
                <header>
                    <span>背景图片偏好</span>
                    <svg class="icon icon-close" aria-hidden="true"
                        @click="closeWallpaper">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </header>
                <section>
                    <div class="custom">
                        <span>自定义</span>
                        <div class="customBox">
                            <div :class="imgIndex == 0?'img image':'img'">
                                <img :src="customImg" @click="clickCustomImg($event)">
                            </div>
                            <div class="describe">
                                <span>将您喜爱的任意图像设为壁纸。</span>
                                <span>建议图像尺寸：1920×1080 或更高</span>
                                <div class="uploadBox">
                                    <input type="file" accept="image/*" @change="uploadImg" ref="uploadImg" 
                                        v-show="false"/>
                                    <button @click="$refs.uploadImg.click()">浏览...</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="default same">
                        <span>默认</span>
                        <div class="box">
                            <div :class="item.id == imgIndex ? 'img image' : 'img' "
                                v-for="item in wallpaperList" :key="item.id">
                                <img src="https://s1.ax1x.com/2020/10/13/0hyDFH.jpg" 
                                    :data-url="item.url" @click="clickDefaultImg(item)">
                            </div>
                        </div>
                    </div>
                    <div class="trends same">
                        <span>动态</span>
                        <div class="box">
                            <span>暂无</span>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name:'Wallpaper',
    props:{
        isWallpaper:{
            type:Boolean,
            required:true
        },
        isUploadImg:{
            type:String,
            required:true
        },
        imgIndex:{
            type:Number,
            required:true
        },
        customImg:{
            type:String,
            required:true
        },
        wallpaperList:{
            type:Array,
            required:true
        },
        closeWallpaper:{
            type:Function,
            required:true
        },
        uploadImg:{
            type:Function,
            required:true
        },
        clickDefaultImg:{
            type:Function,
            required:true
        },
        clickCustomImg:{
            type:Function,
            required:true
        }
    }
}
</script>

<style scoped lang="less">
@time:.15s;
#wallpaper{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .wallpaperBox{
        width: 600px;
        height: 500px;
        background-color: #fff;
        border-radius: 4px;
        box-sizing: border-box;
        padding: 40px 70px;
    }
}    
.wallpaperBox{
    header{
        font-size: 24px;
        display: flex;
        justify-content: space-between;
        .icon-close{
            font-size: 14px;
            fill: currentColor;
            color: #B4B4B4;
            cursor: pointer;
            transition: all @time;
            &:hover{color: #2468F2;}
        }
    }
    section{
        margin: 20px 0;
        width:100%;
        height: 350px;
        overflow: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar {width: 6px;}
        &::-webkit-scrollbar-thumb {background-color: rgb(177, 175, 175);border-radius: 4px;}
        &::-webkit-scrollbar-track{background-color: #F1F5F8;}
    }
}
.custom{
    display: flex;
    flex-direction: column;
    >span{
        font-size: 16px;
        color: #C3C3C3;
    }
    .customBox{
        width: 100%;
        display: flex;
        margin-top: 10px;
        .img{
            width: 135px;
            height: 90px;
            overflow: hidden;
            border-radius: 5px;
            position: relative;
            img{
                width: 100%;
                height: 100%;
                cursor: pointer;
                border-radius: 5px;
                transition: all @time;
                &:hover{transform: scale(1.1);}
                
            }
        }
        .describe{
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            span:nth-child(2){
                font-size: 14px;
                color: #C3C3C3;
                margin: 7px 0;
            }
            button{
                width: 105px;
                height: 35px;
                border-radius: 5px;
                color: #fff;
                background-color:#2468F2;
                border: none;
                outline: none;
                cursor: pointer;
                transition: all @time;
                &:hover{background-color: rgba(36,104,242, .5);}
            }
        }
    }
}
.same{
    display: flex;
    flex-direction: column;
    margin: 15px 0;
    >span{
        font-size: 16px;
        color: #C3C3C3;
    }
    .box{
        width: 100%;
        display: flex;
        margin-top: 10px;
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-template-rows: repeat(3,1fr);
        gap: 20px 10px;
        .img{
            width: 135px;
            height: 90px;
            overflow: hidden;
            border-radius: 5px;
            position: relative;
            img,video{
                width: 100%;
                height: 100%;
                cursor: pointer;
                border-radius: 5px;
                object-fit: cover;
                transition: all @time;
                &:hover{transform: scale(1.1);}
            }  
        }
    }
}
.trends{
    .box{
        grid-template-rows: 1fr;
    }
}
.image::after{
    content: '√';
    position: absolute;
    top: 0;
    left: 0;
    font-size: 24px;
    width: 135px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    background-color: rgba(0, 0, 0, .4);
}
</style>