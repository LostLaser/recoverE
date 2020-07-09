import store from "../../../store"

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
            this.commitEvent(jsonVal["from"], jsonVal["to"], jsonVal["action"])
        },
        displayEvent: function(from, to, color) {
            if (to == "") {
                return;
            }

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
        },
        commitEvent(from, to, action) {
            from = this.trimId(from);
            to = this.trimId(to);

            store.commit('addEvent', {event: {"from": from, "to": to, "action": action}});
        },
        trimId(id) {
            if (id != "") {
                id = id.split('-')[0]
            }
            return id;
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