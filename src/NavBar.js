import React from "react";

import { Link } from "react-router-dom";

export default function NavBar({ onLogout, onLogin }) {
	return (
		<div className="container">
			<nav
				className="navbar m-4"
				role="navigation"
				aria-label="main navigation"
			>
				<nav className="navbar" role="navigation" aria-label="main navigation">
					<Link className="button is-primary is-light" to="/books">
						<strong>Лого байна</strong>
					</Link>

					<Link className="button is-primary is-light" to="/books">
						<strong>Номууд</strong>
					</Link>

					{/* <Link className="button is-success is-light" to="/books/insertbook">
						<strong>Шинэ ном нэмэх</strong>
					</Link> */}

					<Link className="button is-success is-light" to="/about">
						<strong>Бидний тухай</strong>
					</Link>
				</nav>
				<div className="navbar-end">
					<div className="navbar-item">
						<div className="buttons">
							{/* <a className="button is-primary is-light" onClick={onLogin}>
								<strong>Нэвтрэх</strong>
							</a> */}
							<a
								id="logout"
								className="button is-primary is-danger"
								onClick={onLogout}
							>
								Гарах
							</a>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
}
