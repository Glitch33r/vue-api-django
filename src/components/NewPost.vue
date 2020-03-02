<template>
    <div>
        <b-form>
            <b-form-group
                    id="input-group-1"
                    label="Title:"
                    label-for="input-1"
            >
                <b-form-input
                        id="input-1"
                        v-model="title"
                        type="text"
                        required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Text: " label-for="input-2">
                <b-form-textarea
                        id="textarea"
                        v-model="text"
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="6"
                ></b-form-textarea>
            </b-form-group>

            <b-button type="button" @click="addPost()" variant="primary">Submit</b-button>
        </b-form>
    </div>
</template>

<script>
    import postServices from "@/services/postServices";

    export default {
        name: "NewPost",
        data() {
            return {
                title: '',
                text: ''
            }
        },
        methods: {
            async addPost() {
                // eslint-disable-next-line no-console
                console.log(localStorage.getItem('token'));
                await postServices.addPost({
                    title: this.title,
                    text: this.text
                });

                this.$router.push('/posts')
            }
        }
    }
</script>

<style scoped>

</style>