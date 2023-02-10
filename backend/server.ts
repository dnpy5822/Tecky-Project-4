import express from "express";
import cors from "cors";
import { print } from "listening-on";
import { Request, Response } from "express";
import { userRoutes } from "./routes/user.routes";
import { tripRoutes } from "./routes/trip.routes";
import { mapRouter } from "./routes/map.routes";
import { scheduleRouter } from "./routes/schedule.routes";
import { inputBarRouter } from "./routes/inputbar.routes";
import { shareScheduleRouter } from "./routes/shareschedule.routes";
import { FormidableRouter } from "./routes/formidable.routes";
import { checklistRouter } from "./routes/checklist.routes";
import { adminRouter } from "./routes/admin.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("uploads"));

app.get("/", function (req: Request, res: Response) {
  res.end("Hello");
});

app.use(userRoutes);
app.use(tripRoutes);
app.use(mapRouter);
app.use(scheduleRouter);
app.use(inputBarRouter);
app.use(shareScheduleRouter);
app.use(FormidableRouter);
app.use(checklistRouter);
app.use(adminRouter);

app.use(express.static("public"));

const PORT = 8080;

app.listen(PORT, () => {
  print(PORT);
});
