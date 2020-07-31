<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-lg-3">
                <algorithm-description></algorithm-description>
            </div>
            <div class="col-lg-6">
                <election-input></election-input>
                <election-cluster></election-cluster>
            </div>
            <div class="col-lg-3">
                <div class="card row pt-3 pb-3" id="section">
                    <election-legend></election-legend>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./stylesheets/ElectionComponent.css"></style>
