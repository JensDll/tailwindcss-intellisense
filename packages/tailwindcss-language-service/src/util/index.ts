export { absoluteRange } from './absoluteRange'

export { dedupe, dedupeBy, ensureArray, equal, equalExact, flatten } from './array'

export { closest } from './closest'

export { KeywordColor, culoriColorToVscodeColor, getColor, getColorFromValue } from './color'

export { combinations } from './combinations'

export { createMultiRegexp } from './createMultiRegexp'

export { isCssContext, isCssDoc } from './css'

export { cssObjToAst } from './cssObjToAst'

export { docsUrl } from './docsUrl'

export {
  findAll,
  findClassListsInCssRange,
  findClassListsInRange,
  findClassListsInDocument,
  findClassListsInHtmlRange,
  findClassNameAtPosition,
  findClassNamesInDocument,
  findClassNamesInRange,
  findHelperFunctionsInDocument,
  findHelperFunctionsInRange,
  findLast,
  getClassNamesInClassList,
  indexToPosition,
  matchClassAttributes
} from './find'

export { flagEnabled } from './flagEnabled'

export { getClassNameParts } from './getClassNameAtPosition'

export { getClassNameDecls } from './getClassNameDecls'

export { getClassNameMeta } from './getClassNameMeta'

export { getLanguageBoundaries, type LanguageBoundaries } from './getLanguageBoundaries'

export { getVariantsFromClassName } from './getVariantsFromClassName'

export { isHtmlContext, isHtmlDoc, isInsideTag, isSvelteDoc, isVueDoc } from './html'

export { isObject } from './isObject'

export { isValidLocationForEmmetAbbreviation } from './isValidLocationForEmmetAbbreviation'

export { isWithinRange } from './isWithinRange'

export * as jit from './jit'

export { joinWithAnd } from './joinWithAnd'

export { isJsContext, isJsDoc } from './js'

export { cssLanguages, htmlLanguages, jsLanguages, languages, specialLanguages } from './languages'

export { type Lazy, lazy } from './lazy'

export { getClassAttributeLexer, getComputedClassAttributeLexer } from './lexers'

export { naturalExpand } from './naturalExpand'

export { rangesEqual } from './rangesEqual'

export { remToPx } from './remToPx'

export { removeMeta } from './removeMeta'

export { removeRangesFromString } from './removeRangesFromString'

export { resolveRange } from './resolveRange'

export { stringifyScreen, type MinMaxScreen, type RawScreen, type Screen } from './screens'

export {
  type ClassNameMeta,
  type ClassNames,
  type ClassNamesContext,
  type ClassNamesTree,
  type DocumentClassList,
  type DocumentClassName,
  type DocumentHelperFunction,
  type EditorState,
  type FeatureFlags,
  type Settings,
  type State
} from './state'

export { stringToPath } from './stringToPath'

export { stringifyConfigValue, stringifyCss } from './stringify'

export { validateApply } from './validateApply'
