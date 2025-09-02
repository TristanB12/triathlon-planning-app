import { z } from "zod";

const ActivitySchema = z.object({
  planned_on: z.string().date().describe("Date the activity is planned for, based on the goal's date, in ISO 8601 format"),
  name: z.string().describe("short title of the workout"),
  sport_type: z.enum(["RUNNING", "CYCLING", "SWIMMING"]),
  duration: z.number().int().nonnegative().describe("Duration in seconds"),
  distance: z.number().int().nonnegative().describe("Distance in meters"),
  intensity: z.number().int().min(1).max(5).describe("Intensity from 1 (easy) to 5 (hard)"),
  description: z.string().describe("Detailed workout instructions in HTML format.")
});

export const TrainingPlanSchema = z.object({
  activities: z.array(ActivitySchema)
})

export type TrainingPlanSchemaType = z.infer<typeof TrainingPlanSchema>;