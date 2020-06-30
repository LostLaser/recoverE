<template>
    <div>
       <div class="news-holder" v-for="(newsContent, index) in news" v-bind:key="newsContent">
            <h1 class="text-danger">{{newsContent.name}}</h1>
            <h4 class="text-primary">{{newsContent.header}}</h4>
            <p>{{newsContent.body}}</p>
            <div class="mb-2 text-info">{{date}}</div>
            <button type="button" class="btn btn-outline-primary btn-sm" v-on:click="readNews(index + 1)">Read</button>
            <div style="border: 1px dashed;" class="mt-2"></div>
       </div>
    </div>
</template>

<script>
export default {
    name: "NewsHolder",

    props: {
        date: {
            type: String,
            required: false,
            default: 'today'
        }
    },

    data() {
        return {
            news: [{"name" : "News 1","header" : "News 1 header","body" : "News 1 news info"}, {"name" : "News 2","header" : "News 2 header","body" : "News 2 news info"}, {"name" : "News 3","header" : "News 3 header","body" : "News 3 news info"}],
        }
    },

    methods: {
        readNews(newsNum){
            this.$emit('read', newsNum);
        }
    }
}
</script>