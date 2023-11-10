import * as ts from 'typescript';
import * as Lint from 'tslint';

export class Rule extends Lint.Rules.AbstractRule {
  public static FAILURE_STRING = 'jest.mock should be placed before any import statements';

  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoJestMockAfterImportWalker(sourceFile, this.getOptions()));
  }
}

class NoJestMockAfterImportWalker extends Lint.RuleWalker {
  private importStatementFound = false;

  public visitImportDeclaration(node: ts.ImportDeclaration) {
    this.importStatementFound = true;
    super.visitImportDeclaration(node);
  }

  public visitCallExpression(node: ts.CallExpression) {
    if (this.importStatementFound && node.expression.getText() === 'jest.mock') {
      this.addFailureAtNode(node, Rule.FAILURE_STRING);
    }
    super.visitCallExpression(node);
  }
}
