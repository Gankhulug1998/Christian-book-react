import React, { Component } from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

import Spinner from "./Spinner";

export default class Books extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: null,
			item: null,
			loading: false,
			books: [],
			pagination: [],
			value: "",
			is_current: "pagination-link is-current",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	enterKeyBlock(event) {
		if (event.key === "Enter") {
			event.preventDefault();
		}
	}
	handleChange(event) {
		this.setState({ value: event.target.value });
	}

	handleSubmit(event) {
		this.setState({ loading: true, books: [] });
		axios
			.post("books/search", {
				search_book: this.state.value,
			})
			.then((result) => {
				this.setState({
					books: result.data.data,
					loading: false,
				});
			})
			.catch((err) => this.setState({ error: err.response, loading: false }));
	}

	componentDidMount = (e) => {
		this.setState({ loading: true });
		axios
			.get("books?limit=52")
			.then((result) => {
				this.setState({
					books: result.data.data,
					pagination: result.data.pagination,
					loading: false,
				});
			})
			.catch((err) => this.setState({ error: err.response, loading: false }));
	};

	paginationCount = (e) => {
		const elements = document.getElementsByClassName(
			"pagination-link is-current",
		);
		try {
			elements[0].className = "pagination-link";
		} catch (e) {
			console.log(e);
		}
		this.setState({ loading: true });
		e.target.className = this.state.is_current;
		axios
			.get(`books?limit=52&page=${e.target.innerText}`)
			.then((result) => {
				this.setState({
					books: result.data.data,
					pagination: result.data.pagination,
					loading: false,
				});
			})
			.catch((err) => this.setState({ error: err.response, loading: false }));
	};

	statelessComp = () => {
		let arr = Array.apply(null, {
			length: this.state.pagination.pageCount,
		}).map(Number.call, Number);
		return (
			<ul className="pagination-list">
				{arr.map((item) => {
					return (
						<li key={item}>
							<a
								onClick={this.paginationCount}
								className="pagination-link"
								aria-label="Page"
								aria-current="page"
							>
								{item + 1}
							</a>
						</li>
					);
				})}
			</ul>
		);
	};

	render() {
		return (
			<div className="container is-max-desktop">
				<div className="columns is-vcentered">
					<div className="column is-8">
						<h1 className="is-primary is-size-2 ml-4">Номын сан</h1>
					</div>
					<div className="column">
						<h1 className="is-primary is-size-4 ml-4">Библи номын цоморлиг</h1>

						<div className="columns m-4 is-mobile">
							<form className="field">
								<label className="label">
									<div className="control">
										<input
											className="input"
											type="text"
											placeholder="Хайх номын нэр"
											value={this.state.value}
											onKeyDown={this.enterKeyBlock}
											onChange={this.handleChange}
										/>
									</div>
								</label>
							</form>
							<div className="control ml-2">
								<div className="button is-link" onClick={this.handleSubmit}>
									Хайх
								</div>
							</div>
						</div>
					</div>
				</div>
				{this.state.loading ? (
					<Spinner />
				) : (
					<div className="container">
						<div className="columns is-multiline">
							{this.state.books.map((el) => (
								<div key={el._id} className="column is-3 has-text-centered">
									<Link to={`books/${el._id}`}>
										<img
											style={{ width: "100%" }}
											style={{ height: "25vh" }}
											src={`https://i.postimg.cc/` + el.photo}
										/>
									</Link>
									<p className="mt-4 has-text-centered">{el.name}</p>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="columns is-mobile is-centered my-6">
					<nav className="pagination" role="navigation" aria-label="pagination">
						{/* {this.state.pagination.start != 1 && (
							<button
								className="pagination-previous"
								title="This is the first page"
							>
								Өмнөх хуудас
							</button>
						)} */}
						{this.statelessComp()}

						{/* {!this.state.pagination.nextPage ||
							(this.state.pagination.pageCount != 1 && (
								<button className="pagination-next">Дараагийн хуудас</button>
							))} */}
					</nav>
				</div>
				<div className="columns is-mobile is-centered my-6"></div>
				<footer className="footer">
					<div className="content has-text-centered">
						<p>Хэрэв та манай үйл ажиллагааг дэмжиж байвал хандив өргөөрэй</p>
					</div>
				</footer>
			</div>
		);
	}
}
