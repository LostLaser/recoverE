<template>
    <div id="description" class="mb-3">
        <div id="accordion">
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Algorithm Overview
                        </button>
                    </h5>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        <bully-overview v-if="election_type == 'bully'"></bully-overview>
                        <ring-overview v-else-if="election_type == 'ring'"></ring-overview>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingTwo">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            Algorithm Description
                        </button>
                    </h5>
                </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                    <div class="card-body">
                        <bully-description v-if="election_type == 'bully'"></bully-description>
                        <ring-description v-else-if="election_type == 'ring'"></ring-description>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" id="headingThree">
                    <h5 class="mb-0">
                        <button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            Runtime and Complexity
                        </button>
                    </h5>
                </div>
                <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                    <div class="card-body">
                        <bully-complexity v-if="election_type == 'bully'"></bully-complexity>
                        <ring-complexity v-else-if="election_type == 'ring'"></ring-complexity>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./stylesheets/AlgorithmDescription.css"></style>

<script scoped src="./scripts/AlgorithmDescription.js"></script>