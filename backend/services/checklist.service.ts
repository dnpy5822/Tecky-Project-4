import { Knex } from "knex";

export class CheckListService {
  //@ts-ignore
  constructor(private knex: Knex) {}

  async getCheckList(schedule_id: number) {
    console.log("accessed to service", schedule_id);
    let data = await this.knex
      .from("checklist")
      .join("user", "user.id", "=", "checklist.user_id")
      .select(
        "checklist.id as id",
        "content",
        "isChecked",
        "created_at as createdAt",
        "user.id as userID",
        "username"
      )
      .where("checklist.schedule_id", "=", schedule_id);

    //   console.log("data selected from service", data);
    return data;
  }

  async deleteCheckList(checklistID: number) {
    console.log("checklist ID to service", checklistID);
    await this.knex("checklist").where("id", "=", checklistID).del();
  }

  async addChecklist(userID: number, inputValue: string, scheduleID: number) {
    console.log("input to service", userID, inputValue, scheduleID);
    await this.knex
      .insert({
        schedule_id: scheduleID,
        user_id: userID,
        content: inputValue,
        isChecked: false,
      })
      .into("checklist");
  }

  async updateChecklist(status: boolean, checklistID: number) {
    console.log("data to service", status, checklistID);
    await this.knex("checklist")
      .update({ isChecked: status })
      .where("id", "=", checklistID);
  }
}
