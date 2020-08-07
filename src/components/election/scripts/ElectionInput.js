export default {
    data() {
        return {
            election_types: {"Bully Election": "bully", "Ring Election": "ring"}
        }
    },
    props: {
        node_count: {
            type: String
        },
        selected_election: {
            type: String
        }
    },
    methods: {
        updateCluster: function() {
            this.$emit("updateCluster", this.selected_election, this.node_count)
        }
    }
}