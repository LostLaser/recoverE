<template>
    <div class="container">
        
        <div v-for="n in notifications" class="alert notification" role="alert" v-bind:key="n.id">
            {{ n.message }}
            <button type="button" class="close" aria-label="Close" v-on:click="clearNotification(n.id)">
                <span class="material-icons">close</span>
            </button>
        </div>
        <div v-if="errored" id="info-container" class="row align-items-center justify-content-center">
            <span class="material-icons errored">wifi_off</span>
        </div>
        <div v-else-if="loading" id="info-container" class="row align-items-center justify-content-center">
            <div class="spinner-grow m-3" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow m-3" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow m-3" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        <ul v-else id="nodes" class="buttons are-large" >
            <li v-for="node in nodeList" class="list-item" v-bind:key="node.id">
                <div class="card card-up" v-bind:id="node.id" v-bind:style="node.style">
                    <div class="card-header" v-bind:class="[ node.isUp ? 'headerActive' : 'headerStopped' ]"></div>
                    <div class="card-body container">
                        <div class="row">
                            <div class="col-md-8">{{ node.label }}</div>
                            <div class="col-md-2" v-if="node.isMaster">
                                <span class="material-icons align-middle">{{ 'military_tech' }}</span>
                            </div>
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
            <div v-for="event in events" v-bind:key="event.id">
                <transition @enter="eventEnter" @before-enter="eventPosition" v-bind="element=event" :css="false">
                    <election-event class="eventParticle" :event-class="event.action" v-if="event.show"></election-event>
                </transition>
            </div>
        </ul>
    </div>
</template>

<script src="./scripts/ElectionCluster.js"></script>

<style src="./stylesheets/ElectionCluster.css"></style>
