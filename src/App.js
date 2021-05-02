import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "./axios";
import Login from "./Login";
import Books from "./Books";
import BookDetail from "./BookDetail";
import BookDetailUsers from "./BookDetailUsers";
import AddBook from "./AddBook";
import NavBar from "./NavBar";

export default class App extends Component {
	state = {
		token: null,
	};

	handleLogin = (token) => {
		this.setState({ token });
		localStorage.setItem("token", token);
		this.router.history.push("/books");
	};

	handleLogout = () => {
		axios
			.get("users/logout")
			.then((result) => {
				this.router.history.push("/login");
			})
			.catch((err) => console.log(err));
	};

	render() {
		return (
			<Router ref={(router) => (this.router = router)}>
				<div className="container is-clipped">
					<NavBar onLogout={this.handleLogout} />
					<div className="container">
						<Switch>
							<Route exact path="/" component={Books} />
							<Route exact path="/books" component={Books} />
							<Route path="/books/insertbook" component={AddBook} />
							<Route path="/books/:id/edit" component={BookDetail} />
							<Route path="/books/:id" component={BookDetailUsers} />
							<Route
								path="/login"
								render={() => <Login onLogin={this.handleLogin} />}
							/>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}
