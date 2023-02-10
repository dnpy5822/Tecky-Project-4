import { Knex } from "knex";

export class TripService {
    constructor(private knex: Knex) { }

    async checkDuplicate(values: string, user_id: string | number) {
        const result = await this.knex
            .select("schedule.name")
            .from("user_schedule")
            .join("schedule", "schedule.id", "=", "user_schedule.schedule_id")
            .where("user_schedule.user_id", "=", user_id)
            .andWhere("schedule.name", "=", values);

        return result;
    }

    async createTrip(
        values: { nameOfTrip: string; privacy: string },
        userId: string | number
    ) {
        const schedule_id = await this.knex
            .insert({
                name: values.nameOfTrip,
                privacy: values.privacy,
            })
            .into("schedule")
            .returning("id");

        await this.knex
            .insert({
                user_id: userId,
                schedule_id: schedule_id[0].id,
            })
            .into("user_schedule");
    }

    async getPlansFromServer(user_id: number | string) {
        let scheduleData = await this.knex
            .select(
                "schedule.id",
                "schedule.name",
                "user.username",
                "schedule.privacy",
                "activity_image.image"
            )
            .count("content.id as count")
            .from("user")
            .join("user_schedule", "user_schedule.user_id", "=", "user.id")
            .join("schedule", "schedule.id", "=", "user_schedule.schedule_id")
            .leftJoin("content", "content.schedule_id", "=", "schedule.id")
            .leftJoin("activity", "activity.id", "=", "content.activity_id")
            .leftJoin(
                "activity_image",
                "activity_image.activity_id",
                "=",
                "activity.id"
            )
            .where("user_schedule.user_id", "=", user_id)
            .groupBy(
                "content.id",
                "schedule.id",
                "schedule.name",
                "user.username",
                "schedule.privacy",
                "activity_image.image"
            );

        let map = new Map();
        for (let v of scheduleData) {
            if (map.has(v.id)) {
                let oldObj = map.get(v.id);
                oldObj.count++;
                map.set(v.id, { ...oldObj });
            } else {
                map.set(v.id, { ...v, count: 1 });
            }
        }

        // console.log("scheduleData from service: ", scheduleData);
        let data = Array.from(map);

        return { scheduleData: data.map((v) => v[1]) };
    }

    async getSavedActivityFromServer(user_id: number | string) {
        let savedActivityData = await this.knex
            .select(
                "schedule.id",
                "activity.id as activity_id",
                "schedule.name",
                "activity.name as activity",
                "activity_image.image"
            )
            .from("user_schedule")
            .join("schedule", "schedule.id", "=", "user_schedule.schedule_id")
            .join("content", "content.schedule_id", "=", "schedule.id")
            .join("activity", "activity.id", "=", "content.activity_id")
            .leftJoin(
                "activity_image",
                "activity_image.activity_id",
                "=",
                "activity.id"
            )
            .where("user_schedule.user_id", "=", user_id);

        // console.log("savedActivityData from service: ", savedActivityData);

        return { savedActivityData };
    }

    async getTripListFromServer(user_id: number | string) {
        let tripData = await this.knex
            .select("schedule.id", "schedule.name")
            .from("user_schedule")
            .join("schedule", "schedule.id", "=", "schedule_id")
            .where("user_schedule.user_id", "=", user_id);

        return { tripData };
    }

    async checkIsSaved(userId: number, activityId: number) {
        // console.log("activityId from service: ", activityId);

        let isSaved = await this.knex
            // .select("*")
            .select("content.activity_id")
            .from("user_schedule")
            .join("schedule", "schedule.id", "=", "user_schedule.schedule_id")
            .join("content", "content.schedule_id", "=", "schedule.id")
            .where("user_schedule.user_id", "=", userId)
            .andWhere("content.activity_id", "=", activityId);

        // let isSaved = await this.knex

        // console.log("isSaved from service: ", isSaved);

        return { isSaved };
    }

    async getActivityDetail() {
        let activityDetail = await this.knex
            .select(
                "activity.id",
                "activity.name",
                "activity.type",
                "activity.rating",
                "country.name as country",
                "activity_image.image"
            )
            .from("activity")
            .leftJoin("country", "activity.id", "=", "country.activity_id")
            .leftJoin(
                "activity_image",
                "activity_image.activity_id",
                "=",
                "activity.id"
            );

        return { activityDetail };
    }

    async insertActivity(dataToInsert: {
        activityId: number;
        tripId: string;
        eventDate: string;
        eventStartTime: string;
        eventEndTime: string;
    }) {
        // console.log("dataToInsert: ", dataToInsert);

        await this.knex
            .insert({
                schedule_id: dataToInsert.tripId,
                day: dataToInsert.eventDate,
                activity_id: dataToInsert.activityId,
                start_time: dataToInsert.eventStartTime,
                end_time: dataToInsert.eventEndTime,
            })
            .into("content");
    }

    async deleteSavedActivity(data: {}, userId: number) {
        await this.knex("content")
            .join("schedule", "schedule.id", "=", "content.schedule_id")
            .join("user_schedule", "user_schedule.schedule_id", "=", "schedule.id")
            .where("content.activity_id", "=", data)
            .andWhere("user_schedule.user_id", "=", userId)
            .delete();
    }

    async getSearchedActivityDetail(keyword: string) {
        // console.log("keyword from service: ", keyword);

        let searchResult = await this.knex
            .select(
                "activity.id",
                "activity.name",
                "activity.type",
                "activity.rating",
                "country.name as country",
                "activity_image.image"
            )
            .from("activity")
            .leftJoin("country", "activity.id", "=", "country.activity_id")
            .leftJoin(
                "activity_image",
                "activity_image.activity_id",
                "=",
                "activity.id"
            )
            .leftJoin("activity_tag", "activity_tag.activity_id", "=", "activity.id")
            .leftJoin("tag", "tag.id", "=", "activity_tag.tag_id")
            .where("activity.name", "=", keyword)
            .orWhere("tag.name", "=", keyword)
            .orWhere("country.name", "=", keyword);

        return { searchResult };
    }

    async deleteTrip(tripId: number) {
        // console.log("tripId from service: ", tripId);

        await this.knex("content").where("schedule_id", "=", tripId).delete();

        await this.knex("user_schedule").where("schedule_id", "=", tripId).delete();

        await this.knex("schedule").where("schedule.id", "=", tripId).delete();
    }

    async activityDetailPage(activityId: number) {
        let result = await this.knex
            .select("activity.name", "activity.opening_time", "activity.closing_time", "activity.description", "activity.rating", "activity_image.image")
            .from("activity")
            .join("activity_image", "activity_image.activity_id", "=", "activity.id")
            .where("activity.id", "=", activityId)
            .first()

        return { result };
    }
}
