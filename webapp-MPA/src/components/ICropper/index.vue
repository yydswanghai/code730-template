<template>
    <div class="upload-container">
        <span>打开相册，选择一张图片，裁剪图片</span>
        <label for="inputImage" class="upload">
            <input id="inputImage" type="file" accept="image/*" class="upload-hide" @change="uploadChange" />
            <button>打开</button>
        </label>
    </div>
    <!-- 主要 -->
    <div class="cropper-container" :class="{ show : show }" >
        <SwiperProvider style="height: 100%;">
            <SwiperSlide style="height: 405px;">
                <!-- 图片 -->
                <div class="image-container">
                    <img ref="imageRef" id="image" />
                </div>
            </SwiperSlide>
            <SwiperSlide style="height: 444px;">
                <!-- 操作栏 -->
                <div class="oper-container">
                    <div class="tip" style="font-size: 16px;height: 30px;line-height: 30px;">角度、step的值可以修改</div>
                    <div class="items">
                        <label>
                            <span>角度</span>
                            <input type="text" v-model="rotate" @blur="RotateBlur">
                        </label>
                        <label>
                            <span>width</span>
                            <input type="text" v-model="width" readonly>
                        </label>
                        <label>
                            <span>height</span>
                            <input type="text" v-model="height" readonly>
                        </label>
                        <label>
                            <span>step</span>
                            <input type="text" v-model="step" readonly>
                        </label>
                        <label>
                            <span>x</span>
                            <input type="text" v-model="left" readonly>
                        </label>
                        <label>
                            <span>y</span>
                            <input type="text" v-model="top" @blur="StepBlur">
                        </label>
                    </div>
                    <div class="items">
                        <button @click="handleRatio(16/9)">16:9</button>
                        <button @click="handleRatio(4/3)">4:3</button>
                        <button @click="handleRatio(1)">1:1</button>
                        <button @click="handleRatio(2/3)">2:3</button>
                    </div>
                    <div class="items">
                        <button @click="handleMove('left')">左</button>
                        <button @click="handleMove('right')">右</button>
                        <button @click="handleMove('up')">上</button>
                        <button @click="handleMove('down')">下</button>
                    </div>
                    <div class="items">
                        <button @click="handleRotate('left')">逆时钟旋转</button>
                        <button @click="handleRotate('right')">顺时钟旋转</button>
                    </div>
                    <div class="items">
                        <button @click="handleScale('scaleX')">x轴翻转</button>
                        <button @click="handleScale('scaleY')">y轴翻转</button>
                    </div>
                    <div class="items">
                        <button @click="handleZoom('narrow')">缩小</button>
                        <button @click="handleZoom('enlarge')">放大</button>
                        <button @click="handleReset">复原</button>
                        <button @click="handleDownload">下载</button>
                    </div>
                    <div class="items">
                        <button @click="handleBack">返回</button>
                        <button @click="handleSend">确定</button>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide style="height: 225px;">
                <!-- 预览 -->
                <div class="preview-container">
                    <div class="preview-image"></div>
                </div>
            </SwiperSlide>
            <SwiperSlide style="height: 50px;" />
        </SwiperProvider>
    </div>
    <!-- 下载弹窗 -->
    <div class="modal" v-show="showModal">
        <div class="modal-dialog">
            <div class="modal-header">
                <h3>Cropped</h3>
            </div>
            <div class="modal-body" ref="modalBodyRef"></div>
            <div class="modal-footer">
                <button @click="showModal = false;">关闭</button>
                <a :href="downloadHref" download="cropped.jpg">下载</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, reactive, toRefs } from "vue"
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'

