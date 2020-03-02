<template>
    <div class="post">
        <h1>POSTs LIST</h1>
        <template>
            <div>
                <b-table striped hover :items="posts" :fields="fields">
                    <template v-if='logged' v-slot:cell(edit)="data">
                        <router-link v-bind:to="/posts/ + data.item.id">Edit</router-link>
                        <br>
                        <a href="#" @click="deletePost(data.item.id)">Delete</a>
                    </template>
                    <template v-slot:cell(likes)="data">
                        <b-button href="#" @click="likePost(data.item.id)">+</b-button>
                        {{data.item.likes}}
                        <b-button @click="unlikePost(data.item.id)" href="#">-</b-button>
                    </template>
                </b-table>
            </div>
        </template>
        <template v-if='logged'>
            <b-button variant="success" v-bind:to='"/posts/new"'>New Post</b-button>
            or
            <b-button variant="success" @click=logout>LogOut</b-button>
        </template>
        <template v-if='!logged'>
            <b-button variant="success" v-bind:to='"/login"'>Login</b-button>
            Or
            <b-button variant="success" v-bind:to='"/sign-up"'>SignUP</b-button>
        </template>
    </div>
</template>

<script>
    import postServices from "@/services/postServices";
    import userService from "@/services/userService";

    export default {
        name: "Posts",
        data() {
            return {
                logged: '',
                posts: [],
                fields: [
                    {
                        key: 'id',
                    },
                    {
                        key: 'title',
                        sorted: true
                    },
                    {
                        key: 'author_name',
                        sorted: true
                    },
                    {
                        key: 'likes'
                    },
                    {
                        key: 'edit'
                    }
                ],
            }
        },
        mounted() {
            this.getPosts();
            this.logged = localStorage.getItem('logged');
        },
        methods: {
            async logout() {
                await userService.logout();
                this.$router.push('/login')
            },
            async getPosts() {
                const resp = await postServices.fetchPosts();
                // eslint-disable-next-line no-console
                console.log(resp);
                this.posts = resp.data
            },
            async deletePost(id) {
                await postServices.deletePost(id);
                this.getPosts();
            },
            async likePost(id) {
                await postServices.like_unlikePost(id, 'like');
                this.getPosts();
            },
            async unlikePost(id) {
                await postServices.like_unlikePost(id, 'unlike');
                this.getPosts();
            }
        }
    }
</script>

<style scoped>

</style>