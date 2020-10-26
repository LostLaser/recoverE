<template>
    <div>
        <p>
            If process P1 detects a coordinator failure, it creates a new active list which is empty initially. It sends election message to its direct neighbor and adds the number 1 to its active list.
            If process P2 receives message elect from processes on left, it responds in 3 ways:
            <ul>
                <li>If message received does not contain 1 in active list then P1 adds 2 to its active list and forwards the message.</li>
                <li>If this is the first election message it has received or sent, P1 creates new active list with numbers 1 and 2. It then sends election message 1 followed by 2.</li>
                <li>If Process P1 receives its own election message 1 then active list for P1 now contains numbers of all the active processes in the system. Now Process P1 detects highest priority number from list and elects it as the new coordinator.</li>
            </ul>
        </p>
    </div>
</template>
