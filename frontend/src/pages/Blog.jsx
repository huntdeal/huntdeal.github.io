import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays, Clock3, User } from "lucide-react";

import NewsletterSection from "../components/NewsletterSection.jsx";
import PageHeader from "../components/PageHeader.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Badge from "../components/ui/Badge.jsx";
import EmptyState from "../components/states/EmptyState.jsx";
import ErrorState from "../components/states/ErrorState.jsx";
import { ProductGridSkeleton } from "../components/states/LoadingState.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { useDebouncedValue } from "../hooks/useDebouncedValue.js";
import { listPosts } from "../services/blogService.js";
import { formatDate } from "../utils/format.js";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <Link to={`/blog/${post.id}`} className="post-card__media" tabIndex={-1} aria-hidden="true">
        <img src={post.image} alt="" loading="lazy" />
      </Link>
      <div className="post-card__body">
        <Badge tone="brand" uppercase>
          {post.category}
        </Badge>
        <h3 className="post-card__title">
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h3>
        <p className="post-card__excerpt">{post.excerpt}</p>
        <div className="post-card__foot">
          <span>{formatDate(post.publishedAt)}</span>
          <span>{post.readingMinutes} min read</span>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const debounced = useDebouncedValue(search, 250);

  const { data, loading, error, reload } = useAsync(
    () => listPosts({ search: debounced, category }),
    [debounced, category],
  );

  const posts = data?.items ?? [];
  const isFiltered = Boolean(debounced || category);
  const featured = !isFiltered ? posts.find((post) => post.featured) : null;
  const rest = featured ? posts.filter((post) => post.id !== featured.id) : posts;

  return (
    <>
      <PageHeader
        breadcrumb={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        eyebrow={
          <>
            <BookOpen size={14} aria-hidden="true" />
            Shopping guides
          </>
        }
        title="Guides for buying well, not just cheaply"
        description="Buying guides, deal strategy and category picks — written to help you tell a real discount from a convincing badge."
        meta={<span>{data?.total ?? 0} articles</span>}
      />

      <section className="section">
        <div className="shell stack stack-8">
          <div className="toolbar">
            <div className="toolbar__search">
              <SearchBar
                value={search}
                onChange={setSearch}
                onSubmit={setSearch}
                placeholder="Search articles"
              />
            </div>
            <div className="chip-row">
              <button
                type="button"
                className="chip"
                data-active={category === ""}
                onClick={() => setCategory("")}
              >
                All topics
              </button>
              {(data?.categories ?? []).map((item) => (
                <button
                  key={item}
                  type="button"
                  className="chip"
                  data-active={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {loading && <ProductGridSkeleton count={6} />}
          {error && <ErrorState error={error} onRetry={reload} />}

          {!loading && !error && posts.length === 0 && (
            <EmptyState
              icon={BookOpen}
              title="No articles match that search"
              message="Try a different term, or clear the topic filter to see everything."
              action={{
                label: "Clear filters",
                onClick: () => {
                  setSearch("");
                  setCategory("");
                },
              }}
            />
          )}

          {featured && (
            <article className="blog-feature">
              <Link
                to={`/blog/${featured.id}`}
                className="blog-feature__media"
                tabIndex={-1}
                aria-hidden="true"
              >
                <img src={featured.image} alt="" />
              </Link>
              <div className="blog-feature__body">
                <Badge tone="amber" uppercase>
                  Featured
                </Badge>
                <h2>
                  <Link to={`/blog/${featured.id}`} style={{ color: "inherit" }}>
                    {featured.title}
                  </Link>
                </h2>
                <p className="lede">{featured.excerpt}</p>
                <div className="post-meta">
                  <span className="post-meta__item">
                    <User size={14} aria-hidden="true" />
                    {featured.author}
                  </span>
                  <span className="post-meta__item">
                    <CalendarDays size={14} aria-hidden="true" />
                    {formatDate(featured.publishedAt)}
                  </span>
                  <span className="post-meta__item">
                    <Clock3 size={14} aria-hidden="true" />
                    {featured.readingMinutes} min read
                  </span>
                </div>
                <Link
                  to={`/blog/${featured.id}`}
                  className="btn btn--primary"
                  style={{ alignSelf: "flex-start" }}
                >
                  Read article
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          )}

          {rest.length > 0 && (
            <div className="product-grid product-grid--3">
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
    </>
  );
}
