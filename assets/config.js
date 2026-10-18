// Indicative pricing: base starts at MMK 1,800,000; highest selection reaches MMK 10,000,000.
window.POS_CONFIG = {
  endpoint: "https://script.google.com/macros/s/AKfycbxxH1rm8kCOpna4QCvUFYzenf4TX7FRFml7ALaWtDYDAMIb1Cu8jM6Kt9EoY3gAqWjoqA/exec", // Paste deployed Apps Script /exec URL here. Not a secret.
  pricingVersion: "retail-2026-02",
  packages: {basic: [1800000,2200000], complete: [4000000,5000000], custom: [1800000,2200000]},
  branches: {one:[0,0], few:[500000,800000], many:[1000000,1500000]},
  counters: {one:[0,0], few:[200000,400000], many:[400000,700000], unsure:[0,400000]},
  addons: [
    {id:"expiry",name:"သက်တမ်းကုန်ရက် စစ်ချင်တယ်",price:[300000,500000]},
    {id:"units",name:"ဘူး / ကတ် / ဖာ အလိုက် ရောင်းမယ်",price:[200000,300000]},
    {id:"warehouse",name:"ဂိုဒေါင် သီးခြားရှိတယ်",price:[300000,500000]},
    {id:"promotion",name:"Member / Promotion ပေးမယ်",price:[400000,600000]},
    {id:"migration",name:"Data အဟောင်း ထည့်ချင်တယ်",price:[100000,300000]},
    {id:"offline",name:"အင်တာနက်မရှိချိန်လည်း ရောင်းမယ်",price:[400000,600000]}
  ]
};
