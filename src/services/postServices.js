import api from "@/services/api";

export default {
    fetchPosts() {
        return api().get('post/');
    },
    addPost(params) {
        return api().post('post/create/', params, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            }
        });
    },
    getPostDetail(id) {
        return api().get('post/'+ id +'/detail/', {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            }
        });
    },
    deletePost(id) {
        return api().delete('post/'+ id +'/detail/', {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            }
        });
    },
    changePost(id, params) {
        return api().patch('post/'+ id +'/detail/', params, {
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            }
        });
    },
    like_unlikePost(id, type) {
        return api().patch('post/' + id + '/reaction/' + type + '/');
    },


}