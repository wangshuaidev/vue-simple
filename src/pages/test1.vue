<template>
    <div>test1</div>
</template>

<script>
    import { mapMutations } from 'vuex'

    export default {
        name: "test1",
        methods: {
            ...mapMutations([
                'TEST_DATA'
            ]),
            getGroupData() {
                this.$http('/largescreendata/get3Data', 'get')
                    .then(res => {
                        this.groupData = res;
                    })
            }
        },
        mounted() {
            this.TEST_DATA(5);
            console.log(this.$store.state.num);
            this.getGroupData();
        }
    }
</script>

<style scoped>

</style>