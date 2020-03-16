import LoadingBox from './loading.vue'

let Loading = {}
// 为了避免重复install，设立flag
Loading.installed = false;

Loading.install = (Vue) => {
    if(Loading.installed){
        return
    }

    Vue.prototype.$loading = {}
    Vue.prototype.$loading.show = (title) => {
        if (document.querySelector('#loading')) return;

        // 1、创建构造器，定义loading模板
        let LoadingTip = Vue.extend(LoadingBox);

        // 2、创建实例，挂载到文档以后的地方
        let tpl = new LoadingTip({
            propsData: {
                title: title || '加载中...'
            }
        }).$mount().$el;
        // 3、把创建的实例添加到body中
        document.body.appendChild(tpl);
        // 阻止遮罩滑动
        document.querySelector('#loading').addEventListener('touchmove', function (e) {
            e.stopPropagation();
            e.preventDefault();
        })
    }

    Vue.prototype.$loading.hide = () => {
        let tpl = document.querySelector('#loading');
        tpl && document.body.removeChild(tpl);
    }

    Loading.installed = true;
}


export default Loading