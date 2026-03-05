/**
 * @vitest-environment jsdom
 */
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDrawerRunCallbacks } from "../useDrawerRunCallbacks";

const mockOpenDrawer = vi.hoisted(() => vi.fn());
const mockNavigateToSuite = vi.hoisted(() => vi.fn());

vi.mock("~/hooks/useDrawer", () => ({
  useDrawer: () => ({
    openDrawer: mockOpenDrawer,
    closeDrawer: vi.fn(),
  }),
}));

vi.mock("~/components/suites/useSuiteRouting", () => ({
  ALL_RUNS_ID: "all-runs",
  useSuiteRouting: () => ({
    selectedSuiteSlug: null,
    navigateToSuite: mockNavigateToSuite,
  }),
}));

describe("useDrawerRunCallbacks()", () => {
  describe("when onRunComplete is called", () => {
    it("navigates to the all-runs page", () => {
      const { result } = renderHook(() => useDrawerRunCallbacks());

      result.current.onRunComplete({ scenarioRunId: "run-abc" });

      expect(mockNavigateToSuite).toHaveBeenCalledWith("all-runs");
      expect(mockOpenDrawer).not.toHaveBeenCalled();
    });
  });

  describe("when onRunFailed is called", () => {
    it("opens the scenarioRunDetail drawer with the run id", () => {
      const { result } = renderHook(() => useDrawerRunCallbacks());

      result.current.onRunFailed({ scenarioRunId: "run-xyz" });

      expect(mockOpenDrawer).toHaveBeenCalledWith("scenarioRunDetail", {
        urlParams: { scenarioRunId: "run-xyz" },
      });
    });
  });
});
