import mongoose, { Schema, Document, Types, PopulatedDoc } from "mongoose";
import { IProjectDocument } from "./Project";

const taskStatus = {
  PENDING: 'pending',
  ON_HOLD: 'onHold',
  IN_PROGRESS: 'inProgress',
  UNDER_REVIEW: 'underReview',
  COMPLETED: 'completed'
} as const

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

export interface ITask {
  name: string,
  description: string,
  project: Types.ObjectId | PopulatedDoc<IProjectDocument>,
  status: TaskStatus
}

export interface ITaskDocument extends ITask, Document {}

const TaskSchema = new Schema<ITaskDocument>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  project: {
    type: Types.ObjectId,
    ref: 'Project',
    required: true
  },
  status: {
    type: String,
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  }
}, {timestamps: true})

const Task = mongoose.model<ITaskDocument>('Task', TaskSchema)

export default Task
