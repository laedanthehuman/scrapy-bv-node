import cluster from "cluster";
import os from "os";

const CPUS = os.cpus();
if (cluster.isMaster) {
  CPUS.forEach(() => cluster.fork());
  cluster.on("escutando", worker => {
    console.log("Cluster %d conectado", worker.process.pid);
  });
  cluster.on("disconnect", worker => {
    console.log("Cluster %d desconectado", worker.process.pid);
  });
  cluster.on("exit", worker => {
    console.log("Cluster %d morreu", worker.process.pid);
    cluster.fork();
    // Ensure to starts a new cluster if an old one dies
  });
} else {
  require("./index.js");
}
