import { Mapping } from "@solidity-parser/parser/dist/ast-types";

import { Location, FinderType, Node } from "./Node";

export class MappingNode implements Node {
    type: string;
    uri: string;
    astNode: Mapping;

    nameLoc?: Location | undefined;

    parent?: Node | undefined;
    children: Node[] = [];

    constructor (mapping: Mapping, uri: string) {
        this.type = mapping.type;
        this.uri = uri;
        this.astNode = mapping;
        // TO-DO: Implement name location for rename
    }

    getName(): string | undefined {
        return undefined;
    }

    addChild(child: Node): void {
        this.children.push(child);
    }

    setParent(parent: Node): void {
        this.parent = parent;
    }

    accept(find: FinderType, orphanNodes: Node[], parent?: Node): void {
        // TO-DO: Method not implemented
    }
}