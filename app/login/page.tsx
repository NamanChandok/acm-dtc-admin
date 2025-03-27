"use client";
import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "@/firebase";

const LoginPage: React.FC = () => {
	const auth = getAuth(app);
	const [error, setError] = useState<string | null>(null);
	const [login, setLogin] = useState("Login");

	const handleSubmit = (event: any) => {
		event.preventDefault();
		const password = event.target.password.value;
		signInWithEmailAndPassword(auth, "acmuser@yopmail.com", password)
			.then((userCredential) => {
				const user = userCredential.user;
				user.getIdToken().then((token) => {
					fetch("/api/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ token: token }),
					})
						.then((res) => {
							if (res.ok) {
								window.location.href = "/";
							}
						})
						.catch((err) => {
							console.log(err);
							setError("An error occurred. Please try again later.");
							setLogin("Login");
						});
				});
			})
			.catch((error) => {
				const errorCode = error.code;
				console.log(errorCode);
				if (errorCode === "auth/invalid-credential") {
					setError("Invalid Credential");
				}
				if (errorCode === "auth/too-many-requests") {
					setError("Too many requests, please try again later");
				}
				setLogin("Login");
			});
		setLogin("Logging in...");
		setError(null);
	};

	return (
		<div className="md:p-24 p-8">
			<h1 className="text-2xl pb-4 font-semibold">Enter Password to Access</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					required
					label="Password"
					name="password"
					type="password"
					variant="outlined"
					fullWidth
					className="mb-4"
				/>
				<Button
					type="submit"
					variant="contained"
					disableElevation
					color="primary"
				>
					{login}
				</Button>
				<p>{error}</p>
			</form>
		</div>
	);
};

export default LoginPage;
