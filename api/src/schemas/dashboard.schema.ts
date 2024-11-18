import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongoSchema } from 'mongoose';

export type DashboardDocument = HydratedDocument<Dashboard>;

@Schema()
export class Dashboard {
  @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop()
  items: {
    _id: string;
    color: string;
    name: string;
    url: string;
    positions: [number, number][];
  }[];
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
