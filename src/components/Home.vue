<template>
    <div id="home">
        <Init 
            :flag="flag" 
            :time="time" 
            :defaultImg="defaultImg" 
            :clickTime="clickTime">
        </Init>
        <Search 
            ref="search"
            :isSearch="isSearch" 
            :isBgColor="isBgColor"
            :isEnlarge="isEnlarge" 
            :isNarrow="isNarrow"
            :flagInput="flagInput" 
            :enlarge="enlarge" 
            :narrow="narrow"
            :search="search" 
            :clickInput="clickInput">
        </Search>
        <SearchOpt 
            :isSearchOpt="isSearchOpt"
            :browserIndex="browserIndex" 
            :browserIcons="browserIcons" 
            :clickIcon="clickIcon">
        </SearchOpt>
        <KeyWords 
            :searchList="searchList" 
            :clickKeyWords="clickKeyWords">
        </KeyWords>
        <Motto 
            :isMotto="isMotto" 
            :motto="motto">
        </Motto>
        <Function 
            ref="function" 
            :isFunction="isFunction" 
            :noteTime="noteTime"
            :rightClickNav="rightClickNav" 
            :updatePinNote="updatePinNote" 
            :openPostNavDialog="openPostNavDialog"
            :openWallpaper="openWallpaper">
        </Function>
        <PinNote 
            ref="pinNote"
            :updateNote="updateNote">
        </PinNote>
        <Dot 
            :isDot="isDot" 
            :dotIndex="dotIndex" 
            :clickDot="clickDot">
        </Dot>
        <Setting 
            :isSetting="isSetting" 
            :isUserModule="isUserModule"
            :isSetModule="isSetModule" 
            :clickUserIcon="clickUserIcon"
            :clickSetIcon="clickSetIcon">
        </Setting>
        <Handel 
            :isHandel="isHandel" 
            :closeNavOpenList="closeNavOpenList"
            :openPutNavDialog="openPutNavDialog" 
            :openDeleteNavDialog="openDeleteNavDialog">
        </Handel>
        <Wallpaper 
            :isWallpaper="isWallpaper" 
            :isUploadImg="isUploadImg"
            :imgIndex="imgIndex" 
            :customImg="customImg" 
            :wallpaperList="wallpaperList"
            :uploadImg="uploadImg"
            :closeWallpaper="closeWallpaper" 
            :clickDefaultImg="clickDefaultImg" 
            :clickCustomImg="clickCustomImg">
        </Wallpaper>
        <Dialog title="添加自定义网站" cancelTxt="取消" confirmTxt="添加" 
            :mask="true" :visible="isPostDialog" @confirm="postNav"
            @cancel="isPostDialog = false">
            <div class="dialog-forms">
                <input type="text" placeholder="网站名称" v-model="postNavForm.title">
                <input type="text" placeholder="网站网址" v-model="postNavForm.url">
            </div>
        </Dialog>
        <Dialog title="编辑自定义网站" cancelTxt="取消" confirmTxt="修改" 
            :mask="true" :visible="isPutDialog" @confirm="putNav"
            @cancel="isPutDialog = false">
            <div class="dialog-forms">
                <input type="text" placeholder="网站名称" v-model="putNavForm.title">
                <input type="text" placeholder="网站网址" v-model="putNavForm.url">
            </div>
        </Dialog>
        <Dialog cancelTxt="取消" confirmTxt="删除" width="200px" height="70px"
            :mask="true" :visible="isDeleteDialog" @confirm="deleteNav"
            @cancel="isDeleteDialog = false">
        </Dialog>
        
    </div>
</template>

<script>
import Init from './static/Init'
import Search from './static/Search'
import SearchOpt from './static/SearchOpt'
import KeyWords from './static/KeyWords'
import Motto from './static/Motto'
import Function from './static/Function'
import PinNote from './static/PinNote'
import Dot from './static/Dot'
import Setting from './static/Setting'
import Handel from './static/Handel'
import Wallpaper from './static/Wallpaper'
import Dialog from './static/Dialog'

