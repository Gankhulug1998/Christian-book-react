import React, { Component } from "react";
import axios from "./axios";

export default class BookDetail extends Component {
	state = {
		name: null,
		content: null,
		photo: null,
		author: null,
		category: null,
		publisher_place: null,
		publisher_city: null,
		publish_year: null,
		isbn: null,
		book_size: null,
		book_created: null,
		book_created_author: null,
		book_created_place: null,
		book_created_year: null,
		error: null,
		success: null,
		deleted: null,
		loading: null,
		loading: false,
	};

	goBack = () => {
		this.props.history.goBack();
	};

	handleSave = () => {
		const token = localStorage.getItem("token");
		this.setState({ loading: true, success: null });
		axios
			.post(
				"books/",
				{
					name: this.state.name,
					content: this.state.content,
					photo: this.state.photo,
					author: this.state.author,
					category: this.state.category,
					publisher_place: this.state.publisher_place,
					publisher_city: this.state.publisher_city,
					publish_year: this.state.publish_year,
					isbn: this.state.isbn,
					book_size: this.state.book_size,
					book_created: this.state.book_created,
					book_created_author: this.state.book_created_author,
					book_created_place: this.state.book_created_place,
					book_created_year: this.state.book_created_year,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				},
			)
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

	handleType = (e) => {
		const { name, value } = e.target;
		this.setState({ [name]: value, error: null, success: null });
	};

	render() {
		if (this.state.deleted) {
			return <div className="notification is-danger">Ном устгагдлаа</div>;
		}
		return (
			<>
				<div className="media">
					<div className="media-left">
						<img src={`https://i.postimg.cc/` + this.state.photo} />
					</div>
					<div className="media-content">
						<h1 className="title">{this.state.name}</h1>
						<div className="field">
							<label className="label">Нэр</label>
							<input
								className="input"
								name="name"
								value={this.state.name}
								onChange={this.handleType}
							></input>
							<label className="label">Зураг</label>

							<input
								className="input"
								name="photo"
								value={this.state.photo}
								onChange={this.handleType}
							></input>

							<label className="label">Агуулга</label>
							<textarea
								style={{ height: "20em" }}
								className="input"
								name="content"
								value={this.state.content}
								onChange={this.handleType}
							></textarea>

							<label className="label">Хэвлэсэн хот</label>
							<textarea
								className="input"
								name="publisher_city"
								value={this.state.publisher_city}
								onChange={this.handleType}
							></textarea>

							<label className="label">Хэвлэсэн он</label>
							<textarea
								className="input"
								name="publish_year"
								value={this.state.publish_year}
								onChange={this.handleType}
							></textarea>

							<label className="label">ISBN</label>
							<textarea
								className="input"
								name="isbn"
								value={this.state.isbn}
								onChange={this.handleType}
							></textarea>

							<label className="label">Номын хэмжээ өндөр өргөн</label>
							<textarea
								className="input"
								name="book_size"
								value={this.state.book_size}
								onChange={this.handleType}
							></textarea>

							<label className="label">Хуудасны тоо</label>
							<textarea
								className="input"
								name="book_pages"
								value={this.state.book_pages}
								onChange={this.handleType}
							></textarea>

							<label className="label">Эх номын нэр</label>
							<textarea
								className="input"
								name="book_created_author"
								value={this.state.book_created_author}
								onChange={this.handleType}
							></textarea>

							<label className="label">Эх номын газар</label>
							<textarea
								className="input"
								name="book_created_place"
								value={this.state.book_created_place}
								onChange={this.handleType}
							></textarea>

							<label className="label">Үйлдвэрлэсэн он</label>
							<textarea
								className="input"
								name="book_created_year"
								value={this.state.book_created_year}
								onChange={this.handleType}
							></textarea>

							<button
								className="button is-link is-outlined m-2"
								onClick={this.handleSave}
							>
								Ном оруулах
							</button>
							<button
								className="button is-success is-outlined m-2"
								onClick={this.goBack}
							>
								Цуцлах
							</button>

							{this.state.success && (
								<div className="notification is-success">
									{this.state.success}
								</div>
							)}
							{this.state.error && (
								<div className="notification is-warning">
									{this.state.error}
								</div>
							)}
						</div>
					</div>
				</div>
			</>
		);
	}
}
