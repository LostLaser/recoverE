export default {
    data() {
        return {
            node_count: "5",
            selected_election: "bully"
        }
    },
    methods: {
        clusterReload: function(selected_election, node_count) {
            this.node_count = node_count
            this.selected_election = selected_election
        }
    }
}