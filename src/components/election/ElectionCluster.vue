<template>
    <div id="cluster-container" class="container">
        <ul id="nodes" class="buttons are-large" >
            <li v-for="node in nodeList" class="list-item" v-bind:key="node.id">
                <div class="card card-up" v-bind:id="node.id" v-bind:style="node.style">
                    <div class="card-header" v-bind:class="[ node.isUp ? 'headerActive' : 'headerStopped' ]"></div>
                    <div class="card-body container">
                        <div class="row">
                            <div class="col-md-8">{{ node.label }}</div>
                        </div>
                        <div class="blank-row"></div>
                        <div class="row">
                            <button v-on:click="toggleNode(node)" class="btn btn-light offset-md-8" v-bind:class="[ node.isUp ? 'green' : 'red' ]">
                                <span class="material-icons align-middle">{{ node.isUp ? 'pause' : 'play_arrow' }}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script src="./scripts/ElectionCluster.js"></script>

<style src="./stylesheets/ElectionCluster.css"></style>