import { TextDocument } from 'vscode-languageserver-textdocument'

import { State } from '../util'
import {
  getCssConflictDiagnostics,
  getInvalidApplyDiagnostics,
  getInvalidScreenDiagnostics,
  getInvalidVariantDiagnostics,
  getInvalidConfigPathDiagnostics,
  getInvalidTailwindDirectiveDiagnostics,
  getRecommendedVariantOrderDiagnostics,
  DiagnosticKind,
  AugmentedDiagnostic
} from './index'

export async function doValidate(
  state: State,
  document: TextDocument,
  only: DiagnosticKind[] = [
    DiagnosticKind.CssConflict,
    DiagnosticKind.InvalidApply,
    DiagnosticKind.InvalidScreen,
    DiagnosticKind.InvalidVariant,
    DiagnosticKind.InvalidConfigPath,
    DiagnosticKind.InvalidTailwindDirective,
    DiagnosticKind.RecommendedVariantOrder
  ]
): Promise<AugmentedDiagnostic[]> {
  const settings = await state.editor.getConfiguration(document.uri)

  return settings.tailwindCSS.validate
    ? [
        ...(only.includes(DiagnosticKind.CssConflict)
          ? await getCssConflictDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidApply)
          ? await getInvalidApplyDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidScreen)
          ? getInvalidScreenDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidVariant)
          ? getInvalidVariantDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidConfigPath)
          ? getInvalidConfigPathDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.InvalidTailwindDirective)
          ? getInvalidTailwindDirectiveDiagnostics(state, document, settings)
          : []),
        ...(only.includes(DiagnosticKind.RecommendedVariantOrder)
          ? await getRecommendedVariantOrderDiagnostics(
              state,
              document,
              settings
            )
          : [])
      ]
    : []
}

export async function provideDiagnostics(state: State, document: TextDocument) {
  // state.editor.connection.sendDiagnostics({
  //   uri: document.uri,
  //   diagnostics: await doValidate(state, document),
  // })
}

export function clearDiagnostics(state: State, document: TextDocument): void {
  // state.editor.connection.sendDiagnostics({
  //   uri: document.uri,
  //   diagnostics: [],
  // })
}

export function clearAllDiagnostics(state: State): void {
  state.editor.documents.all().forEach(document => {
    clearDiagnostics(state, document)
  })
}

export function updateAllDiagnostics(state: State): void {
  state.editor.documents.all().forEach(document => {
    provideDiagnostics(state, document)
  })
}
