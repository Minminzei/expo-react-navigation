import * as SQLite from 'expo-sqlite';
import * as _ from 'lodash';
import { Meta } from '@modules/model';
import { schema as Events } from './models/Events';
import { schema as Users } from './models/Users';
import { schema as EventUsers } from './models/EventUsers';
import { schema as Apps } from './models/Apps';

const path = 'APPS';
const schemaVersion = '1';
const db = SQLite.openDatabase(path, schemaVersion);

class Database {
  async initializeDatabase() : Promise<void> {
    try {
      const tables = [Events, Users, EventUsers, Apps];
      const promises = tables.map(schema => new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              `drop table if exists ${schema.name};`,
              [],
            );
            const dataType = Object.keys(schema.properties).map(index => {
              return `${index} ${schema.properties[index]}`;
            }).join(',');
            tx.executeSql(
              `create table if not exists ${schema.name} (${dataType});`,
              [],
            );
          },
          reject,
          resolve,
        );
      }));
      await Promise.all(promises);
    } catch (e) {
      throw e;
    }
  }

  async initializeTable(table: string, models: any[]) : Promise<any> {
    try {
      const promises = models.map(model => new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              `DELETE FROM ${table} WHERE id = ?`,
              [model.id],
            );
            const column: string[] = [];
            const values: string[] = [];
            Object.keys(model).forEach(index => {
              column.push(index);
              values.push(`'${model[index]}'`);
            });
            tx.executeSql(
              `INSERT INTO ${table} (${column.join(',')}) values (${values.join(',')})`,
              [],
            );
          },
          reject,
          resolve,
        );
      }));
      await Promise.all(promises);
    } catch (e) {
      throw e;
    }
  }

  async search(
    query: {
      sql: string,
      page: number;
      size: number;
      conditions?: any[];
      table: string;
    },
  ) : Promise<{
    meta: Meta;
    data: Object[];
  }> {
    try {
      return new Promise((resolve, reject) => {
        const from = (query.page - 1) * query.size;
        db.transaction(
          tx => {
            tx.executeSql(
              `${query.sql} LIMIT ${query.size} OFFSET ${from}`,
              query.conditions || [],
              async (transaction: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
                const { rows } = resultSet;
                const list: any[] = [];
                let index = 0;
                while (index < rows.length) {
                  const data = rows.item(index);
                  list.push(this.parse(data));
                  index += 1;
                }
                const currentPage = from ? Math.floor(from / query.size) + 1 : 1;
                const count = await this.getCount(query.sql);
                resolve({
                  meta: new Meta({
                    currentPage,
                    max: count,
                    size: query.size,
                  }),
                  data: list,
                });
              },
              (transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                console.error(error);
                reject(error);
                return true;
              },
            );
          });
      });
    } catch (e) {
      throw e;
    }
  }

  async get(table: string, id: string) : Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              `SELECT * FROM ${table} WHERE id = ?`,
              [id],
              (transaction: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
                const { rows } = resultSet;
                const data = rows.item(0);
                if (data) {
                  resolve(this.parse(data));
                } else {
                  resolve(null);
                }
              },
              (transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                reject(error);
                return true;
              },
            );
          });
      });
    } catch (e) {
      throw e;
    }
  }

  async save(table: string, model) : Promise<void> {
    try {
      return new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              `DELETE FROM ${table} WHERE id = ?`,
              [model.id],
            );
            const column: string[] = [];
            const values: string[] = [];
            Object.keys(model).forEach(index => {
              column.push(index);
              values.push(`'${model[index]}'`);
            });
            tx.executeSql(
              `INSERT INTO ${table} (${column.join(',')}) values (${values.join(',')})`,
              [],
            );
          },
          reject,
          () => resolve(model),
        );
      });
    } catch (e) {
      throw e;
    }
  }

  async delete(table: string, id: number) : Promise<null> {
    try {
      return await new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              `DELETE FROM ${table} WHERE id = ?`,
              [id],
              (transaction: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
                resolve(null);
              },
              (transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                reject(error);
                return true;
              },
            );
          },
          reject,
          resolve,
        );
      });
    } catch (e) {
      throw e;
    }
  }

  createColumnWithAilias(schemas:any[]) : string {
    const columns: string[] = [];
    schemas.forEach(schema => {
       Object.keys(schema.properties).map(column => columns.push(`${schema.name}.${column} as ${schema.name}__${column}`));
    });
    return columns.join(', ');
  }

  private parse(data) : any {
    const result: any = {};
    Object.keys(data).map(column => {
      const columns = column.split('__');
      if (columns.length > 1) {
        const table = columns[0];
        if (!result[table]) {
          result[table] = {};
        }
        result[table][columns[1]] = data[column];
      } else {

        result[column] = data[column];
      }
    });
    return result;
  }

  private async getCount(sql: string) : Promise<number> {
    try {
      const list = sql.toLowerCase().split('from');
      const countSql = `SELECT COUNT(*) as count FROM ${_.slice(list, 1, list.length).join('FROM')}`;
      return await new Promise((resolve, reject) => {
        db.transaction(
          tx => {
            tx.executeSql(
              countSql,
              [],
              (transaction: SQLite.SQLTransaction, resultSet: SQLite.SQLResultSet) => {
                const { rows } = resultSet;
                const data = rows[0];
                if (data) {
                  resolve(data.count);
                } else {
                  resolve(0);
                }
              },
              (transaction: SQLite.SQLTransaction, error: SQLite.SQLError) => {
                reject(error);
                return true;
              },
            );
          });
      });
    } catch (e) {
      throw e;
    }
  }
}

const database = new Database();
export default database;
