<template>
    <svg :class="svgClass" aria-hidden="true" @click="handle" v-on="$listeners">
        <use :xlink:href="iconName"/>
    </svg>
</template>

<script>
export default {
    name: 'IconSvg',
    props: {
        iconClass: {
            type: String,
            required: true
        },
        className: {
            type: String,
            default: ''
        }
    },
    computed: {
        iconName() {
            return `#icon-${this.iconClass}`
        },
        svgClass() {
            if (this.className) {
                return 'icon-svg ' + this.className
            } else {
                return 'icon-svg'
            }
        }
    },
    methods: {
        handle(e) {
            this.$emit('click', e)
        }
    }
}
</script>

<style scoped>
.icon-svg {
    width: 16px;
    height: 16px;
    vertical-align: -4px;
    fill: currentColor;
    overflow: hidden;
}
</style>
