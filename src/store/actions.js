import {TEST_DATA} from './mutation-type';

export default {
    async getUserInfo({
        commit,
    }) {
        commit(TEST_DATA)
    }
}