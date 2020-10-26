<template>
    <div>
        <p>
            When a process P recovers from failure, or the failure detector indicates that the current coordinator has failed, P performs the following actions:<br>
            <ul>
                <li>If P has the highest process ID, it sends a Victory message to all other processes and becomes the new Coordinator. Otherwise, P broadcasts an Election message to all other processes with higher process IDs than itself.</li>
                <li>If P receives no Answer after sending an Election message, then it broadcasts a Victory message to all other processes and becomes the Coordinator.</li>
                <li>If P receives an Answer from a process with a higher ID, it sends no further messages for this election and waits for a Victory message. (If there is no Victory message after a period of time, it restarts the process at the beginning.)</li>
                <li>If P receives an Election message from another process with a lower ID it sends an Answer message back and starts the election process at the beginning, by sending an Election message to higher-numbered processes.</li>
                <li>If P receives a Victory message, it treats the sender as the coordinator</li>
            </ul>
        </p>
    </div>
</template>
