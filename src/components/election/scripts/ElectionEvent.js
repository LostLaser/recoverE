export default {
    data() {
        return {
            show: true
        }
    },
    props: {
        "event-class": {
            type: String,
            default: "red"
        }, 
        "fromPos": {
            default: function () {
                return {"x": 100, "y": 100}
            },
            type: Object
        },
        "toPos": {
            default: function () {
                return {"x": 300, "y": 300}
            },
            type: Object
        },
        "expiration": {
            type: Number,
            default: 3000
        }
    }
}
