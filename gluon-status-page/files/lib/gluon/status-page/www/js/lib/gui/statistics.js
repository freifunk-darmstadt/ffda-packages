"use strict";
define(["lib/helper"], function (Helper) {
  function streamElement(type, stream) {
    var el = document.createElement(type);
    el.destroy = stream.onValue(update);

    function update(d) {
      el.textContent = d;
    }

    return el;
  }

  function streamNode(stream) {
    var el = document.createTextNode("");
    el.destroy = stream.onValue(update);

    function update(d) {
      el.textContent = d;
    }

    return el;
  }

  function mkRow(table, children, label, stream) {
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    var td = streamElement("td", stream);
    th.textContent = label;
    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);
    children.push(td);
  }

  function mkTrafficRow(table, children, label, stream) {
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    var td = document.createElement("td");
    th.textContent = label;

    var pkts = streamNode(stream.map(".packets").slidingWindow(2, 2).map(prettyPackets));
    var bw = streamNode(stream.map(".bytes").slidingWindow(2, 2).map(prettyBits));
    var bytes = streamNode(stream.map(".bytes").map(prettyBytes));

    td.appendChild(pkts);
    td.appendChild(document.createElement("br"));
    td.appendChild(bw);
    td.appendChild(document.createElement("br"));
    td.appendChild(bytes);

    tr.appendChild(th);
    tr.appendChild(td);
    table.appendChild(tr);

    children.push(pkts);
    children.push(bw);
    children.push(bytes);
  }

  function prettyPackets(d) {
    var v = new Intl.NumberFormat("de-DE").format(d[1] - d[0]);
    return v + " Pakete/s";
  }

  function prettyBits(d) {
    var units = [ "bps", "kbps", "Mbps", "Gbps" ];
    var unit = 0;

    var v = (d[1] - d[0]) * 8;

    while (v > 1024 && unit < 4) {
      v /= 1024;
      unit++;
    }

    v = new Intl.NumberFormat("de-DE", {maximumSignificantDigits: 3}).format(v);
    return v + " " + units[unit];
  }

  function prettyBytes(v) {
    var units = [ "B", "kB", "MB", "GB" ];
    var unit = 0;

    while (v  > 1024 && unit < 4) {
      v /= 1024;
      unit++;
    }

    v = new Intl.NumberFormat("de-DE", {maximumSignificantDigits: 3}).format(v);

    return v + " " + units[unit];
  }

  function prettyUptime(seconds) {
    var minutes = Math.round(seconds/60);

    var days = Math.floor(minutes / 1440);
    var hours = Math.floor((minutes % 1440) / 60);
    var minutes = Math.floor(minutes % 60);

    var out = "";

    if (days == 1)
      out += "1 Tag, ";
    else if (days > 1)
      out += days + " Tage, ";

    out += hours + ":";

    if (minutes < 10)
      out += "0";

    out += minutes;

    return out;
  }

  function prettyNVRAM(usage) {
    return new Intl.NumberFormat("de-DE", {maximumSignificantDigits: 3}).format(usage*100) + "% belegt";
  }

  function prettyLoad(load) {
    return new Intl.NumberFormat("de-DE", {maximumSignificantDigits: 3}).format(load);
  }

  function prettyRAM(memory) {
    var usage = 1 - (memory.free + memory.buffers) / memory.total;
    return prettyNVRAM(usage);
  }

  return function (stream) {
    var children = [];
    var el = document.createElement("div");
    var table = document.createElement("table");

    mkRow(table, children, "Laufzeit", stream.map(".uptime").map(prettyUptime));
    mkRow(table, children, "Systemlast", stream.map(".loadavg").map(prettyLoad));
    mkRow(table, children, "RAM", stream.map(".memory").map(prettyRAM));
    mkRow(table, children, "NVRAM", stream.map(".rootfs_usage").map(prettyNVRAM));
    mkRow(table, children, "Gateway", stream.map(".gateway"));
    mkRow(table, children, "Clients", stream.map(".clients.total"));

    var pre = document.createElement("pre");

    el.appendChild(table);

    var h = document.createElement("h3");
    h.textContent = "Traffic";
    el.appendChild(h);

    table = document.createElement("table");

    mkTrafficRow(table, children, "Gesendet", stream.map(".traffic.rx"));
    mkTrafficRow(table, children, "Empfangen", stream.map(".traffic.tx"));
    mkTrafficRow(table, children, "Weitergeleitet", stream.map(".traffic.forward"));

    el.appendChild(table);

    function destroy() {
      children.forEach(function (d) {d.destroy()});
    }

    return { title: document.createTextNode("Statistik")
           , content: el
           , destroy: destroy
           }
  }
})
