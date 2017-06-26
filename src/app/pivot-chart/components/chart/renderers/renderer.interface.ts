import { CQL_AST } from "../../../modules/cql_ast.module";

export interface Renderer {
    render(cql_ast: CQL_AST, data: any, title?: string): void;
}