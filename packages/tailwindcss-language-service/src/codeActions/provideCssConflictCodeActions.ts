import { CodeActionParams, CodeAction } from 'vscode-languageserver'

import { CssConflictDiagnostic } from '../diagnostics'
import { joinWithAnd, removeRangesFromString, State } from '../util'

export async function provideCssConflictCodeActions(
  _state: State,
  params: CodeActionParams,
  diagnostic: CssConflictDiagnostic
): Promise<CodeAction[]> {
  return [
    {
      title: `Delete ${joinWithAnd(
        diagnostic.otherClassNames.map(otherClassName => `'${otherClassName.className}'`)
      )}`,
      kind: 'quickfix', // CodeActionKind.QuickFix,
      diagnostics: [diagnostic],
      edit: {
        changes: {
          [params.textDocument.uri]: [
            {
              range: diagnostic.className.classList.range,
              newText: removeRangesFromString(
                diagnostic.className.classList.classList,
                diagnostic.otherClassNames.map(otherClassName => otherClassName.relativeRange)
              )
            }
          ]
        }
      }
    }
  ]
}
