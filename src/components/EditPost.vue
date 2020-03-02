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
            <b-form-input
                    id="input-1"
                    v-model="likes"
                    type="number"
                    required
            ></b-form-input>
            <b-form-group id="input-group-2" label="Text" label-for="input-2">
                <b-form-textarea
                        id="textarea"
                        v-model="text"
                        placeholder="Enter something..."
                        rows="3"
                        max-rows="6"
                ></b-form-textarea>
            </b-form-group>

            <b-button type="button" @click="updateTask()" variant="primary">Update</b-button>
        </b-form>
    </div>
</template>

<script>
    import postServices from "@/services/postServices";

    export default {
        name: "EditPost",
        data() {
            return {
                title: '',
                likes: '',
                text: ''
            }
        },
        mounted(){
            this.getPost();
        },
        methods: {
            async getPost() {
                try {
                    let id_post = this.$route.params.id;
                    let resp = await postServices.getPostDetail(id_post);
                    // eslint-disable-next-line no-console
                    console.log(resp);
                    this.title = resp.data.title;
                    this.text = resp.data.text;
                    this.likes = resp.data.likes;
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log(e.message)
                }
            },
            async updateTask(){
                try {
                    let id_post = this.$route.params.id;
                    await  postServices.changePost(id_post, {
                        id: id_post,
                        title: this.title,
                        likes: this.likes,
                        text: this.text
                    });
                    this.$router.push('/posts')
                } catch (e) {
                    // eslint-disable-next-line no-console
                    console.log(e.message)
                }
            }
        }
    }
</script>

<style scoped>

</style>