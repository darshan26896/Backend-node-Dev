 import * as _ from "lodash";
import { ResponseBuilder } from "../../../helpers/responseBuilder";
import { Types } from "mongoose";
import { Platform } from "../platform/platformSchema";
import { Training } from "../training/trainingSchema";
import { TrainingEmp } from "../trainingemployee/trainingempSchema";
import { Utils } from "../../../helpers/utils";
import { Jwt } from "../../../helpers/jwt";
export class PlatformUtils {


  /**
   * Employee : Add  Training data
   * @param : any
   * @returns  nothing for the data
   */
  public async create(userDetail: Json) {
    const platform = new Platform(userDetail);
    return await platform.save();
  }
  public async getById(req: any) {
    const reqArr = [
      {
        $match: {
          '_id': Types.ObjectId(req.params.id),
        },
      },
    ]
    return await Platform.aggregate(reqArr).exec();
  }
  
  /**
   * Employee : Update Traning For employee
   * @param : any

   * @returns 
   */
  
  // Get event details by id
  public async getTraningName(req: any) {
    //console.log(req);
   // return await Dashboard.findOne({_id: req.params.id})

   const reqArr = [
    {
      $match: {
         'emp_id': Types.ObjectId(req.params.id)
      }
    },
    {
      $lookup: {
        from: 'trainings',
        localField: 'training_id',
        foreignField: '_id',
        as: 'training'
        
      },
      
    },
    // {
    //   $lookup: {
    //     from: 'users',
    //     localField: 'emp_id',
    //     foreignField: '_id',
    //     as: 'user'
        
    // },
    
    //   $match: {
    //     'user._id': Types.ObjectId(req.params.id),
    //  },
    // },
    {
      $lookup: {
        from: 'users',
        localField: 'training.mentor',
        foreignField: '_id',
        as: 'mentors'
        
      },
    },
    
  ];
  req.reqArr = reqArr;
  return await TrainingEmp.aggregate(req.reqArr).exec();
  }
}