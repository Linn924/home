<template>
     <!-- 设置模块 -->
    <transition name="setting">
        <div id="setting" v-if="isSetting">
            <div class="icons">
                <div title="用户" @click="clickUserIcon">
                    <svg class="iconBig icon-user" aria-hidden="true">
                        <use xlink:href="#icon-user"></use>
                    </svg>
                </div>
                <div title="设置" @click="clickSetIcon">
                    <svg class="iconBig icon-set" aria-hidden="true">
                        <use xlink:href="#icon-set"></use>
                    </svg>
                </div>
            </div>
            <transition name="userModule">
                <div class="userModule" v-show="isUserModule">
                    <div class="userLogin" v-if="token">
                        <span>欢迎您，{{uname}}</span>
                        <span @click="logout">退出登录</span>
                    </div>
                    <div class="userUnLogin" v-else>
                        <router-link to="/login">账号登录</router-link>
                        <router-link to="/register">账号注册</router-link>
                    </div>
                </div>
            </transition>
            <transition name="setModule">
                <div class="setModule" v-show="isSetModule">
                    <span>暂无</span>
                </div>
            </transition>
        </div>
    </transition>
</template>

<script>
export default {
    name:'Setting',
    inject:['reload'],
    props:{
        isSetting:{
            type:Boolean,
            required:true
        },
        isUserModule:{
            type:Boolean,
            required:true
        },
        isSetModule:{
            type:Boolean,
            required:true
        },
        clickUserIcon:{
            type:Function,
            required:true
        },
        clickSetIcon:{
            type:Function,
            required:true
        }
    },
    data(){
        return {
            token:'',
            uname:''
        }
    },
    created(){
        this.token = sessionStorage.getItem('token')
        this.uname = sessionStorage.getItem('uname')
    },
    methods:{
        //登出
        logout(){
            sessionStorage.clear()
            this.$message({message:'登出成功',type:'success',duration:1200})
            this.reload()
        },
    }
}
</script>

<style scoped lang="less">
@time:.3s;
#setting{
    position: absolute;
    top: 30px;
    right: 50px; 
    .icons{
        width: 65px;
        display: flex;
        justify-content: space-between;
        .icon-user,.icon-set{
            cursor: pointer;
            fill: currentColor;
            color:#9D9D9F;
            transition: all @time;
            &:hover{color:rgba(255, 255, 255);}
        }
    }
    .userModule{
        position: absolute;
        top: 30px;
        right: 40px;
        width: 120px;
        background-color: rgba(255, 255, 255);
        display: flex;
        flex-direction: column;
        color:#7B7B7B;
        font-size: 12px;
        border-radius: 8px;
        box-sizing: border-box;
        .userLogin{
            display: flex;
            flex-direction: column;
            span{
                display: block;
                padding: 10px 10px;
                transition: all @time;
                cursor: pointer;
                &:first-child{border-radius: 8px 8px 0 0;}
                &:last-child{border-radius: 0 0 8px 8px;}
                &:hover{background-color:rgba(192,192,192, .5);color: #2468F2; }
            }
        }
        .userUnLogin{
            display: flex;
            flex-direction: column;
            a{
                padding: 10px 10px;
                color: #7B7B7B;
                &:first-child:hover{
                    background-color:rgba(192,192,192, .5);
                    border-radius: 8px 8px 0 0;
                    color: #2468F2; 
                }
                &:last-child:hover{
                    background-color:rgba(192,192,192, .5);
                    border-radius: 0 0 8px 8px;
                    color: #2468F2; 
                }
            }
        }
    }
    .setModule{
        position: absolute;
        top: 30px;
        right: 0;
        width: 160px;
        background-color: rgba(255, 255, 255);
        display: flex;
        flex-direction: column;
        color:#7B7B7B;
        font-size: 12px;
        border-radius: 8px;
        box-sizing: border-box;
        span{
            display: block;
            padding: 10px 10px;
            transition: all @time;
            cursor: pointer;
            &:first-child{border-radius: 8px 8px 0 0;}
            &:last-child{border-radius: 0 0 8px 8px;}
            &:hover{background-color:rgba(192,192,192, .5);color: #2468F2;}
        }
    }
}   

#setting-enter-active,
#setting-leave-active,
.userModule-enter-active,
.userModule-leave-active,
.setModule-enter-active,
.setModule-leave-active
{transition: all @time;}

#setting-enter,
#setting-leave-to,
.userModule-enter,
.userModule-leave-to,
.setModule-enter,
.setModule-leave-to
{opacity: 0;}
</style>