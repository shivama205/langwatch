import { useCallback } from "react";
import { useDrawer } from "./useDrawer";
import {
  ALL_RUNS_ID,
  useSuiteRouting,
} from "../components/suites/useSuiteRouting";

/**
 * Returns callbacks for quick-run results.
 *
 * - onRunComplete navigates to the all-runs page so the user sees runs in progress.
 * - onRunFailed opens the scenario run detail drawer for inspection.
 */
export function useDrawerRunCallbacks() {
  const { openDrawer } = useDrawer();
  const { navigateToSuite } = useSuiteRouting();

  const onRunComplete = useCallback(
    (_result?: { scenarioRunId: string }) => {
      navigateToSuite(ALL_RUNS_ID);
    },
    [navigateToSuite],
  );

  const onRunFailed = useCallback(
    (result: { scenarioRunId: string }) => {
      openDrawer("scenarioRunDetail", {
        urlParams: { scenarioRunId: result.scenarioRunId },
      });
    },
    [openDrawer],
  );

  return { onRunComplete, onRunFailed };
}
