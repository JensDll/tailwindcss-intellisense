export {
  clearAllDiagnostics,
  clearDiagnostics,
  doValidate,
  provideDiagnostics,
  updateAllDiagnostics
} from './diagnosticsProvider'

export { getCssConflictDiagnostics } from './getCssConflictDiagnostics'

export { getInvalidApplyDiagnostics } from './getInvalidApplyDiagnostics'

export {
  getInvalidConfigPathDiagnostics,
  validateConfigPath
} from './getInvalidConfigPathDiagnostics'

export { getInvalidScreenDiagnostics } from './getInvalidScreenDiagnostics'

export { getInvalidTailwindDirectiveDiagnostics } from './getInvalidTailwindDirectiveDiagnostics'

export { getInvalidVariantDiagnostics } from './getInvalidVariantDiagnostics'

export { getRecommendedVariantOrderDiagnostics } from './getRecommendedVariantOrderDiagnostics'

export {
  DiagnosticKind,
  isCssConflictDiagnostic,
  isInvalidApplyDiagnostic,
  isInvalidConfigPathDiagnostic,
  isInvalidScreenDiagnostic,
  isInvalidTailwindDirectiveDiagnostic,
  isInvalidVariantDiagnostic,
  isRecommendedVariantOrderDiagnostic,
  type AugmentedDiagnostic,
  type CssConflictDiagnostic,
  type InvalidApplyDiagnostic,
  type InvalidConfigPathDiagnostic,
  type InvalidScreenDiagnostic,
  type InvalidTailwindDirectiveDiagnostic,
  type InvalidVariantDiagnostic,
  type RecommendedVariantOrderDiagnostic
} from './types'
