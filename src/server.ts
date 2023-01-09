require("dotenv").config();
import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import { IndexRouter } from "./controllers/v0/index.router";
import { V0MODELS } from "./controllers/v0/model.index";
import { sequelize } from "./sequelize";

(async () => {
	await sequelize.addModels(V0MODELS);
	await sequelize.sync();

	const app = express();
	const port = process.env.PORT || 8080; // default port to listen

	app.use(bodyParser.json());

	//CORS Should be restricted
	app.use(function (req: Request, res: Response, next: NextFunction) {
		res.header("Access-Control-Allow-Origin", "http://localhost:8100");
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept, Authorization"
		);
		next();
	});

	app.use("/api/v0/", IndexRouter);

	// Root URI call
	app.get("/", async (req: Request, res: Response) => {
		res.send("/api/v0/");
	});

	// Start the Server
	app.listen(port, () => {
		console.log(`server running http://localhost:${port}`);
		console.log(`press CTRL+C to stop server`);
	});
})();
