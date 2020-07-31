import Velocity from 'velocity-animate';

export default {
    props: {
        count: {
            type: Number,
            default: 5
        },
        election_type: {
            type: String,
            default: "bully"
        }
    },
    data() {
        return {
            nodeList: [],
            connection: 0,
            events: [],
            eventId: 0,
            eventTimeOut: 1500,
            loading: true
        }
    },
    methods: {
        toggleNode: function (node) {
            var msgAction = "START"
            if (node.isUp) {
                msgAction = "STOP"
            } 
            
            var msg = {
                action: msgAction,
                id: node.serverId
            }
            this.connection.send(JSON.stringify(msg))
        },
        addNode: function (id) {
            var label = this.trimId(id);
            this.nodeList.push(
                {
                id: "val-" + id, 
                label: label,
                serverId: id,
                isUp: true,
                isMaster: false
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
            //console.log("action:", jsonVal["action"], jsonVal["to"], jsonVal["from"], )
            switch(jsonVal["action"]) {
                case "SETUP":
                    this.loading = false
                    for (var i = 0; i < jsonVal["payload"].length; i++) {
                        this.addNode(jsonVal["payload"][i])
                    }
                    break
                case "HEARTBEAT":
                    this.displayEvent(jsonVal["from"], jsonVal["to"], jsonVal["action"].toLowerCase())
                    break
                case "ELECT":
                    this.displayEvent(jsonVal["from"], jsonVal["to"], jsonVal["action"].toLowerCase())
                    break
                case "ELECTED":
                    this.getNodeById("val-" + jsonVal["from"]).isMaster = true;
                    break
                case "NOT_MASTER":
                    this.getNodeById("val-" + jsonVal["from"]).isMaster = false;
                    break
                case "STOPPED":
                    this.getNodeById("val-" + jsonVal["from"]).isUp = false;
                    this.getNodeById("val-" + jsonVal["from"]).isMaster = false;
                    break
                case "STARTED":
                    this.getNodeById("val-" + jsonVal["from"]).isUp = true;
                    break
                case "START_NEW_ELECTION":
                    this.displayEvent(jsonVal["from"], jsonVal["to"], jsonVal["action"].toLowerCase())
                    break
            }
        },
        displayEvent: function(from, to, action) {
            if (to == "" || to == null || from == "" || from == null) {
                return;
            }
            const bbox = document.querySelector("#val-"+from).getBoundingClientRect();
            const fromX = bbox.left + bbox.width / 2;
            const fromY = bbox.top + bbox.height / 2;
            const bbox2 = document.querySelector('#val-'+to).getBoundingClientRect();
            const toX = bbox2.left + bbox2.width / 2;
            const toY = bbox2.top + bbox2.height / 2;
            
            var event = {"type": "heartbeat", "id": this.eventId, "from": {"x": fromX, "y": fromY}, "to": {"x": toX, "y":toY}, "action": action, "show": false}
            this.events.push(event);
            this.eventId++;

            // hack so the event enter transitions will occur
            setTimeout(() => {event.show = true;}, 1);

            setTimeout(() => {
                this.events.shift();
            }, this.eventTimeOut)
        },
        eventPosition: function(el) {
            Velocity(el, { translateX: `${this.element.from.x}px`, translateY: `${this.element.from.y}px` }, {duration: 0})
        },
        eventEnter: function(el, done) {
            Velocity(el, { translateX: `${this.element.to.x}px`, translateY: `${this.element.to.y}px` }, { duration: this.eventTimeOut, easing: "easeInQuad" })
            Velocity(el, { complete: done })
        },
        toggleMaster(id) {
            var node = this.getNodeById(id)
            node.isMaster = !node.isMaster;
        },
                getNodeById(id) {
            for (var node of this.nodeList) {
                if (node.id == id) {
                    return node
                }
            }
        },
        trimId(id) {
            if (id != "" && id != undefined) {
                id = id.split('-')[0]
            }
            return id;
        }

    },
    mounted() {
        var vue = this
        var count = vue.count

        console.log(this.$apiUrl + "/election?count=" + count)
        this.connection = new WebSocket(this.$apiUrl + "/election?count=" + count)
        this.connection.onmessage = function (msg) {
            vue.messageParser(JSON.parse(msg.data))
        }
        
    }
}