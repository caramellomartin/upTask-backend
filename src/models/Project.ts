import mongoose, { Schema, Document, PopulatedDoc, Types } from "mongoose";
import { ITaskDocument } from "./Task";

export interface IProject {
  projectName: string,
  clientName: string,
  description: string,
  tasks: Types.ObjectId[] | PopulatedDoc<ITaskDocument>[]
}

export interface IProjectDocument extends IProject, Document {}

const ProjectSchema = new Schema<IProjectDocument>({
  projectName: {
    type: String,
    required: true,
    trim: true
  },
  clientName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  tasks: [
    {
      type: Types.ObjectId,
      ref: 'Task'
    }
  ]
}, {timestamps: true})

const Project = mongoose.model<IProjectDocument>('Project', ProjectSchema)

export default Project
