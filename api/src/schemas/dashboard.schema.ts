import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DashboardDocument = HydratedDocument<Dashboard>;

@Schema()
export class Dashboard {
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
