import type { DMMF } from '@prisma/generator-helper';

export function modelToSchemas(model: DMMF.Model): string {
  const modelFields = model.fields
    .filter(f => f.kind === 'scalar')
    .map(fieldToZod)
    .join(',\n');

  const createFields = model.fields
    .filter(f => f.kind === 'scalar')
    .filter(f => !f.hasDefaultValue && !f.isGenerated && !f.isUpdatedAt)
    .map(fieldToZod)
    .join(',\n');

  return `
import { z } from 'zod';

export const ${model.name}ModelSchema = z.object({
${modelFields}
});

export const ${model.name}CreateSchema = z.object({
${createFields}
});
`.trim();
}

function fieldToZod(field: DMMF.Field): string {
  let zodType = prismaScalarToZod(field.type);

  if (!field.isRequired) {
    zodType += '.nullable()';
  }

  if (field.isList) {
    zodType = `z.array(${zodType})`;
  }

  return `  ${field.name}: ${zodType}`;
}

function prismaScalarToZod(type: string): string {
  switch (type) {
    case 'String': return 'z.string()';
    case 'Int': return 'z.number().int()';
    case 'Float': return 'z.number()';
    case 'Boolean': return 'z.boolean()';
    case 'DateTime': return 'z.date()';
    case 'Json': return 'z.unknown()';
    default: return 'z.any()';
  }
}
