<template>
    <!-- 便签模块 -->
    <div id="note">
        <div class="template">
            <!-- 便签列表 -->
            <transition name="noteList">
                <div class="noteList" v-show="isNoteList">
                    <div class="addNote" @click="addNote">
                        <span>+</span>
                        <span>新便签</span>
                    </div>
                    <div class="noteItem current" v-show="!noteList.length">
                        <span>{{noteValue}}</span>
                        <span>{{noteTime}}</span>
                    </div>
                    <div 
                        v-for="(item,index) in noteList"
                        :key="index" 
                        @click="clickNote(item)"
                        v-show="noteList.length"
                        :class="item.id == noteIndex? 'noteItem current':'noteItem'">
                        <span>{{noteIndex == item.id ? noteValue : item.noteValue}}</span>
                        <span>{{noteIndex == item.id ? noteTime : item.noteTime}}</span>
                    </div>
                </div>
            </transition>

            <!-- 文本域 -->
            <textarea
                placeholder="创建便签"
                @keyup="writeNote"
                @keyup.enter="flag?updateNote():saveNote()" 
                v-model="noteValue"
                :class="{textareaNarrow:isTextareaNarrow,textareaEnlarge:isTextareaEnlarge}" >
            </textarea>

            <!-- 操作按钮 -->
            <transition name="noteToolBar">
                <div class="noteToolBar" v-show="isNoteList"> 
                    <div title="删除" @click="deleteNote">
                        <svg class="icon icon-delete" aria-hidden="true">
                            <use xlink:href="#icon-delete"></use>
                        </svg>
                    </div>
                    <div title="钉住" @click="pinNote">
                        <svg class="icon icon-pin" aria-hidden="true">
                            <use xlink:href="#icon-pin"></use>
                        </svg>
                    </div>
                    <div title="保存" @click="flag?updateNote():saveNote()">
                        <svg class="icon icon-save" aria-hidden="true">
                            <use xlink:href="#icon-save"></use>
                        </svg>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    name:'Note',
    props:{
        noteTime:{
            type:String,
            reuqired:true
        },
        updatePinNote:{
            type:Function,
            required:true
        }
    },
    data(){
        return {
            noteValue:'',//便签内容
            noteIndex:-1,//记录点击的便签下标
            flag:false,//判断有没有更新便签
            noteList:[],//便签数据
            isNoteList:false,//便签列表 显示or隐藏
            isTextareaNarrow:false,//文本域缩小动画 加载or不加载
            isTextareaEnlarge:false//文本域放大动画 加载or不加载
        }
    },
    created(){
        this.getNoteList()
    },
    watch:{
        //监听是否修改便签数据
        noteValue(value){
            if(this.noteList.length && this.noteIndex !== -1){
                for(let item of this.noteList){
                    if(item.id == this.noteIndex){
                        this.flag = item.noteValue != value
                    }
                }
            }else{
                this.noteIndex = -1
            }
        },
        //监听便签数据
        noteList(value){
            if(!value.length){
                this.isNoteList = false
                this.isTextareaNarrow = false
                this.isTextareaEnlarge = true
            }
        }
    },
    methods:{
        //获取便签
        getNoteList(){
            let arr = JSON.parse(localStorage.getItem('noteList'))
            this.noteList = arr ? arr : []
            if(this.noteList.length){
                this.isNoteList = true
                this.isTextareaNarrow = true
                this.isTextareaEnlarge = false
            }
        }, 
        //编写便签
        writeNote(){
            this.isNoteList = true
            this.isTextareaNarrow = true
            this.isTextareaEnlarge = false
            if(!this.noteValue && !this.noteList.length){
                this.isNoteList = false
                this.isTextareaNarrow = false
                this.isTextareaEnlarge = true
            }
        },
        //添加便签
        addNote(){
            this.noteIndex = -1
            this.noteValue = ''
        },
        //保存便签
        saveNote(){
            if(!this.noteValue.trim()) 
            return this.$message({message:'请输入内容',type:'error',duration:1000})
            if(this.noteList.length > 5) {
                this.noteValue = ''
                return this.$message({message:'添加那么多便签能完成吗？',type:'error',duration:1200})
            }
            let id = this.noteList.length ? Math.max(...this.noteList.map(item => item.id)) + 1 : 1
            let obj = {
                id:id,
                show:false,
                noteValue:this.noteValue,
                noteTime:this.noteTime
            }
            this.noteList.push(obj)
            this.noteValue = ''
            localStorage.setItem('noteList',JSON.stringify(this.noteList))
            this.$message({message:'添加便签成功',type:'success',duration:1000})
            this.getNoteList()
        },
        //更新便签
        updateNote(){
            this.noteList.some(item => {
                if(item.id == this.noteIndex){
                    item.noteValue = this.noteValue
                    item.noteTime = this.noteTime
                    return true
                }
            })
            localStorage.setItem('noteList',JSON.stringify(this.noteList))
            this.$message({message:'修改便签成功',type:'success',duration:1200})
            this.noteIndex = -1
            this.flag = false
            this.noteValue = ''
            this.getNoteList()
            this.updatePinNote()
        },
        //删除便签
        deleteNote(){
            if(this.noteIndex == -1) 
            return this.$message({message:'请选中要删除的便签',type:'error',duration:1200})
            let arr = this.noteList.filter(item => item.id != this.noteIndex)
            if(!arr.length) localStorage.clear()
            else localStorage.setItem('noteList',JSON.stringify(arr))
            this.$message({message:'删除便签成功',type:'success',duration:1200})
            this.noteValue = ''
            this.noteIndex = -1
            this.getNoteList()
            this.updatePinNote()
        },
        //点击便签添加样式
        clickNote(data){
            this.noteIndex = data.id
            this.noteValue = data.noteValue 
        },
        //钉住便签
        pinNote(){
            if(this.noteIndex == -1) 
            return this.$message({message:'请选中要钉住的便签',type:'error',duration:1000})
            for (let item of this.noteList){
                if(item.id == this.noteIndex){
                    item.show = true
                }
            }
            this.$message({message:'钉住便签成功',type:'success',duration:1200})
            localStorage.setItem('noteList',JSON.stringify(this.noteList))
            this.noteValue = ''
            this.noteIndex = -1
            this.updatePinNote()
        }
    }
}
</script>

