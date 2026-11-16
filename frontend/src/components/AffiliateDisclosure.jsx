import { Info } from "lucide-react";

import { SITE } from "../utils/constants.js";

/**
 * Amazon Associates disclosure. Required wherever affiliate links appear.
 * `variant="plain"` is the quieter version used inside dense pages.
 */
export default function AffiliateDisclosure({ variant = "default", withDemoNote = false }) {
  return (
    <p className={`disclosure ${variant === "plain" ? "disclosure--plain" : ""}`}>
      <Info size={15} aria-hidden="true" />
      <span>
        {SITE.affiliateDisclosure} HuntDeal links to Amazon and may earn a
        commission on qualifying purchases at no extra cost to you.
        {withDemoNote ? ` ${SITE.demoDataNotice}` : ""}
      </span>
    </p>
  );
}
