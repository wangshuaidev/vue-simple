import {TEST_DATA} from './mutation-type';

export default {
    [TEST_DATA](state,num) {
        state.num = num;
    }
}