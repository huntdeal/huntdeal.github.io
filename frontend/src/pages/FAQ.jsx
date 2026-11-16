import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, MessageSquare } from "lucide-react";

import Accordion from "../components/ui/Accordion.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import EmptyState from "../components/states/EmptyState.jsx";
import { faqGroups } from "../data/faqs.js";

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState(faqGroups[0].id);

  const needle = search.trim().toLowerCase();

  /** When searching, every group is filtered; otherwise one group is shown. */
  const visibleGroups = useMemo(() => {
    if (!needle) {
      return faqGroups.filter((group) => group.id === activeGroup);
    }
    return faqGroups
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.q.toLowerCase().includes(needle) ||
            item.a.toLowerCase().includes(needle),
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [needle, activeGroup]);

  const totalMatches = visibleGroups.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "FAQ" }]}
        eyebrow={
          <>
            <HelpCircle size={14} aria-hidden="true" />
            Frequently asked questions
          </>
        }
        title="Questions people ask before they trust a deal site"
        description="How HuntDeal works, what affiliate links mean for you, and how far our price and availability data can be trusted."
      />

      <section className="section">
        <div className="shell faq-layout">
          <nav className="faq-nav" aria-label="FAQ topics">
            {faqGroups.map((group) => (
              <button
                key={group.id}
                type="button"
                className="faq-nav__item"
                data-active={!needle && group.id === activeGroup}
                onClick={() => {
                  setSearch("");
                  setActiveGroup(group.id);
                }}
              >
                <span>{group.title}</span>
                <span className="badge badge--neutral">{group.items.length}</span>
              </button>
            ))}
          </nav>

          <div className="stack stack-6">
            <SearchBar
              value={search}
              onChange={setSearch}
              onSubmit={setSearch}
              placeholder="Search questions"
            />

            {needle && (
              <p className="text-sm text-muted">
                {totalMatches} {totalMatches === 1 ? "question" : "questions"}{" "}
                match “{search}”.
              </p>
            )}

            {visibleGroups.length === 0 && (
              <EmptyState
                icon={HelpCircle}
                title="No question matches that search"
                message="Try a shorter term, or get in touch and we will answer directly."
                action={{ label: "Contact us", to: "/contact" }}
                secondaryAction={{ label: "Clear search", onClick: () => setSearch("") }}
              />
            )}

            {visibleGroups.map((group) => (
              <section className="stack stack-4" key={group.id}>
                <h2 className="panel-title">{group.title}</h2>
                <Accordion
                  items={group.items.map((item) => ({
                    id: item.q,
                    question: item.q,
                    answer: item.a,
                  }))}
                  defaultOpen={needle ? null : 0}
                />
              </section>
            ))}

            <div className="card card--pad row row--between row--wrap">
              <div className="stack stack-2">
                <h2 className="panel-title">Still have a question?</h2>
                <p className="text-sm text-muted">
                  If it is not answered here, send it over — the answer usually
                  ends up on this page.
                </p>
              </div>
              <Link to="/contact" className="btn btn--primary">
                <MessageSquare size={16} aria-hidden="true" />
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
