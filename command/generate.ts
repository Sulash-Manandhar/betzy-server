#!/usr/bin/env node

import fs from "fs";
import path from "path";

// Get module name from command line argument
const moduleName = process.argv[2];

if (!moduleName) {
  console.error("❌ Please provide a module name");
  console.log("Usage: node generate-module.js <module-name>");
  process.exit(1);
}

// Convert to PascalCase for class names
const toPascalCase = (str: string) => {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
};

const toCamelCase = (str: string) => {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
};

const camelName = toCamelCase(moduleName);

const baseDir = path.join(process.cwd(), "src", "modules", moduleName);

if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

const controllerTemplate = `
import { asyncValidationHandler } from "@/helpers/asyncHandler";
import { HTTPStatusCode } from "@/utils/packages";
import ${camelName}Service from './${camelName}.service';
import { basicSchema } from "@/core/schema";
import { asyncHandler } from "@/helpers/asyncHandler";
import type { Request, Response } from "express";

const ${camelName}Controller = {
  basic: asyncValidationHandler<any>(basicSchema)(
    async (req, res, validated) => {
      res.status(HTTPStatusCode.CREATED).json(response);
    }
  ),
  basic2: asyncHandler(async (req:Request, res:Response)=>{})
}
export default ${camelName}Controller;

`;

const serviceTemplate = `
import ${camelName}Repo from './${camelName}.repo';

const ${camelName}Service = {
  basic: async ()=>{
    try{
    
    }
    catch(error){
    throw error;
    }
}

export default ${camelName}Service;
`;

const repositoryTemplate = `
import prisma from "@/config/database";

const ${camelName}Repo = {
    basic: () =>{}
}

export default ${camelName}Repo;
`;

const schemaTemplate = `
import z from "zod";

/** Basic schema template
 * z.object({
 * body:z.object({}),
 * query:z.object({}), (?limit, ?page)
 * params:z.object({}) (/:id)
 * })
 **/

export const basic = z.object({
    body:z.object({}),
    query:z.object({}),
    params:z.object({})
})
`;

// Write files
const files = [
  {
    path: path.join(baseDir, `${moduleName}.controller.ts`),
    content: controllerTemplate,
  },
  {
    path: path.join(baseDir, `${moduleName}.service.ts`),
    content: serviceTemplate,
  },
  {
    path: path.join(baseDir, `${moduleName}.repo.ts`),
    content: repositoryTemplate,
  },
  {
    path: path.join(baseDir, `${moduleName}.schema.ts`),
    content: schemaTemplate,
  },
];

files.forEach((file) => {
  fs.writeFileSync(file.path, file.content);
  console.log(`✅ Created: ${file.path}`);
});

console.log(`\n🎉 Module '${moduleName}' generated successfully!`);
console.log(`\n📁 Structure created at: ${baseDir}`);
