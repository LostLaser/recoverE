<template>
    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Event</th>
                    <th scope="col">From</th>
                    <th scope="col">To</th>
                </tr>
            </thead>

            <tbody v-for="(event, index) in eventLog" :key="index.from">
                <tr>
                    <td><election-event eventClass="heartbeat"></election-event></td>
                    <td>{{ event.from }}</td>
                    <td>{{ event.to }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped src="./stylesheets/ElectionEventLog.css"></style>

<script scoped src="./scripts/ElectionEventLog.js"></script>