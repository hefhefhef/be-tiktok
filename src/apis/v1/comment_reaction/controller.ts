import { NextFunction, Request, Response } from 'express';

import { ApiResponse, Meta } from 'utils/rest';
import * as service from './service';
import * as queries from './queries';

export const commentReaction = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await service.commentReaction(req, next);
  if (result) new ApiResponse(result, 'OK', 200, Date.now() - req.startTime).send(res);
};

export const getAllUserReactComment = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const result = await queries.getAllUserReactComment(req, next);
  const meta = new Meta(result?.currentPage, result?.length, result?.total);
  if (result) new ApiResponse(result.data, 'OK', 200, Date.now() - req.startTime, Object(meta)).send(res);
};
