# Specification

## Summary
**Goal:** Update the YES-click agreement message text on the Valentine invitation screen to match the exact requested headline and bullet list.

**Planned changes:**
- In `frontend/src/App.tsx`, replace the current YES-click agreement message content with the exact headline: "By clicking YES you agree to:"
- Ensure the agreement message displays exactly four bullet items in this order and wording: "Unlimited cuddles", "Lifetime supply of milk", "Unlimited sex", "Daily minimum 1 nudes", with no additional trailing sentence.

**User-visible outcome:** After clicking "YES", the agreement message appears immediately showing the specified headline and four bullets only, while all other YES-click behaviors remain unchanged.
