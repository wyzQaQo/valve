import Script from 'next/script';

/**
 * GA4（100duplex.com · G-NB2JD8MPVM）。
 *
 * 内部流量标记：Cloudflare 边缘规则按来源 IP 下发 ga_internal=china_headquarters
 * cookie（内部 IP 30 天有效，其他访问清空）。这里读 cookie 并作为 config 的
 * traffic_type 参数传给 GA4——等价于 GA 后台「定义内部流量」，但不必在 GA 界面
 * 逐个媒体资源配置（Admin API 没有提供该资源）。
 */
const MID = 'G-NB2JD8MPVM';

const INIT = `
(function () {
  var m = document.cookie.match(/(?:^|; )ga_internal=([^;]*)/);
  var tt = m ? decodeURIComponent(m[1]) : '';
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  var cfg = { send_page_view: true };
  if (tt) { cfg.traffic_type = tt; }
  gtag('config', 'G-NB2JD8MPVM', cfg);
})();`;

export default function GoogleAnalytics() {
  return (
    <>
      <Script src="https://www.googletagmanager.com/gtag/js?id=G-NB2JD8MPVM" strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: INIT }} />
    </>
  );
}
