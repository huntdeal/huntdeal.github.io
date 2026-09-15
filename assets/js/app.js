const articles=[
["How We Check a Deal","how-we-check-deals.html","Our practical framework for deciding whether a discount is worth investigating."],
["How to Spot a Fake Discount","spot-fake-discounts.html","A checklist for judging discounts, inflated reference prices and misleading offers."],
["How to Compare Products Before Buying","compare-products.html","What to compare beyond the headline price."],
["Understanding Coupons and Bank Offers","coupons-bank-offers.html","How coupons, card offers and instant discounts can change effective price."],
["When Is a Laptop Deal Actually Good?","laptop-deals.html","A buyer-focused guide to judging laptop value instead of chasing percentages."],
["Smartphone Deal Checklist","smartphone-deals.html","A practical checklist for evaluating smartphone offers."],
["Headphone Buying Guide","headphone-buying-guide.html","What matters when comparing headphones, earbuds and everyday audio gear."],
["Monitor Buying Guide","monitor-buying-guide.html","Resolution, refresh rate, panel type and connectivity explained."],
["Keyboard and Mouse Buying Guide","keyboard-mouse.html","How to choose comfortable peripherals for work, study and gaming."],
["Power Bank Buying Guide","power-bank.html","Capacity, charging standards, ports and travel considerations."],
["Backpack Buying Guide","backpacks.html","How to choose a durable everyday laptop or travel backpack."],
["Kitchen Appliance Buying Guide","kitchen-appliances.html","A value-focused way to compare common kitchen appliances."],
["Home Office Essentials","home-office.html","Useful categories to consider when setting up a productive workspace."],
["Budget Shopping Strategy","budget-shopping.html","A repeatable process for finding value without impulse buying."],
["How to Read Product Reviews","read-reviews.html","How to separate useful review evidence from noise."],
["Price vs Value","price-vs-value.html","Why the lowest price is not always the best deal."],
["Deal Safety Checklist","deal-safety.html","Checks to make before clicking through or placing an order."],
["Gift Shopping Without Overpaying","gift-shopping.html","A practical framework for choosing useful gifts while controlling spend."],
["Best Time to Research a Purchase","research-timing.html","Why researching before a sale can be more valuable than waiting for a badge."],
["HuntDeal Editorial Policy","editorial-policy.html","How HuntDeal handles accuracy, updates, corrections and affiliate relationships."]
];
function renderArticles(){
 const el=document.querySelector("#article-list"); if(!el)return;
 el.innerHTML=articles.map(a=>`<article class="card"><span class="pill">Guide</span><h3><a href="${a[1]}">${a[0]}</a></h3><p>${a[2]}</p></article>`).join("");
}
document.addEventListener("DOMContentLoaded",renderArticles);
