import perkiraanRouter from "./perkiraan.routes.js";
import jurnalRouter from "./JurnalUmun.router.js";
export const routers = (app) => {
  app.use("/api/v1/perkiraan", perkiraanRouter);
  app.use("/api/v1/jurnal", jurnalRouter);
  //   app.use("/api/v1/image", imageRouter);
  //   app.use("/api/v1/user", userRouter);
};
