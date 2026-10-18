/** Paste into a standalone Google Apps Script project. Set SPREADSHEET_ID in Script Properties. */
function doPost(e) {
  let lock;
  try {
    const p=e.parameter;
    if(p.website || p.consent!=='yes') throw new Error('Invalid request');
    const name=String(p.name||'').trim(), phone=String(p.phone||'').trim(), address=String(p.address||'').trim();
    if(!name || name.length>100 || !/^[+0-9 ()-]{7,25}$/.test(phone) || !address || address.length>500) throw new Error('Invalid contact details');
    if(!/^[a-zA-Z0-9-]{20,80}$/.test(p.requestId||'') || (p.payload||'').length>8000) throw new Error('Invalid request');
    const data=JSON.parse(p.payload), a=data.answers;
    const allowed={shop:['grocery','fashion','beauty','other'],branches:['one','few','many'],counters:['one','few','many','unsure'],package:['basic','complete','custom']};
    Object.keys(allowed).forEach(k=>{if(!a || !allowed[k].includes(a[k]))throw new Error('Invalid selection');});
    const prices={basic:[500000,700000],complete:[1000000,1400000],custom:[500000,700000]};
    const branches={one:[0,0],few:[300000,600000],many:[700000,1400000]};
    const counters={one:[0,0],few:[150000,300000],many:[350000,700000],unsure:[0,300000]};
    const addons={expiry:[150000,250000],units:[100000,180000],warehouse:[150000,250000],promotion:[200000,400000],migration:[50000,200000],offline:[400000,800000]};
    if(data.pricingVersion!=='demo-2026-01')throw new Error('Pricing version changed. Please reload the estimator.');
    if(!Array.isArray(a.addons)||a.addons.length>6||new Set(a.addons).size!==a.addons.length||a.addons.some(k=>!addons[k]))throw new Error('Invalid add-ons');
    const range=prices[a.package].map((v,i)=>v+branches[a.branches][i]+counters[a.counters][i]+a.addons.reduce((n,k)=>n+addons[k][i],0));
    const id=PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if(!id)throw new Error('Storage not configured');
    lock=LockService.getScriptLock();lock.waitLock(20000);
    const book=SpreadsheetApp.openById(id);
    let sheet=book.getSheetByName('Leads');
    if(!sheet){sheet=book.insertSheet('Leads');sheet.appendRow(['Received at','Request ID','Name','Phone','Address','Shop','Branches','Counters per shop','Package','Add-ons','Estimate min MMK','Estimate max MMK','Pricing version','Status','Consent']);sheet.setFrozenRows(1);}
    const found=sheet.getLastRow()>1?sheet.getRange(2,2,sheet.getLastRow()-1,1).createTextFinder(p.requestId).matchEntireCell(true).findNext():null;
    if(!found){
      // Formula-injection protection. Contact details remain text, never spreadsheet formulas.
      const safe=v=>/^[\s]*[=+\-@]/.test(String(v))?"'"+v:String(v);
      sheet.appendRow([new Date(),p.requestId,safe(name),safe(phone),safe(address),a.shop,a.branches,a.counters,a.package,a.addons.join(', '),range[0],range[1],'demo-2026-01','New / preliminary','yes']);
      SpreadsheetApp.flush();
    }
    return page_('ပေးပို့မှု အောင်မြင်ပါပြီ။','သင့်အချက်အလက်နှင့် ရွေးချယ်မှုများကို သိမ်းဆည်းပြီးပါပြီ။ မူလ tab သို့ ပြန်သွားနိုင်ပါပြီ။');
  } catch(err) {
    console.error(err);
    return page_('မသိမ်းဆည်းနိုင်သေးပါ။','မူလ tab သို့ ပြန်သွားပြီး အချက်အလက်စစ်၍ ထပ်မံပေးပို့ပါ။ ဆက်ဖြစ်နေလျှင် ဝန်ဆောင်မှုပေးသူထံ ဆက်သွယ်ပါ။');
  } finally {if(lock && lock.hasLock())lock.releaseLock();}
}
function doGet(){return page_('POS Studio','Website မှတစ်ဆင့် လိုအပ်ချက်များကို ပေးပို့ပါ။');}
function page_(title,message){return HtmlService.createHtmlOutput('<!doctype html><html lang="my"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>POS Studio</title><body style="background:#f5f7ef;color:#193c32;font-family:sans-serif;line-height:2;padding:40px;max-width:650px;margin:auto"><h1>'+title+'</h1><p>'+message+'</p></body></html>');}