<style scoped lang="less">
@time:.3s;
#note{
    margin-left: 20px;
    min-width: 600px;
    border-radius: 15px;
    transition: all @time;
    display: flex;
    .template{
        position: relative;
        height: 500px;
        border-radius: 15px;
    }
}
.noteList{
    position: absolute;
    top:0;
    width: 190px;
    height: 450px;
    margin-right: 10px;
    border-radius: 15px;
    backdrop-filter: blur(30px);
    .addNote{
        box-sizing: border-box;
        color: #fff;
        font-size: 14px;
        border-radius: 15px 15px 0 0;
        padding: 10px 20px;
        span:last-child{margin-left: 5px;}
        &:hover{background-color:rgba(192,192,192, .5);}
    }
    .noteItem{
        box-sizing: border-box;
        min-height: 60px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 12px;
        padding: 10px 20px;
        color: #fff;
        cursor: pointer;
        transition: all @time;
        span{pointer-events: none;}
        span:last-child{margin-top: 10px;}
        &:hover{background-color:rgba(192,192,192, .5);}
    }
}
textarea{
    box-sizing: border-box;
    position: absolute;
    top:0;
    width: 600px;
    height: 450px;
    backdrop-filter: blur(30px);
    background-color: rgba(255,255,255,.6);
    border-radius: 15px;
    padding: 20px;
    resize: none;
    outline: none;
    border: none;
    font-size: 14px;
    color: black;
}
.noteToolBar{
    position: absolute;
    bottom: 10px;
    left: 220px;
    display: flex;
    >div:not(:first-child):not(:last-child){margin: 0 10px;}
    .icon-delete,.icon-pin,.icon-save{
        cursor: pointer;
        fill: currentColor;
        color:#C0C4CA;
        transition: all @time;
        &:hover{color:rgba(255, 255, 255);}
    }
}
    
.current{border-left: 4px #70C000 solid!important;}

.textareaEnlarge{animation: textareaEnlarge @time ease forwards;}
.textareaNarrow{animation: textareaNarrow @time ease forwards;}
@keyframes textareaEnlarge{
    from{width: 400px;left: 200px;}
    to{width: 600px;left: 0;}
}
@keyframes textareaNarrow{
    from{width: 600px;left: 0;}
    to{width: 400px;left: 200px;}
}
@keyframes noteListShow{from{left: -190px;}to{left: 0;}}
@keyframes noteListHide{from{left: 0;}to{left: -190px;}}     

.noteList-enter-active,
.noteList-leave-active,
.noteToolBar-enter-active,
.noteToolBar-leave-active
{transition: all @time;}

.noteToolBar-enter,
.noteToolBar-leave-to{
    opacity: 0;
}
.noteList-enter{
    animation: noteListShow @time ease forwards;
    opacity: 0;
}
.noteList-leave-to{
    animation: noteListHide @time ease forwards;
    opacity: 0;
}  
</style>