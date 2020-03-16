<template>
    <div class="no-data">
        <icon-svg icon-class="noData"></icon-svg>
        <div class="txt"><slot>暂无数据</slot></div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
.no-data {
    padding:20px;
    text-align: center;
    color: #999;
    svg {
        width: 80px;
        height: 80px;
    }
}
</style>

