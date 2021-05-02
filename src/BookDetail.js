import React, { Component } from "react";
import axios from "./axios";
import { Swiper, SwiperSlide } from "swiper/react";

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
					<div className="media-content">
						<div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
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
							<input
								className="input"
								name="name"
								value={this.state.name}
								onChange={this.handleType}
							></input>

							<div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
								<div className="column is-one-quarter">
									<label className="label">Зураг 1</label>
									<input
										className="input"
										name="photo"
										value={this.state.photo}
										onChange={this.handleType}
									></input>
								</div>
								<div className="column is-one-quarter">
									<label className="label">Зураг 2</label>
									<input
										className="input"
										name="photo_1"
										value={this.state.photo_1}
										onChange={this.handleType}
									></input>
								</div>
								<div className="column is-one-quarter">
									<label className="label">Зураг 3</label>
									<input
										className="input"
										name="photo_2"
										value={this.state.photo_2}
										onChange={this.handleType}
									></input>
								</div>

								<div className="column is-one-quarter">
									<label className="label">Зураг 4</label>
									<input
										className="input"
										name="photo_3"
										value={this.state.photo_3}
										onChange={this.handleType}
									></input>
								</div>
							</div>

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
								Хадгалах
							</button>

							<button
								className="button is-danger is-outlined m-2"
								onClick={this.handleDelete}
							>
								Устгах
							</button>

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
