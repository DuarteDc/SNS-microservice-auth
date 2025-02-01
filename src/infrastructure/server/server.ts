import { envs } from "../config/config";
import Express, { Router } from "express";


export default class Server {

    private readonly server: Express.Express
    constructor(private readonly apiRouter: Router) {
        this.server = Express()
    }

    async run() {
        this.server.listen(envs.PORT, () => {
            console.log(`Server running on port : ${envs.PORT}`)
        })
        this.server.use(this.apiRouter)
    }

}