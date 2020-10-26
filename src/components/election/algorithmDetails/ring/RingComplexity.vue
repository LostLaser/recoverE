<template>
    <div>
        <p>
            The maximum number of messages exchanged in a group of size n occurs when all processes initiate an election simultaneously. Each process 
            will send an election message that will get forwarded by n other processes. Assuming each message takes 1 unit of time to be sent, it will 
            take n units of time for a message to be sent all the way around the ring. Thus, the time complexity is O(n), with the message complexity 
            being O(n<sup>2</sup>).
        </p>
    </div>
</template>
