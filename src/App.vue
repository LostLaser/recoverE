<template>
  <div class="container">
        <h1>HELLO</h1>
        <div id="cluster-container" class="container">
            <ul id="nodes" class="buttons are-large" >
                <li v-for="node in nodeList" class="list-item" v-bind:key="node.id">
                    <div class="card z-depth-3" v-bind:id="node.id" v-bind:style="node.style">
                        <div class="card-header" v-bind:class="[ node.isUp ? 'headerActive' : 'headerStopped' ]"></div>
                        <div class="card-body container">
                            <div class="row">
                                <div class="col-md-8">{{ node.label }}</div>
                            </div>
                            <div class="blank-row"></div>
                            <div class="row">
                                <button v-on:click="toggleNode(node)" class="btn btn-light offset-md-8" v-bind:class="[ node.isUp ? 'green' : 'red' ]">
                                    <span class="material-icons">{{ node.isUp ? 'pause' : 'play_arrow' }}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            nodeList: [],
            connection: 0
        }
    },
    methods: {
        toggleNode: function (node) {
        var msgAction = "START"
        if (node.isUp) {
            msgAction = "STOP"
        } 
        console.log(msgAction)
        var msg = {
            action: msgAction,
            id: node.serverId
        }
        this.connection.send(JSON.stringify(msg))
        node.isUp = !node.isUp
        },
        addNode: function (id) {
        var label = id.split("-")[0]
        this.nodeList.push(
            {
            id: "val-" + id, 
            label: label,
            serverId: id,
            isUp: true
        });
        this.updateLayout(this.nodeList);
        },
        updateLayout: function(listItems) {
        for (var i = 0; i < listItems.length; i++) {
            var offsetAngle = 360 / listItems.length;
            var rotateAngle = offsetAngle * i;
            listItems[i].style = "transform: rotate(" + rotateAngle + "deg) translate(0px, -300px) rotate(-" + rotateAngle + "deg) translate(-50%, 0)"
        }
        },
        messageParser: function(jsonVal) {
        switch(jsonVal["action"]) {
            case "SETUP":
            for (var i = 0; i < jsonVal["payload"].length; i++) {
                this.addNode(jsonVal["payload"][i])
            }
            break
            case "HEARTBEAT":
            this.displayEvent(jsonVal["from"], jsonVal["to"], "red")
            break
            case "ELECT":
            this.displayEvent(jsonVal["from"], jsonVal["to"], "yellow")
            break
            case "ACK":
            this.displayEvent(jsonVal["from"], jsonVal["to"], "green")
        }
        },
        displayEvent: function(from, to, color) {
        const bbox = document.querySelector("#val-"+from).getBoundingClientRect();
        const fromX = bbox.left + bbox.width / 2;
        const fromY = bbox.top + bbox.height / 2;
        const bbox2 = document.querySelector('#val-'+to).getBoundingClientRect();
        const toX = bbox2.left + bbox2.width / 2;
        const toY = bbox2.top + bbox2.height / 2;

        const particle = document.createElement('particle');
        document.body.appendChild(particle);
    
        const size = 20;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = `${color}`;
    
        const animation = particle.animate([
            {
            // offset the particle with half its size to center it
            transform: `translate(-50%, -50%) translate(${fromX}px, ${fromY}px)`
            },
            {
            transform: `translate(${toX}px, ${toY}px)`
            }
            ], {
            duration: 1500
            }
        );
    
        // remove the element from the DOM
        animation.onfinish = () => {
            particle.remove();
        };
        }
    },
    mounted() {
        var count = 5
        var vue = this
        console.log("PROC")
        this.connection = new WebSocket("ws://localhost:8888/election?count=" + count)
        this.connection.onmessage = function (msg) {
        vue.messageParser(JSON.parse(msg.data))
        }
        
    }
}
</script>

<style scoped>
body {
  font-family: 'Roboto', sans-serif;
}

#nodes {
  height: 600px;
  width: 600px;
  position: relative;
  padding: 0 0 0 0;
  margin: 0 auto 10em;
}

.list-item {
  list-style: none;
  height: 50px;
  width: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  outline: 0;
}

.list-item:not(:last-child) {
  border-bottom: none;
}

.cluster-container {
  padding: 10em 0 10em 0;
}

.card {
  width: 12rem;
}

.headerActive {
  background-color: rgb(17, 194, 17);
}
.headerStopped {
  background-color: rgb(255, 0, 0);
}

.blank-row {
  height: 50px;
}

.btn-light {
  border-color: rgb(201, 198, 198)
}

.red {
  color: rgb(255, 0, 0);
}

.green {
  color: rgb(17, 194, 17);
}

particle {
  position: fixed;
  left: 0;
  top: 0;
  border-radius: 50%;
  pointer-events: none;
  opacity: 1;
  z-index: -1;
}


</style>