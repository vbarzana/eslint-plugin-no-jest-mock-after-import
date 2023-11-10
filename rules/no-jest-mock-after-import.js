const Lint = require('tslint');

class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithFunction(sourceFile, walk);
    }
}

function walk(ctx) {
    let importStatementSeen = false;

    for (const statement of ctx.sourceFile.statements) {
        if (statement.kind === 252) { // ts.SyntaxKind.ImportDeclaration in JavaScript
            importStatementSeen = true;
        }

        if (statement.kind === 230) { // ts.SyntaxKind.ExpressionStatement in JavaScript
            const expression = statement.expression;
            if (expression.kind === 201 && expression.expression.text === 'jest') { // CallExpression and Identifier
                if (importStatementSeen) {
                    ctx.addFailureAtNode(statement, 'jest.mock() call found after import statement in a test file.');
                }
            }
        }
    }
}

exports.Rule = Rule;