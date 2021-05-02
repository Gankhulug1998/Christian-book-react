import React, { Component } from "react";
import axios from "./axios";
export default class BookDetail extends Component {
	state = {
		name: null,
		content: null,
		photo: null,
		photo_1: null,
		photo_2: null,
		photo_3: null,
		error: null,
		success: null,
		deleted: null,
		loading: null,
		loading: false,

		publisher_city: null,
		publish_year: null,
		isbn: null,
		book_size: null,
		book_pages: null,
		book_created: null,
		book_created_author: null,
		book_created_place: null,
		book_created_year: null,
		value: "",
	};

	goBack = () => {
		this.props.history.goBack();
	};

	handleSave = () => {
		const token = localStorage.getItem("token");
		this.setState({ loading: true, success: null });
		axios
			.put("books/" + this.props.match.params.id, {
				name: this.state.name,
				content: this.state.content,
				photo: this.state.photo,
				photo_1: this.state.photo_1,
				photo_2: this.state.photo_2,
				photo_3: this.state.photo_3,
				publisher_city: this.state.publisher_city,
				publish_year: this.state.publish_year,
				isbn: this.state.isbn,
				book_size: this.state.book_size,
				book_pages: this.state.book_pages,
				book_created: this.state.book_created,
				book_created_author: this.state.book_created_author,
				book_created_place: this.state.book_created_place,
				book_created_year: this.state.book_created_year,
			})
			.then((result) => {
				console.log(result);

				this.setState({
					...result.data.data,
					error: null,
					loading: false,
					success: "Амжилттай хадгагагдлаа...",
				});
			})
			.catch((err) => {
				this.setState({
					error: err.response.data.error.message,
					loading: false,
				});
			});
	};

	handleDelete = () => {
		const token = localStorage.getItem("token");
		this.setState({ loading: true, success: null });
		axios
			.delete("books/" + this.props.match.params.id)
			.then((result) => {
				this.setState({
					deleted: true,
				});
			})
			.catch((err) => {
				console.log(err);
				this.setState({
					error: err.response.data.error.message,
					loading: false,
				});
			});
	};

	handleType = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value, error: null, success: null });
	};

	componentDidMount = () => {
		axios
			.get("books/" + this.props.match.params.id)
			.then((result) => {
				this.setState({ ...result.data.data, error: null, loading: false });
			})
			.catch((err) => {
				this.setState({
					error: err.response.data.error.message,
					loading: false,
				});
			});
	};

	render() {
		if (this.state.deleted) {
			return <div className="notification is-danger">Ном устгагдлаа</div>;
		}
		return (
			<>
				<div className="media mt-4">
					<div className="media-content m-4">
						<div className="columns m-1 is-mobile is-centered">
							<div className="column is-one-quarter">
								<img src={`https://i.postimg.cc/` + this.state.photo} />
							</div>
							<div className="column is-one-quarter">
								<img src={`https://i.postimg.cc/` + this.state.photo_1} />
							</div>
							<div className="column is-one-quarter">
								<img src={`https://i.postimg.cc/` + this.state.photo_2} />
							</div>
							<div className="column is-one-quarter">
								<img src={`https://i.postimg.cc/` + this.state.photo_3} />
							</div>
						</div>
						<h1 className="title">{this.state.name}</h1>
						<div className="field">
							<label className="label">Нэр</label>
							<p className="m-4">{this.state.name}</p>
						</div>

						<label className="label">Агуулга</label>
						<p className="m-4">{this.state.content}</p>

						<label className="label">Хэвлэсэн хот</label>
						<p className="m-4">{this.state.publisher_city}</p>

						<label className="label">Хэвлэсэн он</label>
						<p className="m-4">{this.state.publish_year}</p>

						<label className="label">ISBN</label>
						<p className="m-4">{this.state.isbn}</p>

						<label className="label">Номын хэмжээ өндөр өргөн</label>
						<p className="m-4">{this.state.book_size}</p>

						<label className="label">Хуудасны тоо</label>
						<p className="m-4">{this.state.book_pages}</p>

						<label className="label">Эх номын нэр</label>
						<p className="m-4">{this.state.book_created_author}</p>

						<label className="label">Эх номын газар</label>
						<p className="m-4">{this.state.book_created_place}</p>

						<label className="label">Үйлдвэрлэсэн он</label>
						<p className="m-4">{this.state.book_created_year}</p>

						<button
							className="button is-success is-outlined m-2"
							onClick={this.goBack}
						>
							Буцах
						</button>

						{this.state.success && (
							<div className="notification is-success">
								{this.state.success}
							</div>
						)}
						{this.state.error && (
							<div className="notification is-warning">{this.state.error}</div>
						)}
					</div>
				</div>
			</>
		);
	}
}
