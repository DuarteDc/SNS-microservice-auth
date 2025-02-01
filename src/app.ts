import { apiRouter } from "./infrastructure/server/routes/apiRouter";
import Server from "./infrastructure/server/server";

async function bootstrap() {
    const server = new Server(apiRouter())
    server.run();
}


(() => {
    bootstrap()
})()