import Velocity from 'velocity-animate';

export default {
    data() {
        return {
            nodeList: [],
            connection: 0,
            events: [],
            eventId: 0
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
            node.isUp = !node.isUp
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
            switch(jsonVal["action"]) {
                case "SETUP":
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
                    this.setMaster(jsonVal["from"])
                    break
            }
        },
        displayEvent: function(from, to, action) {
            if (to == "" || from == "") {
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
                var index = this.events.indexOf(event);
                this.events.splice(index, 1);
            }, 1500)
        },
        eventPosition: function(el) {
            Velocity(el, { translateX: `${this.element.from.x}px`, translateY: `${this.element.from.y}px` }, {duration: 0})
        },
        eventEnter: function (el, done) {
            Velocity(el, { translateX: `${this.element.to.x}px`, translateY: `${this.element.to.y}px` }, { duration: 1500 })
            Velocity(el, { complete: done })
        },
        setMaster(id) {
            id = "val-"+id;
            for (var node of this.nodeList) {
                if (node.id == id) {
                    node.isMaster = true;
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
            var count = 3
            var vue = this
            this.connection = new WebSocket("ws://localhost:8888/election?count=6" + count)
            this.connection.onmessage = function (msg) {
            vue.messageParser(JSON.parse(msg.data))
        }
        
    }
}