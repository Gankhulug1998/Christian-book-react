import axios from "axios";

const instance = axios.create({
	baseURL: "http://188.166.19.36:8080/api/v1",
});

instance.defaults.withCredentials = true;

export default instance;
//Why bolohgui bn we