import { CodeAction, CodeActionParams } from 'vscode-languageserver'

import {
  doValidate,
  DiagnosticKind,
  isInvalidApplyDiagnostic,
  AugmentedDiagnostic,
  isCssConflictDiagnostic,
  isInvalidConfigPathDiagnostic,
  isInvalidTailwindDirectiveDiagnostic,
  isInvalidScreenDiagnostic,
  isInvalidVariantDiagnostic,
  isRecommendedVariantOrderDiagnostic
} from '../diagnostics'
import { flatten, dedupeBy, rangesEqual, State } from '../util'
import { provideCssConflictCodeActions } from './provideCssConflictCodeActions'
import { provideInvalidApplyCodeActions } from './provideInvalidApplyCodeActions'
import { provideSuggestionCodeActions } from './provideSuggestionCodeActions'

async function getDiagnosticsFromCodeActionParams(
  state: State,
  params: CodeActionParams,
  only?: DiagnosticKind[]
): Promise<AugmentedDiagnostic[]> {
  let document = state.editor.documents.get(params.textDocument.uri)
  let diagnostics = await doValidate(state, document, only)

  return params.context.diagnostics
    .map(diagnostic => {
      return diagnostics.find(d => {
        return (
          d.code === diagnostic.code &&
          d.message === diagnostic.message &&
          rangesEqual(d.range, diagnostic.range)
        )
      })
    })
    .filter(Boolean)
}

export async function doCodeActions(
  state: State,
  params: CodeActionParams
): Promise<CodeAction[]> {
  let diagnostics = await getDiagnosticsFromCodeActionParams(
    state,
    params,
    params.context.diagnostics
      .map(diagnostic => diagnostic.code)
      .filter(Boolean) as DiagnosticKind[]
  )

  return Promise.all(
    diagnostics.map(diagnostic => {
      if (isInvalidApplyDiagnostic(diagnostic)) {
        return provideInvalidApplyCodeActions(state, params, diagnostic)
      }

      if (isCssConflictDiagnostic(diagnostic)) {
        return provideCssConflictCodeActions(state, params, diagnostic)
      }

      if (
        isInvalidConfigPathDiagnostic(diagnostic) ||
        isInvalidTailwindDirectiveDiagnostic(diagnostic) ||
        isInvalidScreenDiagnostic(diagnostic) ||
        isInvalidVariantDiagnostic(diagnostic) ||
        isRecommendedVariantOrderDiagnostic(diagnostic)
      ) {
        return provideSuggestionCodeActions(state, params, diagnostic)
      }

      return []
    })
  )
    .then(flatten)
    .then(x => dedupeBy(x, item => JSON.stringify(item.edit)))
}
