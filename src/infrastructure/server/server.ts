import { envs } from "../config/config";
import Express, { Router } from "express";


export default class Server {

    private readonly server: Express.Express
    constructor(private readonly apiRouter: Router) {
        this.server = Express()
    }

    async run() {
        this.server.use(Express.urlencoded())
        this.server.use(Express.json())

        this.server.use(this.apiRouter)
        this.server.listen(envs.PORT, () => {
            console.log(`Server running on port : ${envs.PORT}`)
        })
    }

}