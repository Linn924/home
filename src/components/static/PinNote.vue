<template>
    <!-- 钉住的便签模块 -->
    <div id="pinNote">
        <transition-group name="pinNoteItem">
            <div 
                class="pinNoteItem" 
                v-for="(item,index) in noteList"
                :key="item.id" 
                v-show="noteList[index].show">
                <div class="content">
                    <span>{{item.noteValue}}</span>
                    <span>{{item.noteTime}}</span>
                </div>
                <svg class="icon icon-close"
                    aria-hidden="true" @click="cancel(item.id)">
                    <use xlink:href="#icon-close"></use>
                </svg>
            </div>
        </transition-group>
    </div>
</template>

<script>
export default {
    name:'PinNote',
    props:{
        updateNote:{
            type:Function,
            required:true
        }
    },
    data(){
        return {
            noteList:[]
        }
    },
    created(){
        this.getNoteList()
    },
    methods:{
        //获取便签数据
        getNoteList(){
            let arr = JSON.parse(localStorage.getItem('noteList'))
            this.noteList = arr ? arr : []
        },
        //钉住的便签隐藏
        cancel(id){
            this.noteList.some(item => {
                if(item.id == id){
                    item.show = false
                    return true
                }
            })
            this.$message({message:'取消钉住便签成功',type:'success',duration:1000})
            localStorage.setItem('noteList',JSON.stringify(this.noteList))
            this.updateNote()
        },
    }
}
</script>

<style scoped lang="less">
@time:.3s;
#pinNote{
    position: absolute;
    top: 40px;
    left: 60px;
    .pinNoteItem{
        width: 250px;
        min-height: 55px;
        box-sizing: border-box;
        padding: 7px 20px;
        background-color: rgba(255, 255, 255, .8);
        border-radius: 5px;
        backdrop-filter: blur(30px);
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        cursor: pointer;
        overflow: hidden;
        margin-bottom: 20px;
        .content{
            display: flex;
            flex-direction: column;
            width: 180px;
            justify-content: space-between;
            span:last-child{
                color: #A9A9AA;
                font-size: 12px;
                margin-top: 10px;
            }
        }
        .icon-close{
            cursor: pointer;
            fill: currentColor;
            color: #000;
            transition: all @time;
            font-size: 14px;
            &:hover{color:#2468F2;}
        }
    }
}
.pinNoteItem-enter-active,
.pinNoteItem-leave-active
{transition: all @time;}

.pinNoteItem-enter,
.pinNoteItem-leave-to
{opacity: 0;}
</style>