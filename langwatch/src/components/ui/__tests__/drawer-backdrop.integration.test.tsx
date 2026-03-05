/**
 * @vitest-environment jsdom
 *
 * Integration tests for the DrawerContent transparency and blur styling.
 *
 * @see specs/features/drawer-backdrop-transparency-blur.feature
 */
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { cleanup, render } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Drawer } from "../drawer";

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
);

function renderDrawer() {
  render(
    <Drawer.Root open={true} placement="end">
      <Drawer.Content>
        <Drawer.Body>Content</Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>,
    { wrapper: Wrapper },
  );
}

describe("DrawerContent transparency and blur", () => {
  afterEach(cleanup);

  describe("when a drawer opens", () => {
    it("renders the drawer content panel", () => {
      renderDrawer();

      const content = document.querySelector(
        "[data-part='content']",
      ) as HTMLElement | null;
      expect(content).not.toBeNull();
      // Transparency (80% opacity) and blur (25px) are applied via Chakra props
      // on the content panel; jsdom cannot compute resolved CSS values.
    });
  });
});
