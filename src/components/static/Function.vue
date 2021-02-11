<template>
    <!-- 功能模块 -->
    <div id="function" v-show="isFunction">
        <NavList 
            :isNavFoldList="isNavFoldList"
            :navOpenList="navOpenList"
            :navFoldList="navFoldList"
            :navFoldIndex="navFoldIndex"
            :openNavFoldList="openNavFoldList"
            :rightClickNav="rightClickNav"
            :openPostNavDialog="openPostNavDialog"
            :openWallpaper="openWallpaper">
        </NavList>
        <Note 
            :updatePinNote="updatePinNote" 
            :noteTime="noteTime" 
            ref="note">
        </Note>
    </div>
</template>

<script>
import NavList from './NavList'
import Note from './Note'
export default {
    name:'Function',
    components:{
        NavList,
        Note
    },
    props:{
        isFunction:{
            type:Boolean,
            required:true
        },
        updatePinNote:{
            type:Function,
            required:true
        },
        noteTime:{
            type:String,
            reuqired:true
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
    data(){
        return {
            navList:[],
            navFoldIndex:-1,
            isNavFoldList:true
        }
    },
    created(){
        this.getNav()
    },
    computed:{
        //未折叠的数据
        navOpenList(){
            let arr = []
            this.dealNavList(this.navList,20).forEach((item,index) => {
                let obj = {
                    id:index,
                    title:`页面${index + 1}`,
                    children:item
                }
                arr.push(obj)
            })
            return arr
        },
        //折叠的数据
        navFoldList(){
            let arr = JSON.parse(JSON.stringify(this.navOpenList))
            arr.forEach(item => item.children.splice(9,item.children.length-1))
            return arr
        }
    },
    methods:{
        //获取nav数据
        async getNav(){
            let uname = sessionStorage.getItem('uname')
            let uid = sessionStorage.getItem('uid')
            const {data:res} = await this.axios.get('websites',{params:{uname:uname,uid:uid}})
            if(res.code != 200) 
            return this.$message({message:`${res.tips}`,type:'error',duration:1200})
            this.navList = res.data
        },
        //处理数据
        dealNavList(arr,num){
            if(!arr instanceof Array){
                return false
            }
            let i = 0,newArr = []
            while(i < arr.length){
                let Arr = arr.slice(i,i+num)
                newArr.push(Arr)
                i += num
            }
            return newArr
        },
        //打开折叠的盒子
        openNavFoldList(id){
            this.navFoldIndex = id
            this.isNavFoldList = false
        },
        //折叠展开的盒子
        closeNavOpenList(){
            this.navFoldIndex = -1
            this.isNavFoldList = true
        },
        //更新note模块的数据
        updateNote(){
            this.$refs.note.getNoteList()
        }
    }
}
</script>

<style scoped lang="less">
@time:.5s;
#function{
    position: absolute;
    top: 20vh;
    left: 50%;
    width: 600px;
    transform: translateX(-50%);
    overflow: hidden;
    display: flex;
}  

#function-enter-active,
#function-leave-active
{transition: all @time;}

#function-enter,
#function-leave-to
{opacity: 0;}
</style>