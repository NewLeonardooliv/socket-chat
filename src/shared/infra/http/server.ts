import { server } from "./app";

const port = process.env.PORT || 3030

server.listen(port, () => console.log(`Servidor Online - localhost:${port}`));
