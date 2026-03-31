import { Request } from "express";

export interface ProjectRequest extends Request {
    params: {
        projectId: string;
    };
}