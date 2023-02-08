import SwaggerJsDoc from 'swagger-jsdoc';

import {Dictionary} from "@src/constants/AssignmentInterfaces";
import FullPaths from "@src/helper/FullPaths";

const options: Dictionary = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Assignment for UniBlox",
            version: "0.1.0",
            description: "this is an API application for a simple e-commerce store with cart and checkout functionality"
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "local development server"
            }
        ]
    },
    apis: ["./src/routes/**/*.ts", "./src/schemaobjects/**/*.ts"]
}

export const DocumentationPath: string = FullPaths.Docs.Base;
export const SwaggerSpecifications = SwaggerJsDoc(options);