export default defineComponent({
    name: 'ICopper',
    components: {
        SwiperProvider,
        SwiperSlide,
    },
    emits: ['get-data'],
    setup(props, ctx){
        const imageRef = ref<HTMLImageElement | null>(null);// 图片dom
        const cropper = ref<Cropper | null>(null);// 容器对象
        const show = ref(false);// 是否显示裁剪操作页面
        const showModal = ref(false);// 是否显示下载弹窗
        const modalBodyRef = ref<HTMLElement | null>(null);// 弹窗cvs容器
        const downloadHref = ref('');// <a> href
        const state = reactive({
            left: 0,// 底图的left
            top: 0,// 底图的top
            width: 0,// 底图的width
            height: 0,// 底图的height
            step: 10,// 移动一次的距离
            rotate: 0,// 旋转角度
            scaleX: 0,// 以x轴为中心轴翻转
            scaleY: 0,// 以y轴为中心轴翻转
            scale: {// 用于切换翻转状态
                x: 1,
                y: 1
            },
            zoom: 0,// 缩放
        });
        onMounted(() => {
            /* 初始化 cropper */
            changeCropper(imageRef.value);
        });
        function changeCropper(element: any, options: Cropper.Options = {}) {
            cropper.value = new Cropper(element, Object.assign({
                preview: '.preview-image',// 预览
                aspectRatio: 1,// 纵横比
                ready(){
                    const canvasData = cropper.value?.getCanvasData();
                    if(canvasData){
                        state.left = canvasData.left;
                        state.top = canvasData.top;
                        state.width = canvasData.width;
                        state.height = canvasData.height;
                    }
                }
            }, options));
        }
        function uploadChange(e: any) {
            show.value = true;
            const file = e.target.files[0];// 源文件
            const reader = new FileReader();
            reader.readAsDataURL(file);// 读取图片文件
            reader.onload = function (ev: any) {// 文件读取完成后，会触发一个 load 事件
                // 图片文件读取完成，我们要进行裁剪
                cropper.value?.replace(ev.target.result);
            }
        }
        /* 确定 */
        function handleSend() {
            if(!cropper.value) return;
            const src = cropper.value.getCroppedCanvas().toDataURL('image/jpeg', 0.9);
            ctx.emit('get-data', src);
            show.value = false;
        }
        /* 返回 */
        function handleBack() {
            if(!cropper.value) return;
            cropper.value.clear();
            cropper.value.reset();
            show.value = false;
        }
        /* 复原 */
        function handleReset() {
            if(!cropper.value) return;
            cropper.value.reset();
        }
        /* 移动底照片 */
        function handleMove(direction: 'left' | 'right' | 'up' | 'down') {
            if(!cropper.value) return;
            if(direction === 'left'){
                cropper.value.move(-state.step, 0);
            }else if(direction === 'right'){
                cropper.value.move(state.step, 0);
            }else if(direction === 'up'){
                cropper.value.move(0, -state.step);
            }else if(direction === 'down'){
                cropper.value.move(0, state.step);
            }
            _updateMove();
        }
        function _updateMove() {
            if(!cropper.value) return;
            const { left, top } = cropper.value?.getCanvasData();
            state.left = left;
            state.top = top;
        }
        /* 设置裁剪框纵横比 */
        function handleRatio(ratio: number) {
            if(!cropper.value) return;
            cropper.value.setAspectRatio(ratio);
        }
        /* 旋转底照片 */
        function handleRotate(direction: 'left' | 'right') {
            if(!cropper.value) return;
            if(state.rotate == 360 || state.rotate == -360) state.rotate = 0;
            if(direction === 'left'){
                state.rotate -= 45;
            }else if(direction === 'right'){
                state.rotate = Number(state.rotate) + 45;
            }
            cropper.value.rotateTo(state.rotate);
        }
        function RotateBlur(e: any) {
            const val = Number(e.target.value);
            state.rotate = val;
            cropper.value?.rotateTo(val);
        }
        function StepBlur(e: any) {
            const val = Number(e.target.value);
            state.step = val;
        }
        /* 翻转底照片 */
        function handleScale(direction: 'scaleX' | 'scaleY') {
            if(!cropper.value) return;
            if(direction === 'scaleX'){
                state.scale.x = -state.scale.x
                cropper.value.scaleX(state.scale.x);
            }else{
                state.scale.y = -state.scale.y
                cropper.value.scaleY(state.scale.y);
            }
        }
        /* 缩放底照片 */
        function handleZoom(direction: 'narrow' | 'enlarge') {
            if(!cropper.value) return;
            if(direction === 'narrow'){// 缩小
                cropper.value.zoom(-0.1);
            }else{
                cropper.value.zoom(0.1);
            }
        }
        /* 下载弹窗 */
        function handleDownload() {
            if(!cropper.value) return;
            const cvs = cropper.value.getCroppedCanvas({ maxWidth: 4096, maxHeight: 4096 });
            cvs.style.width = "100%";
            if(modalBodyRef.value){
                modalBodyRef.value.innerHTML = '';
                modalBodyRef.value.appendChild(cvs);
                downloadHref.value = cvs.toDataURL('image/jpeg');
            }
            showModal.value = true;
        }
        return {
            ...toRefs(state),
            imageRef,
            show,
            showModal,
            modalBodyRef,
            downloadHref,
            uploadChange,
            handleSend,
            handleBack,
            handleReset,
            handleMove,
            handleRatio,
            handleRotate,
            RotateBlur,
            StepBlur,
            handleScale,
            handleZoom,
            handleDownload,
        }
    }
})
</script>
<style lang="scss" scoped>
.upload-container{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 24px 12px;
    box-sizing: border-box;
    span{
        font-size: 14px;
        margin-bottom: 5px;
    }
    .upload{
        position: relative;
        display: inline-block;
        z-index: 100;
        background-color: #007bff;
        border-color: #007bff;
        padding: 6px 12px;
        &:hover{
            background-color: #0069d9;
            border-color: #0062cc;
        }
        .upload-hide{
            width: 100%;
            height: 100%;
            opacity: 0;
            position: absolute;
            left: 0;
            top: 0;
        }
        button{
            background: 0;
            color: #fff;
        }
    }
}
.cropper-container{
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    background-color: #fff;
    display: none;
    &.show{
        display: block !important;
    }
    .image-container{
        width: 100%;
        height: 360px;
        max-width: 360px;
        max-height: 360px;
        border: 1px dashed #ccc;
        margin: 10px auto 40px;
        box-sizing: border-box;
        #image{
            display: block;
            max-width: 100%;/* 记得设置这个 */
        }
    }
    .oper-container{
        padding: 0 12px;
        width: 100%;
        box-sizing: border-box;
        .items{
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            margin-bottom: 10px;
        }
        button{
            margin-right: 10px;
            height: 44px;
            min-width: 60px;
            padding: 0 15px;
            font-size: 14px;
            background-color: #fff;
            border: 1px solid #ebedf0;
            &:active{
                background-color: #ebedf0;
            }
        }
        label{
            width: 30%;
            margin-right: 3%;
            height: 44px;
            font-size: 16px;
            display: flex;
            align-items: center;
            span{
                flex: 0 0 42px;
            }
            input{
                flex: 1 1 auto;
                width: 100%;
                height: 32px;
                border: 1px solid #999;
            }
            input[readonly]{
                border: none;
            }
        }
    }
    .preview-container{
        width: 100%;
        height: 200px;
        left: 0;
        bottom: 0;
        z-index: 100;
        box-sizing: border-box;
        margin-top: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
        .preview-image{
            width: 200px;
            height: 200px;
            overflow: hidden;
        }
    }
}
.modal{
    height: 100vh;
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 100;
    font-size: 16px;
    background-color: rgba(0,0,0,.5);
    .modal-dialog{
        width: 96%;
        margin: 20px auto 0;
        background: #fff;
        border-radius: 3px;
    }
    .modal-header{
        padding: 12px;
        border-bottom: 1px solid #dee2e6;
        h3{
            font-weight: 400;
        }
    }
    .modal-body{
        padding: 12px;
    }
    .modal-footer{
        padding: 12px;
        text-align: center;
        border-top: 1px solid #dee2e6;
        button, a{
            color: #fff;
            background-color: #6c757d;
            border-color: #6c757d;
            padding: 6px 12px;
            border-radius: 3px;
            margin-right: 5px;
        }
        a{
            background-color: #007bff;
            border-color: #007bff;
        }
    }
}
</style>