import Vue from "vue";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.timeout = 10000;

Vue.prototype.$axios = axios;
