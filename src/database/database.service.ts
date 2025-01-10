import { Inject, Injectable, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
// import { BookingGateway } from 'src/modules/booking/booking.gateway';

@Injectable()
export class DatabaseService {
  private readonly logger = new Logger(DatabaseService.name);

  constructor(
    @Inject('DATABASE_POOL') private pool: Pool,
   
  ) {}

  async executeQuery(queryText: string, values: any[] = []): Promise<any[]> {
    this.logger.log(`Executing query: ${queryText} (${values})`);
    return await this.pool
      .query(queryText, values)
      .then((result: QueryResult) => {
        this.logger.log(`Executed query, result size ${result.rows.length}`);
        return result.rows;
      });
  }

  onModuleInit(): any {
    this.pool.connect().then((client) => {
      client.on('notification', (notification) => {
        const payload =
          typeof notification.payload == 'string' &&
          notification.payload.includes('{')
            ? JSON.parse(notification.payload)
            : notification.payload;
        switch (notification.channel) {
          case 'notify_booking_status_change':
            
            break;
        }
      });
      client.query('LISTEN notify_booking_status_change');
    });
  }
}
