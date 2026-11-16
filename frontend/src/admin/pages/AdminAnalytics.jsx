import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  CalendarDays,
  CalendarRange,
  Info,
  MousePointerClick,
  Timer,
} from "lucide-react";

import AdminHeader from "../components/AdminHeader.jsx";
import AnalyticsChart from "../components/AnalyticsChart.jsx";
import PermissionGate from "../components/PermissionGate.jsx";
import StatCard from "../components/StatCard.jsx";
import Badge from "../../components/ui/Badge.jsx";
import { ListSkeleton } from "../../components/states/LoadingState.jsx";
import { useAsync } from "../../hooks/useAsync.js";
import {
  getCategoryPerformance,
  getClickSeries,
  getClickTotals,
  getProductPerformance,
  getTopProducts,
} from "../../services/analyticsService.js";
import { formatCompact, formatNumber } from "../../utils/format.js";

const RANGES = [
  { value: "daily", label: "Last 30 days" },
  { value: "weekly", label: "By week" },
  { value: "monthly", label: "By month" },
];

export default function AdminAnalytics() {
  const { openNav } = useOutletContext();
  const [range, setRange] = useState("daily");

  const totals = useAsync(() => getClickTotals(), []);
  const series = useAsync(() => getClickSeries(range), [range]);
  const categoryStats = useAsync(() => getCategoryPerformance(), []);
  const productStats = useAsync(() => getProductPerformance(10), []);
  const topProducts = useAsync(() => getTopProducts(8), []);

  return (
    <>
      <AdminHeader
        title="Click analytics"
        subtitle="Outbound clicks by day, product and category"
        onMenuClick={openNav}
      />

      <div className="admin__content">
        <PermissionGate permission="analytics.view">
          <p className="alert alert--info">
            <Info size={17} aria-hidden="true" />
            <span>
              <strong>Mock analytics.</strong> These series are generated from a
              fixed seed for the frontend build. They are not measurements of
              real visitors and should not be reported as such.
            </span>
          </p>

          <div className="stat-grid">
            <StatCard
              label="Clicks today"
              value={formatNumber(totals.data?.today ?? 0)}
              icon={Timer}
              caption="outbound to Amazon"
            />
            <StatCard
              label="This week"
              value={formatNumber(totals.data?.week ?? 0)}
              icon={CalendarDays}
              tone="teal"
              change={totals.data?.weekChange}
              caption="vs. previous week"
            />
            <StatCard
              label="This month"
              value={formatCompact(totals.data?.month ?? 0)}
              icon={CalendarRange}
              tone="amber"
              caption="rolling 30 days"
            />
            <StatCard
              label="All time"
              value={formatCompact(totals.data?.allTime ?? 0)}
              icon={MousePointerClick}
              tone="success"
              caption="across the catalogue"
            />
          </div>

          {/* Click trend ---------------------------------------------------- */}
          <section className="panel">
            <div className="panel__head">
              <div>
                <h2 className="panel-title">Clicks over time</h2>
                <p className="panel__sub">
                  Clicks and estimated visitors for the selected period.
                </p>
              </div>
              <div className="chip-row">
                {RANGES.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    className="chip"
                    data-active={range === option.value}
                    onClick={() => setRange(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {series.loading ? (
              <ListSkeleton rows={4} />
            ) : (
              <AnalyticsChart
                type="area"
                data={series.data ?? []}
                xKey="label"
                series={[
                  { key: "clicks", name: "Clicks", color: "#5B5CE2" },
                  { key: "visitors", name: "Visitors", color: "#17A398" },
                ]}
                height={300}
              />
            )}
          </section>

          {/* Category + product performance --------------------------------- */}
          <div className="admin-grid">
            <section className="panel">
              <div className="panel__head">
                <div>
                  <h2 className="panel-title">Category performance</h2>
                  <p className="panel__sub">Total clicks per category.</p>
                </div>
              </div>
              {categoryStats.loading ? (
                <ListSkeleton rows={4} />
              ) : (
                <AnalyticsChart
                  type="bar"
                  data={(categoryStats.data ?? []).map((item) => ({
                    label: item.name.split(" ")[0],
                    fullName: item.name,
                    clicks: item.clicks,
                  }))}
                  xKey="label"
                  series={[{ key: "clicks", name: "Clicks", color: "#5B5CE2" }]}
                  height={280}
                />
              )}
            </section>

            <section className="panel">
              <div className="panel__head">
                <div>
                  <h2 className="panel-title">Top clicked products</h2>
                  <p className="panel__sub">Ten most clicked products.</p>
                </div>
              </div>
              {productStats.loading ? (
                <ListSkeleton rows={4} />
              ) : (
                <AnalyticsChart
                  type="hbar"
                  data={productStats.data ?? []}
                  xKey="name"
                  series={[{ key: "clicks", name: "Clicks", color: "#17A398" }]}
                  height={320}
                />
              )}
            </section>
          </div>

          {/* Product table -------------------------------------------------- */}
          <section className="panel">
            <div className="panel__head">
              <div>
                <h2 className="panel-title">Product-wise clicks</h2>
                <p className="panel__sub">
                  Clicks, discount and a demo conversion proxy per product.
                </p>
              </div>
              <Badge tone="neutral">Demo data</Badge>
            </div>

            {topProducts.loading ? (
              <ListSkeleton rows={6} />
            ) : (
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Category</th>
                      <th className="table__num">Clicks</th>
                      <th className="table__num">Discount</th>
                      <th className="table__num">Rating</th>
                      <th className="table__num">Conv. (demo)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(topProducts.data ?? []).map((product) => (
                      <tr key={product.id}>
                        <td>
                          <span className="cell-product">
                            <img src={product.image} alt="" className="cell-product__img" />
                            <span className="cell-product__name">{product.name}</span>
                          </span>
                        </td>
                        <td>{product.category}</td>
                        <td className="table__num">{formatNumber(product.clicks)}</td>
                        <td className="table__num">{product.discount}%</td>
                        <td className="table__num">{product.rating.toFixed(1)}</td>
                        <td className="table__num">{product.conversion}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Category table -------------------------------------------------- */}
          <section className="panel">
            <div className="panel__head">
              <div>
                <h2 className="panel-title">Category-wise clicks</h2>
                <p className="panel__sub">
                  Clicks, product count and average discount per category.
                </p>
              </div>
            </div>

            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th className="table__num">Products</th>
                    <th className="table__num">Clicks</th>
                    <th className="table__num">Avg. discount</th>
                    <th className="table__num">Share</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const stats = categoryStats.data ?? [];
                    const total = stats.reduce((sum, item) => sum + item.clicks, 0) || 1;
                    return stats.map((item) => (
                      <tr key={item.slug}>
                        <td>
                          <span className="row" style={{ gap: "var(--sp-2)" }}>
                            <span
                              className="legend__swatch"
                              style={{ background: item.color }}
                              aria-hidden="true"
                            />
                            {item.name}
                          </span>
                        </td>
                        <td className="table__num">{item.products}</td>
                        <td className="table__num">{formatNumber(item.clicks)}</td>
                        <td className="table__num">{item.avgDiscount}%</td>
                        <td className="table__num">
                          {Math.round((item.clicks / total) * 100)}%
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </section>
        </PermissionGate>
      </div>
    </>
  );
}