export default {
    name:'App',
    inject:['reload'],
    components:{
        Init,
        Search,
        SearchOpt,
        KeyWords,
        Motto,
        Function,
        PinNote,
        Dot,
        Setting,
        Handel,
        Wallpaper,
        Dialog
    },
    data(){
        return {
            //Home组件相关变量
            token:'',//用户token码
            uname:'',//用户昵称
            uid:0,//用户id
            isStack:false,//二级层叠 是or否
            backups:'',//备份用户上传的背景图片地址
            isDefaultNav:false,//不准操作默认的导航 修改or添加
            preLoadImgList:[//预加载图片数据
                'https://s3.ax1x.com/2021/02/02/ynl0PJ.jpg',
                'https://s3.ax1x.com/2021/02/04/y1r534.jpg',
                'http://127.0.0.1:8888/static/images/1.jpg',
                'http://127.0.0.1:8888/static/images/white.jpg'
            ],

            //Init组件相关变量
            flag:false,//遮罩和背景图片 放大or缩小
            time:'',//当前时间
            defaultImg:'http://127.0.0.1:8888/static/images/1.jpg',//默认壁纸
            flagTime:false,//时间 点击or未点击

            //Search组件相关变量
            isSearch:true,//搜索框 显示or隐藏
            isBgColor:true,//搜索框背景颜色 改变or不改变
            isEnlarge:false,//enlarge动画 添加or不添加
            isNarrow:false,//narrow动画 添加or不添加
            flagInput:false,//搜索框 点击or未点击

            //SearchOpt组件相关变量
            isSearchOpt:false,//搜索引擎图标 显示or隐藏
            browserIndex:0,//默认选择必应浏览器图标
            browserIcons:[//浏览器种类
                {className:'#icon-biying'},
                {className:'#icon-baidu'},
                {className:'#icon-guge'}
            ],
            searchEngines:[//搜索引擎
                {url:'https://cn.bing.com/search?q='},
                {url:'https://www.baidu.com/s?wd='},
                {url:'http://www.google.com/search?q='}
            ],
            keyWordsApi:[//关键词联想api
                {url:`http://api.bing.com/qsonhs.aspx?type=cb&cb=jsonpCB&q=`},
                {url:'http://suggestion.baidu.com/su?cb=jsonpCB&wd='},
                {url:'http://suggestqueries.google.com/complete/search?client=youtube&jsonp=jsonpCB&q='}
            ],

            //KeyWords组件相关变量
            searchList:[],//关键词联想数据

            //Motto组件相关变量
            isMotto:false,//格言 显示or隐藏
            motto:'',//格言内容

            //Function组件相关变量
            isFunction:false,//功能模块 显示or隐藏
            noteTime:'',//编写便签的时间

            //Dot组件相关变量
            isDot:false,//圆点切换 显示or隐藏
            dotIndex:0,//圆点下标
            
            //Setting组件相关变量
            isSetting:false,//设置 显示or隐藏
            isUserModule:false,//用户设置 显示or隐藏
            isSetModule:false,//其他设置 显示or隐藏

            //Handel组件相关变量
            isHandel:false,//操作nav模块

            //Wallpaper组件相关变量
            isWallpaper:false,//壁纸盒子 显示or隐藏
            isUploadImg:false,//上传了壁纸 是or否
            imgIndex:0,//记录壁纸的下标
            customImg:'',//自定义背景图片地址
            wallpaperList:[],//壁纸数据 

            //Dialog组件相关变量
            isPostDialog:false,//添加自定义导航 显示or隐藏
            isPutDialog:false,//修改自定义导航 显示or隐藏
            isDeleteDialog:false,//删除自定义导航 显示or隐藏
            postNavForm:{//添加自定义导航表单
                uid:0,
                uname:'',
                title:'',
                url:''
            },
            putNavForm:{//修改自定义导航表单
                id:0,
                uname:'',
                title:'',
                url:''
            },
            isUpdateNavForm:false,//修改导航表单 修改了or未修改
            copyPutNavForm:{},//拷贝一份修改自定义导航表单
            deleteIndex:-1//要删除的自定义导航下标    
        }
    },
    created(){
        this.getTime() 
        this.getMotto()
        this.token = sessionStorage.getItem('token')
        this.uname = sessionStorage.getItem('uname')
        this.uid = sessionStorage.getItem('uid')
        this.getWallpaper()
        this.preLoadImg(this.preLoadImgList)
    },
    mounted(){
        document.oncontextmenu =  () => {event.returnValue = false}
        setInterval(this.getTime,1000)
        window.jsonpCB = data => {
            this.searchList = []
            if(data instanceof Array){
                for(let i of data[1]){
                    let obj = {
                        title:i[0],
                        url:this.searchEngines[2].url + i[0]
                    }
                    this.searchList.push(obj)
                }
            }
            if(data instanceof Object){
                if(data.s){
                    for(let i of data.s){
                        let obj = {
                            title:i,
                            url:this.searchEngines[1].url + i
                        }
                        this.searchList.push(obj)
                    }
                }
                if(data.AS && data.AS.Results){
                     for(let i of data.AS.Results[0].Suggests){
                        let obj = {
                            title:i.Txt,
                            url:this.searchEngines[0].url + i.Txt
                        }
                        this.searchList.push(obj)
                    }
                }
            }
        } 
    },
    watch:{
        //监听点击搜索框 添加点击事件和移出点击事件
        flagInput(value){
            if(value){
                var timer = setTimeout(()=>{
                    document.addEventListener('click',this.addeventInput)
                },100)
            }else{
                clearTimeout(timer)
                document.removeEventListener('click',this.addeventInput)
            }
        },
        //监听点击时间 添加点击事件和移出点击事件
        flagTime(value){
            if(value){
                var timer = setTimeout(()=>{
                    document.addEventListener('click',this.addeventTime)
                },100)
            }else{
                clearTimeout(timer)
                document.removeEventListener('click',this.addeventTime)
            }
        },
        //深度监听修改后的自定义导航表单
        putNavForm:{
            handler(newVal){
                if(JSON.stringify(newVal) !== JSON.stringify(this.copyPutNavForm)){
                    this.isUpdateNavForm = true
                }else{
                    this.isUpdateNavForm = false
                }
            },
            deep: true
        }
    },
    methods:{
        // 预加载图片
        preLoadImg(arr){
            let imgList = []
            arr.forEach((item,index) => {
                imgList[index] = new Image()
                imgList[index].src = arr[index]
            })
        },
        //获取时间
        getTime(){
            const t = new Date()
            const y = t.getFullYear()
            const m = (t.getMonth() + 1 + '').padStart(2, '0')
            const d = (t.getDate() + '').padStart(2, '0')
            const hh = (t.getHours() + '').padStart(2, '0')
            const mm = (t.getMinutes() + '').padStart(2, '0')
            const ss = (t.getSeconds() + '').padStart(2, '0')
            this.time = `${hh}:${mm}`
            this.noteTime = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
        },
        //点击时间
        clickTime(){
            this.flag = true
            this.flagTime = true
            this.isSearch = false
            this.isEnlarge = false
            this.isNarrow = false
            this.isSearchOpt = false
            this.isMotto = false
            this.searchList = []
            this.isFunction = true
            this.isDot = true
            this.isSetting = true
        },
        //鼠标移入搜索框
        enlarge(){
            this.isEnlarge = true
            this.isNarrow = false
        },
        //鼠标移出搜索框
        narrow(){
            if(!this.flagInput){
                this.isEnlarge = false
                this.isNarrow = true
            }
        },
        //搜索事件
        search(e,value = ''){
            if(e.keyCode == 13){
                window.open(this.searchEngines[this.browserIndex].url + value)
                this.$refs.search.empty()
            }
            this.$jsonp(this.keyWordsApi[this.browserIndex].url + value).then(res => res) 
        },
        //点击搜索框
        clickInput(){
            this.flagInput = true
            this.flag = true
            this.isBgColor = false
            this.isSearchOpt = true
            this.isMotto = true
        },
        //搜索界面添加点击事件
        addeventInput(e){
            if(e.target.className === 'mask'){
                this.flag = false
                this.flagInput = false
                this.isEnlarge = false
                this.isNarrow = true
                this.isBgColor = true
                this.isSearchOpt = false
                this.browserIndex = 0
                this.isMotto = false
                this.searchList = []
                this.$refs.search.empty()
            }  
        },
        //功能界面添加点击事件
        addeventTime(e){
            if(e.target.className === 'mask' && !this.isStack){
                this.flag = false
                this.flagTime = false
                this.isSearch = true
                this.isEnlarge = false
                this.isNarrow = false
                this.isFunction = false
                this.isDot = false
                this.isSetting = false
            }else if(e.target.className === 'mask' && this.isStack){
                this.isSetModule = false
                this.isUserModule = false
                this.isHandel = false
                this.isDefaultNav = false
                this.isStack = false
            }
        },
        //点击浏览器图标切换搜索引擎
        clickIcon(id,value = ''){
            this.browserIndex = id
            if(!value){
                this.$jsonp(this.keyWordsApi[this.browserIndex].url + value).then(res => res)
            }
        },
        //打开网页
        clickKeyWords(url){
            window.open(url)
            this.$refs.search.empty()
            this.searchList = []
        },
        //获取格言警句
        async getMotto(){
            const {data:res} = await this.axios.get('https://v1.hitokoto.cn/?c=d&amp;c=i&amp;encode=json')
            if(res.hitokoto[res.hitokoto.length - 1] === '。'){
                this.motto ='/*  ' + res.hitokoto + '*/'
            }else{
                this.motto ='/*  ' + res.hitokoto + '  */'
            } 
        },
        //切换模块
        clickDot(e){
            this.dotIndex = e.target.dataset.id
            var fn = document.querySelector('#function')
            if(this.dotIndex == 1){
                fn.scrollTo({left:660,behavior:'smooth'})
            }else{
                fn.scrollTo({left:-660,behavior:'smooth'}) 
            }
        },
        //更新钉住的便签模块
        updatePinNote(){
            this.$refs.pinNote.getNoteList()
        },
        //更新便签模块
        updateNote(){
            this.$refs.function.updateNote()
        },
        //点击用户图标
        clickUserIcon(){
            this.isSetModule = false
            this.isUserModule = true
            this.isHandel = false
            this.isDefaultNav = false
            this.isStack = true
        },
        //点击其他设置图标
        clickSetIcon(){
            this.isSetModule = true
            this.isUserModule = false
            this.isHandel = false
            this.isDefaultNav = false
            this.isStack = true
        },
        //右击nav便于折叠删除及修改
        rightClickNav(data,e){
            this.isHandel = true
            this.isStack = true
            let handel = document.querySelector('#handel')
            handel.style.top = e.pageY + 'px'
            handel.style.left = e.pageX + 'px'
            if(data.className){
                this.isDefaultNav = true
            }else{
                this.isDefaultNav = false
                this.putNavForm.title = data.title
                this.putNavForm.url = data.url
                this.putNavForm.id = data.id
                this.copyPutNavForm = Object.assign({},this.putNavForm)
                this.deleteIndex = data.id
            }
        },
        //关闭展开的导航列表
        closeNavOpenList(){
            this.$refs.function.closeNavOpenList()
            this.isHandel = false
            this.isStack = false
        },
        //打开添加自定义导航对话框
        openPostNavDialog(){
            if(!this.token || !this.uname)
            return this.$message({message: '无法添加自定义网站，请登录',type: 'error',duration:1200})
            this.isPostDialog = true
        },
        //打开修改自定义导航对话框
        openPutNavDialog(e){
            this.isHandel = false
            this.isStack = false
            if(this.isDefaultNav){
                this.isDefaultNav = false
                return this.$message({type:'error',message:'无法修改默认网站',duration:1200})
            }
            this.isPutDialog = true
        },
        //打开删除自定义导航对话框
        openDeleteNavDialog(){
            this.isHandel = false
            this.isStack = false
            if(this.isDefaultNav){
                this.isDefaultNav = false
                return this.$message({type:'error',message:'无法删除默认网站',duration:1200})
            }
            this.isDeleteDialog = true
        },
        //添加自定义导航
        async postNav(){
            if(!this.postNavForm.title.trim() || !this.postNavForm.url.trim())
            return this.$message({message: '请输入内容',type: 'error',duration:1200})
            this.postNavForm.uid = this.uid
            this.postNavForm.uname = this.uname
            const {data:res} = await this.axios.post('websites',this.postNavForm)
            if(res.code != 200)
            return this.$message({message: `${res.tips}`,type: 'error',duration:1200})
            this.$message({message: `${res.tips}`,type: 'success',duration:1200})
            this.isPostDialog = false
            this.$refs.function.getNav()
        },
        //修改自定义导航
        async putNav(){
            if(!this.isUpdateNavForm)
            return this.$message({message: '未作出任何修改',type: 'error',duration:1200})
            if(!this.putNavForm.title.trim() || !this.putNavForm.url.trim())
            return this.$message({message: '请输入内容',type: 'error',duration:1200})
            this.putNavForm.uname = this.uname
            const {data:res} = await this.axios.put('websites',this.putNavForm)
            if(res.code != 200)
            return this.$message({message: `${res.tips}`,type: 'error',duration:1200})
            this.$message({message: `${res.tips}`,type: 'success',duration:1200})
            this.isUpdateNavForm = false
            this.isPutDialog = false
            this.$refs.function.getNav()
        },
        //删除自定义导航
        async deleteNav(){
            const {data:res} = await this.axios.delete('websites',{params:{id:this.deleteIndex,uname:this.uname}})
            if(res.code != 200)
            return this.$message({message: `${res.tips}`,type: 'error',duration:1200})
            this.$message({message: `${res.tips}`,type: 'success',duration:1200})
            this.isDeleteDialog = false
            this.$refs.function.getNav()
        },
        //打开壁纸盒子
        openWallpaper(){
            this.isWallpaper = true
            const imgs = document.querySelectorAll('#wallpaper .default img')
            for(let item of imgs){item.src = item.dataset.url}
        },
        //关闭壁纸盒子
        closeWallpaper(){
            this.isWallpaper = false
        },
        //获取壁纸数据
        async getWallpaper(){
            const {data:res} = await this.axios.get('wallpapers',{params:{uname:this.uname,uid:this.uid}})
            if(res.code != 200) 
            return this.$message({message:`${res.tips}`,type:'error',duration:1200})
            this.wallpaperList = res.data
            this.defaultImg = res.defaultImg ? res.defaultImg : 'http://127.0.0.1:8888/static/images/1.jpg'
            this.customImg = res.customImg ? res.customImg : 'http://127.0.0.1:8888/static/images/white.jpg'
            this.backups = res.customImg
            let flag = false
            flag = this.wallpaperList.some(item => {
                if(item.url == this.defaultImg){
                    this.imgIndex = item.id
                    return true
                }
            })
            if(!flag) this.imgIndex = 0
        },
        //上传文件
        async uploadImg(e){
            if(!this.token || !this.uname)
            return this.$message({message: '无法上传图片，请登录',type: 'error',duration:1200})
            let image = e.target.files[0] 
            let formData = new FormData() 
            formData.append('image', image) 
            formData.append('uname', this.uname) 
            formData.append('uid', this.uid) 
            formData.append('wallpaper', this.backups) 
            const {data:res} = await this.axios.post('wallpapers',formData)
            if(res.code != 200) 
            return this.$message({message: `${res.tips}`,type: 'error',duration:1200})
            this.$message({message: `${res.tips}`,type: 'success',duration:1200})
            this.getWallpaper()
            this.isUploadImg = true
            
        },
        //选择的图片下标
        clickDefaultImg(data){
            if(!this.token || !this.uname)
            return this.$message({message: '无法切换壁纸，请登录',type: 'error',duration:1200})
            this.imgIndex = data.id
            this.defaultImg = data.url
            this.updateWallpaper(data.url)
            
        },
        //点击切换自定义壁纸
        clickCustomImg(e){  
            if(this.token && this.customImg != 'http://127.0.0.1:8888/static/images/white.jpg'){
                this.imgIndex = 0
                this.defaultImg = e.target.src
                this.updateWallpaper(e.target.src)
            }
            
        },
        //更新背景图片
        async updateWallpaper(url){
            const {data:res} = await this.axios.put('wallpapers',{url:url,uname:this.uname,uid:this.uid})
            if(res.code != 200) 
            return this.$message({message:`${res.tips}`,type:'error',duration:1200})
            this.$message({message:`${res.tips}`,type:'success',duration:1200})
            this.getWallpaper()
        }
    }
}
</script>

<style lang="less">
.dialog-forms{
    width: inherit;
    margin: 30px 0 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    input{
        width: 465px;
        height: 35px;
        border: none;
        outline: none;
        border-radius: 4px;
        padding-left: 5px;
        font-size: 15px;
        color: #AAA;
        background-color: #F1F5F8;
        &:nth-child(2){margin: 10px 0;}
    }
}
</style>
