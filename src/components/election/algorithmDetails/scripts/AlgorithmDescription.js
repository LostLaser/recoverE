export default {
    props: {
        election_type: {
            type: String
        }
    },
    data() {
        return {
        }
    },
    computed: {
        algorithmProperties: function() {
            return this.algorithms[this.election_type]
        }
    }
}