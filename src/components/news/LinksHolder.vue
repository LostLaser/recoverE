<template>
    <div>
        <h5>Addtional links</h5>
        <div class="link-container">
            <p v-for="link in links" v-bind:key="link">
                <a v-bind:href="link.url">{{link.name}}</a>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LinksHolder",
        data(){
            return{
                links: [{url: '/sport',name : 'Sport News ',},{url: '/economy',name: 'Economy News '},{url: '/latest',name : 'Latest News '}],
            }
        }
    }
</script>