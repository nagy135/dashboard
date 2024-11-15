import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DashboardDocument = HydratedDocument<Dashboard>;

@Schema()
export class Dashboard {
  @Prop()
  id: string;

  @Prop()
  color: string;

  @Prop()
  positions: number[][];
}

export const DashboardSchema = SchemaFactory.createForClass(Dashboard);
