<template>
    <SwiperProvider class="media">
        <SwiperSlide style="height: 360px;">
            <div class="operation">
                <div class="item">
                    <span>打开相册，选择一张图片</span>
                    <label for="inputImage" class="upload">
                        <input id="inputImage" type="file" accept="image/*" class="upload-hide" />
                        <PhotoAlbum color="#fff" />
                    </label>
                </div>
                <div class="item">
                    <span>打开相册，选择多张图片</span>
                    <label for="inputImage2" class="upload">
                        <input id="inputImage2" multiple type="file" accept="image/*" class="upload-hide" />
                        <UploadOutline color="#fff" />
                    </label>
                </div>
                <div class="item">
                    <span>打开照相机</span>
                    <label for="inputCamera" class="upload">
                        <input id="inputCamera" type="file" accept="image/*" :capture="('camera' as InputHTMLAttributes['capture'])" class="upload-hide" />
                        <Camera color="#fff" />
                    </label>
                </div>
                <div class="item">
                    <span>打开视频录像</span>
                    <label for="inputCamcorder" class="upload">
                        <input id="inputCamcorder" type="file" accept="video/*" :capture="('camcorder' as InputHTMLAttributes['capture'])" class="upload-hide" />
                        <Camcorder color="#fff" />
                    </label>
                </div>
                <div class="item">
                    <span>打开录音机</span>
                    <label for="inputMicrophone" class="upload">
                        <input id="inputMicrophone" type="file" accept="audio/*" :capture="('microphone' as InputHTMLAttributes['capture'])" class="upload-hide" />
                        <Microphone color="#fff" />
                    </label>
                </div>
            </div>
        </SwiperSlide>
        <SwiperSlide style="height: 50px;" />
    </SwiperProvider>
</template>

<script lang="ts" setup>
import { UploadOutline, Camera, PhotoAlbum, Camcorder, Microphone } from '@/icons/'
import { InputHTMLAttributes } from 'vue'
import { SwiperSlide } from 'swiper/vue'
import { SwiperProvider } from '@/components/SwiperProvider/'
</script>
<style lang="scss" scoped>
.media{
    .operation{
        display: flex;
        flex-wrap: wrap;
        .item{
            flex: 0 0 50%;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 24px 12px;
            box-sizing: border-box;
            span{
                font-size: 14px;
                margin-bottom: 5px;
            }
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
        }
    }
}
</style>