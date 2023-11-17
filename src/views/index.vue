<script lang="ts" setup>
import Enc from "enc";
import VConsole from "vconsole";
import CryptoES from "crypto-es"; // 科大讯飞
import { Base64 } from "js-base64";
import IatRecorder from "../until/iatRecorder"; // 科大讯飞
let iatRecorder = new IatRecorder();

const APPID = "";
const API_SECRET = "";
const API_KEY = "";

/**
 * 获取websocket url
 * 该接口需要后端提供，这里为了方便前端处理
 */

function getWebSocketUrl() {
    return new Promise((resolve, reject) => {
        // 请求地址根据语种不同变化
        var url = "wss://iat-api.xfyun.cn/v2/iat";
        var host = "iat-api.xfyun.cn";
        var apiKey = API_KEY;
        var apiSecret = API_SECRET;
        var date = new Date().toGMTString();
        var algorithm = "hmac-sha256";
        var headers = "host date request-line";
        var signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v2/iat HTTP/1.1`;
        var signatureSha = CryptoES.HmacSHA256(signatureOrigin, apiSecret);
        var signature = CryptoES.enc.Base64.stringify(signatureSha);
        var authorizationOrigin = `api_key="${apiKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
        var authorization = btoa(authorizationOrigin);
        url = `${url}?authorization=${authorization}&date=${date}&host=${host}`;
        resolve(url);
    }); 
}

// ======================开始调用=============================
var vConsole = new VConsole();
let countInterval;
// 状态改变时处罚
iatRecorder.onWillStatusChange = function (oldStatus, status) {
    // 可以在这里进行页面中一些交互逻辑处理：倒计时（听写只有60s）,录音的动画，按钮交互等
    // 按钮中的文字
    let text = {
        null: "开始识别", // 最开始状态
        init: "开始识别", // 初始化状态
        ing: "结束识别", // 正在录音状态
        end: "开始识别", // 结束状态
    };
    let senconds = 0;
    $(".taste-button")
        .removeClass(`status-${oldStatus}`)
        .addClass(`status-${status}`)
        .text(text[status]);
    if (status === "ing") {
        $("hr").addClass("hr");
        $(".taste-content").css("display", "none");
        $(".start-taste").addClass("flex-display-1");
        // 倒计时相关
        countInterval = setInterval(() => {
            senconds++;
            $(".used-time").text(
                `0${Math.floor(senconds / 60)}：${Math.floor(senconds / 10)}${
                    senconds % 10
                }`
            );
            if (senconds >= 60) {
                this.stop();
                clearInterval(countInterval);
            }
        }, 1000);
    } else if (status === "init") {
        $(".time-box").show();
        $(".used-time").text("00：00");
    } else {
        $(".time-box").hide();
        $("hr").removeClass("hr");
        clearInterval(countInterval);
    }
};

// 监听识别结果的变化
iatRecorder.onTextChange = function (text) {
    console.log(text, "text");
    $("#result_output").text(text);
};

// onMounted(() => {
//     $("#taste_button, .taste-button").on("click", () => {
//         // const distinguish = () => {
//         // 处理点击事件的代码
//         console.log(document.querySelector("#taste_button"), "11");
//         console.log("aaa");
//         if (iatRecorder.status === "ing") {
//             iatRecorder.stop();
//         } else {
//             iatRecorder.start();
//         }
//     });
// // setTimeout(()=>{distinguish()},1000)

// });
// //或者用上面的方法
const distinguish = () => {
    // 处理点击事件的代码
    if (iatRecorder.status === "ing") {
        iatRecorder.stop();
    } else {
        iatRecorder.start();
    }
};
</script>
<template>
    <div class="service-item service-item-taste">
        <h2 class="service-item-title">产品体验-语音听写（流式版）WebAPI</h2>
        <a href="/doc" target="_blank">demo文档说明</a>
        <div class="service-item-content service-item-taste-content">
            <div class="taste-content">
                <button class="taste-button ready-button" @click="distinguish">开始识别</button>
            </div>
            <div class="start-taste">
                <div class="start-taste-left">
                    <div class="time-box">
                        <span class="start-taste-line">
                            <hr class="hr hr1">
                            <hr class="hr hr2">
                            <hr class="hr hr3">
                            <hr class="hr hr4">
                            <hr class="hr hr5">
                            <hr class="hr hr6">
                            <hr class="hr hr7">
                            <hr class="hr hr8">
                            <hr class="hr hr9">
                            <hr class="hr hr10">
                        </span>
                        <span class="total-time"><span class="used-time">00: 00</span> / 01: 00</span>
                    </div>
                    <div class="start-taste-button">
                        <button class="taste-button start-button" @click="distinguish">结束识别</button>
                    </div>
                </div>
                <div class="output-box" id="result_output"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
@import url(./index.css);
</style>