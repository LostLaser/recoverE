<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3">
                <algorithm-description :election_type="selected_election"></algorithm-description>
            </div>
            <div class="col-lg-6">
                <election-input v-on:updateCluster="clusterReload" :node_count="node_count" :selected_election="selected_election"></election-input>
                <election-cluster :election_type="selected_election" :node_count="node_count" :key="[node_count, selected_election]"></election-cluster>
            </div>
            <div class="col-lg-3 justify-content-center">
                <div class="card row pt-3 pb-3 mx-auto" id="section">
                    <election-legend></election-legend>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./stylesheets/ElectionComponent.css"></style>

<script scoped src="./scripts/ElectionComponent.js"></script>
