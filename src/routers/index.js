import perkiraanRouter from "./perkiraan.routes.js";
export const routers = (app) => {
  app.use("/api/v1/perkiraan", perkiraanRouter);
  //   app.use("/api/v1/image", imageRouter);
  //   app.use("/api/v1/user", userRouter);
};
