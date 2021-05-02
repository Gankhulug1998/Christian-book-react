import axios from "axios";

const instance = axios.create({
	baseURL: "https://128.199.99.181/api/v1",
});

instance.defaults.withCredentials = true;

export default instance;
//Why bolohgui bn we
