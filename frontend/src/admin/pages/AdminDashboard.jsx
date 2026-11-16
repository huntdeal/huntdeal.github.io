import { Link, useOutletContext } from "react-router-dom";
import {
  BarChart3,
  Flame,
  Info,
  MousePointerClick,
  Package,
  Plus,
  Tag,
} from "lucide-react";

import AdminHeader from "../components/AdminHeader.jsx";
import AnalyticsChart from "../components/AnalyticsChart.jsx";
import StatCard from "../components/StatCard.jsx";
import Badge from "../../components/ui/Badge.jsx";
import Button from "../../components/ui/Button.jsx";
import ErrorState from "../../components/states/ErrorState.jsx";
import { ListSkeleton } from "../../components/states/LoadingState.jsx";
import { useAdminAuth } from "../../context/AdminAuthContext.jsx";
import { useAsync } from "../../hooks/useAsync.js";
import {
  getCategoryPerformance,
  getClickSeries,
  getDashboardSummary,
  getRecentlyAdded,
  getTopProducts,
} from "../../services/analyticsService.js";
import { formatCompact, formatNumber, formatPrice, timeAgo } from "../../utils/format.js";

export default function AdminDashboard() {
  const { openNav } = useOutletContext();
  const { user, can } = useAdminAuth();

  const summary = useAsync(() => getDashboardSummary(), []);
  const clicks = useAsync(() => getClickSeries("daily"), []);
  const categoryStats = useAsync(() => getCategoryPerformance(), []);
  const topProducts = useAsync(() => getTopProducts(5), []);
  const recent = useAsync(() => getRecentlyAdded(5), []);

  const data = summary.data;

  return (
    <>
      <AdminHeader
        title={`Welcome back, ${user?.name?.split(" ")[0] ?? "there"}`}
        subtitle="Catalogue health and engagement at a glance"
        onMenuClick={openNav}
        actions={
          can("products.create") ? (
            <Button variant="primary" size="sm" icon={Plus} to="/admin/products/new">
              Add product
            </Button>
          ) : null
        }
      />

      <div className="admin__content">
        <p className="alert alert--info">
          <Info size={17} aria-hidden="true" />
          <span>
            <strong>Demo analytics.</strong> Every figure on this page is
            generated sample data for the frontend build. Real numbers arrive
            when the analytics endpoints are connected.
          </span>
        </p>

        {/* Stats ---------------------------------------------------------- */}
        <div className="stat-grid">
          <StatCard
            label="Total products"
            value={formatNumber(data?.totalProducts ?? 0)}
            icon={Package}
            caption="in the catalogue"
          />
          <StatCard
            label="Active deals"
            value={formatNumber(data?.activeDeals ?? 0)}
            icon={Tag}
            tone="success"
            caption="visible on the public site"
          />
          <StatCard
            label="Total clicks"
            value={formatCompact(data?.totalClicks ?? 0)}
            icon={MousePointerClick}
            tone="teal"
            change={data?.clickChange}
            caption="vs. previous 7 days"
          />
          <StatCard
            label="Trending products"
            value={formatNumber(data?.trendingProducts ?? 0)}
            icon={Flame}
            tone="amber"
            caption={`avg ${data?.avgDiscount ?? 0}% discount`}
          />
        </div>

        {/* Clicks + categories -------------------------------------------- */}
        <div className="admin-grid admin-grid--2-1">
          <section className="panel">
            <div className="panel__head">
              <div>
                <h2 className="panel-title">Clicks over time</h2>
                <p className="panel__sub">Outbound Amazon clicks, last 30 days.</p>
              </div>
              <Badge tone="neutral">Demo data</Badge>
            </div>

            {clicks.error ? (
              <ErrorState error={clicks.error} onRetry={clicks.reload} />
            ) : clicks.loading ? (
              <ListSkeleton rows={4} />
            ) : (
              <AnalyticsChart
                type="area"
                data={clicks.data}
                xKey="label"
                series={[{ key: "clicks", name: "Clicks", color: "#5B5CE2" }]}
                height={280}
              />
            )}
          </section>

          <section className="panel">
            <div className="panel__head">
              <div>
                <h2 className="panel-title">Category performance</h2>
                <p className="panel__sub">Share of clicks by category.</p>
              </div>
            </div>

            {categoryStats.loading ? (
              <ListSkeleton rows={4} />
            ) : (
              <AnalyticsChart
                type="pie"
                data={(categoryStats.data ?? []).map((item) => ({
                  label: item.name,
                  clicks: item.clicks,
                  color: item.color,
                }))}
                xKey="label"
                series={[{ key: "clicks", name: "Clicks" }]}
                height={280}
              />
            )}
          </section>
        </div>

        {/* Top performing + recently added --------------------------------- */}
        <div className="admin-grid">
          <section className="panel">
            <div className="panel__head">
              <div>
                <h2 className="panel-title">Top performing deals</h2>
                <p className="panel__sub">Most clicked products in the catalogue.</p>
              </div>
              {can("analytics.view") && (
                <Link to="/admin/analytics" className="btn btn--ghost btn--sm">
                  <BarChart3 size={15} aria-hidden="true" />
                  Analytics
                </Link>
              )}
            </div>

            {topProducts.loading ? (
              <ListSkeleton rows={5} />
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th className="table__num">Clicks</th>
                      <th className="table__num">Discount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(topProducts.data ?? []).map((product) => (
                      <tr key={product.id}>
                        <td>
                          <span className="cell-product">
                            <img
                              src={product.image}
                              alt=""
                              className="cell-product__img"
                            />
                            <span>
                              <span className="cell-product__name">
                                {product.name}
                              </span>
                              <span className="cell-product__sub">
                                {product.category}
                              </span>
                            </span>
                          </span>
                        </td>
                        <td className="table__num">
                          {formatCompact(product.clicks)}
                        </td>
                        <td className="table__num">
                          <Badge tone="success">{product.discount}%</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="panel">
            <div className="panel__head">
              <div>
                <h2 className="panel-title">Recently added products</h2>
                <p className="panel__sub">Newest entries in the catalogue.</p>
              </div>
              <Link to="/admin/products" className="btn btn--ghost btn--sm">
                All products
              </Link>
            </div>

            {recent.loading ? (
              <ListSkeleton rows={5} />
            ) : (
              <div className="stack stack-3">
                {(recent.data ?? []).map((product) => (
                  <Link
                    to={`/admin/products/${product.id}/edit`}
                    className="rank-row"
                    key={product.id}
                  >
                    <span className="rank-row__index">
                      <Package size={15} aria-hidden="true" />
                    </span>
                    <img
                      src={product.imageUrl ?? product.images[0]}
                      alt=""
                      className="rank-row__img"
                    />
                    <span className="rank-row__body">
                      <span className="rank-row__name">{product.name}</span>
                      <span className="rank-row__meta">
                        {product.categoryName} · added {timeAgo(product.createdAt)}
                      </span>
                    </span>
                    <span className="rank-row__price">
                      <strong>{formatPrice(product.price)}</strong>
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
