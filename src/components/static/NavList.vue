<template>
    <div id="navList">
        <!-- 折叠状态 -->
        <div class="navFoldList" v-show="isNavFoldList">
            <div class="navFold" 
                v-for="(item,index) in navFoldList" 
                :key="index" 
                @click="openNavFoldList(index)">
                <div class="navItemBox">
                    <div class="navItem" 
                        v-for="i in item.children" :key="i.id">
                        <svg class="iconSmall" aria-hidden="true" v-if="i.className">
                            <use :xlink:href="i.className"></use>
                        </svg>
                        <img :src="i.logo" v-else>
                    </div>
                </div>
                <span>{{item.title}}</span>
            </div>

            <div class="navOpen" @click="openWallpaper">
                <div class="navItem">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-wallpaper"></use>
                    </svg>
                </div>
                <span>壁纸</span>
            </div>

            <div class="navOpen" @click="openPostNavDialog">
                <div class="navItem">
                    <svg class="icon icon-add" aria-hidden="true">
                        <use xlink:href="#icon-add"></use>
                    </svg>
                </div>
            </div>
        </div>
        
        <!-- 展开状态 -->
        <div class="navOpenList" 
            v-for="(item,index) in navOpenList" 
            :key="index"
            v-show="index == navFoldIndex">
            <div class="navOpen" v-for="i in item.children"
                :key="i.id" @click="open(i.url)"
                @contextmenu.prevent="rightClickNav(i,$event)">
                <div class="navItem">
                    <svg class="iconBig" aria-hidden="true" v-if="i.className">
                        <use :xlink:href="i.className"></use>
                    </svg>
                    <img :src="i.logo" v-else>
                </div>
                <span>{{i.title}}</span>
            </div>
        </div>
        
    </div>
    
</template>

<script>
export default {
    name:'NavList',
    props:{
        isNavFoldList:{
            type:Boolean,
            required:true
        },
        navOpenList:{
            type:Array,
            required:true
        },
        navFoldList:{
            type:Array,
            required:true
        },
        navFoldIndex:{
            type:Number,
            required:true
        },
        openNavFoldList:{
            type:Function,
            required:true
        },
        rightClickNav:{
            type:Function,
            required:true
        },
        openPostNavDialog:{
            type:Function,
            required:true
        },
        openWallpaper:{
            type:Function,
            required:true
        }
    },
    methods:{
        open(url){
            window.open(url)
        }
    }
}
</script>

<style scoped lang="less">
@time:.8s;
#navList{
    min-width: 600px;
    max-height: 500px;
    .navFoldList,.navOpenList{
        width: inherit;
        height: inherit;
        display: grid;
        grid-template-columns: repeat(5,1fr);
        grid-template-rows: repeat(4,1fr);
        gap: 20px 50px;
        overflow: hidden;   
    }
    .navFold{
        width: 80px;
        height: 100px; 
        box-sizing: border-box;
        padding: 2px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transition: all @time;
        &:hover .navItemBox{background-color: rgba(255,255,255, .8);}
        .navItemBox{
            width: 80px;
            height: 80px; 
            backdrop-filter: blur(10px);
            border-radius: 10px;
            background-color:rgba(231,231,230,.5);
            display: grid;
            gap: 1px;
            grid-template-columns: repeat(3,1fr);
            grid-template-rows: repeat(3,1fr);
            place-items: center center;
            transition: all @time;
            .navItem{
                pointer-events: none;
                border-radius: 4px;
                padding: 0 2px;
                box-sizing: border-box;
                transition: all @time;
                img{
                    width: 1.5em;
                    height: 1.5em;
                    border-radius: 50%;
                }
            }
        }
        span{
            color: #fff;
            font-size: 10px;
            margin-top: 5px;
            pointer-events: none;
        }
    }
    .navOpen{
        width: 80px;
        height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        cursor: pointer;
        &:hover .navItem{background-color: rgba(255,255,255, .8);}
        .navItem{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            background-color: rgba(255,255,255, .5);
            backdrop-filter: blur(30px);
            border-radius: 10px;
            pointer-events: none;
            transition: all @time;
            img{
                width: 1.5em;
                height: 1.5em;
                border-radius: 50%;
            }
        }
        span{
            color: #fff;
            font-size: 10px;
            margin-top: 5px;
            pointer-events: none;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
}
</style>