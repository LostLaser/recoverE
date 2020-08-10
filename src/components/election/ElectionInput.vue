<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <select class="form-control" v-model="selected_election">
                    <option v-for="(type, value) in election_types" v-bind:key="type" v-bind:value="type"> {{ value }} </option>
                </select>
            </div>
            <div class="col-4">
                <select class="form-control" v-model="node_count">
                    <option v-for="value in node_count_options" v-bind:key="value"> {{ value }} </option>
                </select>
            </div>
            <div clas="col-2">
                <button @click="updateCluster" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </div>
</template>

<style scoped src="./stylesheets/ElectionInput.css"></style>

<script scoped src="./scripts/ElectionInput.js"></script>
