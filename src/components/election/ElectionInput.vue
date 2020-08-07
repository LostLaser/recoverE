<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <select class="form-control" v-model="selected_election">
                    <option v-for="(type, value) in election_types" v-bind:key="type" v-bind:value="type"> {{ value }} </option>
                </select>
            </div>
            <div class="col-4">
                <input class="form-control" type="number" v-model="node_count">
            </div>
            <div clas="col-2">
                <button @click="updateCluster" class="btn btn-dark">Submit</button>
            </div>
        </div>
    </div>
</template>

<style scoped src="./stylesheets/ElectionInput.css"></style>

<script scoped src="./scripts/ElectionInput.js"></script>
