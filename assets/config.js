// DEMO PRICES ONLY. Replace with your approved commercial prices before launch.
window.POS_CONFIG = {
  endpoint: "", // Paste deployed Apps Script /exec URL here. Not a secret.
  pricingVersion: "demo-2026-01",
  packages: {basic: [500000,700000], complete: [1000000,1400000], custom: [500000,700000]},
  branches: {one:[0,0], few:[300000,600000], many:[700000,1400000]},
  counters: {one:[0,0], few:[150000,300000], many:[350000,700000], unsure:[0,300000]},
  addons: [
    {id:"expiry",name:"သက်တမ်းကုန်ရက် စစ်ချင်တယ်",price:[150000,250000]},
    {id:"units",name:"ဘူး / ကတ် / ဖာ အလိုက် ရောင်းမယ်",price:[100000,180000]},
    {id:"warehouse",name:"ဂိုဒေါင် သီးခြားရှိတယ်",price:[150000,250000]},
    {id:"promotion",name:"Member / Promotion ပေးမယ်",price:[200000,400000]},
    {id:"migration",name:"Data အဟောင်း ထည့်ချင်တယ်",price:[50000,200000]},
    {id:"offline",name:"အင်တာနက်မရှိချိန်လည်း ရောင်းမယ်",price:[400000,800000]}
  ]
};
