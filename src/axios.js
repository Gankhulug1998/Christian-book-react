import axios from "axios";

const instance = axios.create({
	baseURL: "https://178.128.81.251:8080/api/v1",
});

instance.defaults.withCredentials = true;

export default instance;
//Why bolohgui bn we