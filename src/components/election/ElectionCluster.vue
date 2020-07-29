<template>
    <div id="cluster-container" class="container">
        <ul id="nodes" class="buttons are-large" >
            HEY THERE
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
            <transition v-for="event in events" v-bind:key="event.eventId" @enter="eventEnter" @before-enter="eventPosition" v-bind="element=event" :css="false">
                <election-event class="eventParticle" :event-class="event.action" v-if="event.show"></election-event>
            </transition>
        </ul>
    </div>
</template>

<script src="./scripts/ElectionCluster.js"></script>

<style src="./stylesheets/ElectionCluster.css"></style>
