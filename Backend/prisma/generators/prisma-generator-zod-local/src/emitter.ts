import { DMMF } from '@prisma/generator-helper';
import { modelToSchemas } from "./zod-mapper.js"
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const schemaTypes = ['Model', 'Create']

function renderTypes(modelName: string): string {
    let code = 'import { z } from "zod";\n\n';
    code += schemaTypes.map(type =>
        `export declare const ${modelName}${type}Schema: z.ZodObject<any>;\n` +
        `export type ${modelName}${type} = z.infer<typeof ${modelName}${type}Schema>;\n`
    ).join('\n');
    return code.trim();
}

export function emitSchema(
    outputDir: string,
    model: DMMF.Model,
) {
    const modelName = model.name
    mkdirSync(outputDir, { recursive: true })

    const baseName = `${modelName}.schema`

    writeFileSync(
        join(outputDir, `${baseName}.js`),
        modelToSchemas(model),
        'utf8',
    )

    writeFileSync(
        join(outputDir, `${baseName}.d.ts`),
        renderTypes(modelName),
        'utf8',
    )
}

export function emitIndex(
    outputDir: string,
    modelNames: string[],
) {
    let exportMap = new Map<string, string[]>();
    let jsLines: string[] = [];
    let dtsLines: string[] = [];

    for (const name of modelNames) {
        exportMap.set(name, schemaTypes.map(type => `${name}${type}`));
    }

    exportMap.forEach((types, modelName) => {
        const schemaLine = `export { ${types.map(t => `${t}Schema`).join(', ')} } from "./${modelName}.schema.js";`
        jsLines.push(schemaLine);
        dtsLines.push(schemaLine);
        dtsLines.push(`export type { ${types.join(', ')} } from "./${modelName}.schema.js";`);
    });

    writeFileSync(
        join(outputDir, 'index.js'),
        jsLines.join('\n') + '\n',
        'utf8',
    )

    writeFileSync(
        join(outputDir, 'index.d.ts'),
        dtsLines.join('\n') + '\n',
        'utf8',
    )
}