import { Link, useParams } from "react-router-dom";
import { ArrowLeft, BookOpen, CalendarDays, Clock3, User } from "lucide-react";

import AffiliateDisclosure from "../components/AffiliateDisclosure.jsx";
import Breadcrumb from "../components/Breadcrumb.jsx";
import NewsletterSection from "../components/NewsletterSection.jsx";
import Badge from "../components/ui/Badge.jsx";
import EmptyState from "../components/states/EmptyState.jsx";
import LoadingState from "../components/states/LoadingState.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { getPost, getRelatedPosts } from "../services/blogService.js";
import { formatDate } from "../utils/format.js";

/** Renders one content block. Keeps article markup out of the data file. */
function Block({ block }) {
  switch (block.type) {
    case "h2":
      return <h2>{block.text}</h2>;
    case "h3":
      return <h3>{block.text}</h3>;
    case "quote":
      return <blockquote>{block.text}</blockquote>;
    case "ul":
      return (
        <ul>
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p>{block.text}</p>;
  }
}

export default function BlogDetails() {
  const { postSlug } = useParams();
  const post = useAsync(() => getPost(postSlug), [postSlug]);
  const related = useAsync(() => getRelatedPosts(postSlug, 3), [postSlug]);

  if (post.loading) {
    return (
      <section className="section">
        <div className="shell">
          <LoadingState label="Loading article…" />
        </div>
      </section>
    );
  }

  if (post.error || !post.data) {
    return (
      <section className="section">
        <div className="shell">
          <EmptyState
            icon={BookOpen}
            title="Article not found"
            message={`No article matches "${postSlug}". It may have been moved or renamed.`}
            action={{ label: "All articles", to: "/blog" }}
            secondaryAction={{ label: "Go home", to: "/" }}
          />
        </div>
      </section>
    );
  }

  const article = post.data;

  return (
    <>
      <section className="section section--tight">
        <div className="shell stack stack-4">
          <Breadcrumb
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: article.title },
            ]}
          />
        </div>
      </section>

      <section style={{ paddingBottom: "var(--section-y)" }}>
        <div className="shell article">
          <div>
            <div className="stack stack-4" style={{ marginBottom: "var(--sp-6)" }}>
              <Badge tone="brand" uppercase>
                {article.category}
              </Badge>
              <h1>{article.title}</h1>
              <p className="lede">{article.excerpt}</p>
              <div className="post-meta">
                <span className="post-meta__item">
                  <User size={14} aria-hidden="true" />
                  {article.author}
                </span>
                <span className="post-meta__item">
                  <CalendarDays size={14} aria-hidden="true" />
                  {formatDate(article.publishedAt)}
                </span>
                <span className="post-meta__item">
                  <Clock3 size={14} aria-hidden="true" />
                  {article.readingMinutes} min read
                </span>
              </div>
            </div>

            <figure className="article__hero">
              <img src={article.image} alt="" />
            </figure>

            <div className="prose">
              {article.blocks.map((block, index) => (
                <Block block={block} key={index} />
              ))}
            </div>

            <div style={{ marginTop: "var(--sp-10)" }}>
              <AffiliateDisclosure />
            </div>

            <Link
              to="/blog"
              className="btn btn--outline"
              style={{ marginTop: "var(--sp-8)" }}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              All articles
            </Link>
          </div>

          <aside className="article__aside">
            <div className="card card--pad stack stack-4">
              <h2 className="panel-title">Related articles</h2>
              <div className="aside-list">
                {(related.data ?? []).map((item) => (
                  <Link to={`/blog/${item.id}`} className="aside-item" key={item.id}>
                    <img src={item.image} alt="" className="aside-item__img" />
                    <span className="stack stack-2">
                      <span className="aside-item__title">{item.title}</span>
                      <span className="text-xs text-muted">
                        {formatDate(item.publishedAt)}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="card card--pad stack stack-3">
              <h2 className="panel-title">Put it into practice</h2>
              <p className="text-sm text-muted">
                Browse the current catalogue and apply the checks from this
                article.
              </p>
              <Link to="/deals" className="btn btn--primary btn--block">
                Browse today&apos;s deals
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
