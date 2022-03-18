import axios from "axios";

const instance = axios.create({
	baseURL: "https://christian-book.info/api/v1",
});

instance.defaults.withCredentials = true;

export default instance;
//Why bolohgui bn we