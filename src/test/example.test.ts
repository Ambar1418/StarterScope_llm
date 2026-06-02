import { describe, it, expect } from "vitest";
import { useTranslation } from "../lib/translations";

describe("translations", () => {
  it("should return the correct translation for defined keys", () => {
    const { t } = useTranslation("en");
    expect(t("threeStepsTitle")).toBe("Three Steps to Market Clarity");
  });

  it("should return the key for undefined keys", () => {
    const { t } = useTranslation("en");
    // @ts-ignore
    expect(t("someNonexistentKey")).toBe("someNonexistentKey");
  });
});
