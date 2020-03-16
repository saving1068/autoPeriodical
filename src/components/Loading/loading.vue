<template>
    <div id="loading">
        <div class="mask"></div>
        <div class="content">
            <div class="loader">
                <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
            </div>
            <div class="txt">{{title}}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['title'],
    data() {
        return {
            
        }
    }
}
</script>


<style lang="scss" scoped>
#loading {
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    perspective: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100000;

    .mask {
        position: absolute;
        left:0;
        top:0;
        width: 100%;
        height: 100%;
        background:rgba(0,0,0,.2);
    }
    
    .content {
        position: absolute;
        left:50%;
        top:50%;
        padding:15px;
        background:#333;
        border-radius: 8px;
        transform: translate(-50%,-50%);
        text-align: center;

        .loader {
            padding:0 10px;
            .circular {
                height: 40px;
                width: 40px;
                animation: loading-rotate 2s linear infinite
            }

            .path {
                animation: loading-dash 1.5s ease-in-out infinite;
                stroke-dasharray: 90,150;
                stroke-dashoffset: 0;
                stroke-width: 3;
                stroke: #fff;
                stroke-linecap: round
            }

            i {
                color: #fff
            }
        }

        .txt {
            color:#fff;
        }

    }
}

@keyframes loading-rotate {
    to {
        transform: rotate(1turn)
    }
}

</style>
