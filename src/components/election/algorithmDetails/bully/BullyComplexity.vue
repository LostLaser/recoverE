<template>
    <div>
        <p>
            Assuming that the bully algorithm messages are of a fixed (known, invariant) sizes, the 
            most number of messages are exchanged in the group when the process with the lowest ID 
            initiates an election. This process sends (N−1) Election messages, the next higher ID 
            sends (N−2) messages, and so on, resulting in Θ(N<sup>2</sup>) election messages. There are 
            also the Θ(N<sup>2</sup>) Alive messages, and Θ(N) co-ordinator messages, thus making the 
            overall number messages exchanged in the worst case be Θ(N<sup>2</sup>). 
        </p>
    </div>
</template>