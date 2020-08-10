export default {
    data() {
        return {
            election_types: {"Bully Election": "bully", "Ring Election": "ring"},
            node_count_options: ["2", "3", "4", "5"]
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