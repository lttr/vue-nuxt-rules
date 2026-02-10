# Eval Report

## Summary

- **Already Known**: 0
- **With Rule Better**: 1
- **No Improvement**: 0

## Results

| Name | Type | Category | Classification | Baseline | With Rule |
|------|------|----------|---------------|----------|-----------|
| no-side-effects-in-computed | generation | props-state | 🔵 with-rule-better | 0/2 | 2/2 |

## Recommendations

- **no-side-effects-in-computed** → use rule

## Details

### no-side-effects-in-computed

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ 1: FAIL - computed assigns to lastFilteredCount.value, violating no side effects rule | ✅ 1: PASS - computed properties only return filtered data without any .value assignments or side effects |

🔵 **With-rule improved**: no-ref-assignment-in-computed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ 1: FAIL - computed property inStockProducts has no ref assignments, but watch is redundant since lastFilteredCount could be a computed property instead | ✅ 1: PASS - computed property only returns filtered data, uses separate watch() for the count assignment |

🔵 **With-rule improved**: no-ref-assignment-in-computed
