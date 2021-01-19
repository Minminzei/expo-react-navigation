import { validateSync } from 'class-validator';

const validate = (model): string | null => {
  const res = validateSync(model);
  if (res.length > 0) {
    const errors = res.map(row =>
      (Object).values(row.constraints as { [type: string]: string; })[0]);
    return errors.join('\n');
  }
  return null;
};

export default validate;
