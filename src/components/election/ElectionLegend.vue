<template>
    <div class="container">
        Event Legend
        <div class="list-group">
            <div class="list-group-item list-group-item">
                <div class="row">
                    <election-event event-class="heartbeat"></election-event>
                    <div class="offset-sm-1">Heartbeat</div>
                </div>
            </div>
            <div class="list-group-item list-group-item">
                <div class="row">
                    <election-event event-class="elect"></election-event>
                    <div class="offset-sm-1">Election result notice</div>
                </div>
            </div>
            <div class="list-group-item list-group-item">
                <div class="row">
                    <election-event event-class="start_new_election"></election-event>
                    <div class="offset-sm-1">Request to start election</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped src="./stylesheets/ElectionLegend.css"></style>