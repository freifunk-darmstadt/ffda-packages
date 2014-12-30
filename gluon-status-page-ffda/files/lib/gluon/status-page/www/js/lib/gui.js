"use strict";
define([ 'lib/gui/nodeinfo'
       , 'lib/gui/statistics'
       , 'lib/gui/neighbourlist'
       , 'lib/gui/menu'
       , 'lib/streams'
       , 'lib/neighbourstream'
       , 'vendor/d3'
       ], function ( NodeInfo
                   , Statistics
                   , NeighbourList
                   , Menu
                   , Streams
                   , NeighbourStream
                   , d3
                   ) {

  function VerticalSplit(parent) {
    var el = document.createElement("div");
    el.className = "vertical-split";
    parent.appendChild(el);

    el.push = function (child) {
      var header = document.createElement("h2");
      header.appendChild(child.title);

      var div = document.createElement("div");
      div.className = "frame";
      div.node = child;
      div.appendChild(header);
      div.appendChild(child.content);

      el.appendChild(div);

      return function () {
        div.node.destroy();
        el.removeChild(div);
      }
    }

    el.clear = function () {
      while (el.firstChild) {
        el.firstChild.node.destroy();
        el.removeChild(el.firstChild);
      }
    }

    return el;
  }

  function Tabs(parent) {
    var el = document.createElement("div");
    el.className = "tabbed";

    var bar = document.createElement("ul");
    bar.className = "bar";

    el.appendChild(bar);

    var children = document.createElement("ul");
    children.className = "children";

    el.appendChild(children);

    parent.appendChild(el);

    var active;

    el.push = function (child) {
      var header = document.createElement("li");
      header.appendChild(child.title);

      bar.appendChild(header);

      var frame = document.createElement("li");
      frame.className = "frame";
      frame.node = child;
      frame.appendChild(child.content);
      frame.header = header;
      header.frame = frame;

      children.appendChild(frame);

      if (bar.childNodes.length == 1) {
        header.className = "active";
        active = frame;
      }

      header.onclick = function (e) {
        focus(this.frame);
      }

      function focus(o) {
        for (var i = 0; i < bar.childNodes.length; i++)
          bar.childNodes.item(i).classList.remove("active");

        frame.header.classList.add("active");
        scrollTo(o);
        active = o;
      }

      function scrollTo(o) {
        var offset = o.offsetLeft - children.offsetLeft;
        d3.select(children).transition().tween("scrollLeft", scrollTween(offset));
      }

      function scrollTween(offset) {
        return function() {
          var i = d3.interpolateNumber(this.scrollLeft, offset);
          return function(t) { this.scrollLeft = i(t) }
        }
      }

      window.addEventListener('resize', resize, false);

      function resize(e) {
        var offset = active.offsetLeft - children.offsetLeft;
        children.scrollLeft = offset;
      }

      return function () {
        frame.node.destroy();
        bar.removeChild(header);
        children.removeChild(frame);
      }
    }

    el.clear = function () {
      while (bar.firstChild)
        bar.removeChild(bar.firstChild);

      while (children.firstChild) {
        children.firstChild.node.destroy();
        children.removeChild(children.firstChild);
      }
    }

    return el;
  }

  return function (mgmtBus, nodesBus) {
    function setTitle(node, state) {
      var title = node?node.hostname:"(not connected)";

      document.title = title;
      h1.textContent = title;

      var icon = document.createElement("i");
      icon.className = "icon-down-dir";

      h1.appendChild(icon);

      switch (state) {
        case "connect":
          stateIcon.className = "icon-arrows-cw animate-spin";
          break;
        case "fail":
          stateIcon.className = "icon-attention";
          break;
        default:
          stateIcon.className = "";
          break;
      }
    }

    var nodes = [];

    function nodeMenu() {
      var myNodes = nodes.slice();

      myNodes.sort(function (a, b) {
        a = a.hostname;
        b = b.hostname;
        return (a<b)?-1:(a>b);
      });

      var menu = myNodes.map(function (d) {
        return [d.hostname, function () {
          mgmtBus.pushEvent("goto", d);
        }]
      });

      new Menu(menu).apply(this);
    }

    var header = document.createElement("header");
    var h1 = document.createElement("h1");
    header.appendChild(h1);

    h1.onclick = nodeMenu;

    var icons = document.createElement("p");
    icons.className = "icons";
    header.appendChild(icons);

    var stateIcon = document.createElement("i");
    icons.appendChild(stateIcon);

    document.body.appendChild(header);

    var container = document.createElement("div");
    container.className = "container";

    document.body.appendChild(container);

    setTitle();

    var content = new Tabs(container);

    function nodeChanged(nodeInfo) {
      setTitle(nodeInfo, "connect");

      content.clear();
      content.push(new NodeInfo(nodeInfo));
    }

    function nodeNotArrived(nodeInfo) {
      setTitle(nodeInfo, "fail");
    }

    function nodeArrived(nodeInfo, ip) {
      setTitle(nodeInfo);

      var neighbourStream = new NeighbourStream(mgmtBus, nodesBus, ip);
      var statisticsStream = new Streams.statistics(ip);

      content.push(new Statistics(statisticsStream));
      content.push(new NeighbourList(neighbourStream, mgmtBus));
    }

    function newNodes(d) {
      nodes = [];
      for (var nodeId in d)
        nodes.push(d[nodeId]);
    }

    mgmtBus.onEvent({ "goto": nodeChanged
                    , "arrived": nodeArrived
                    , "gotoFailed": nodeNotArrived
                    });

    nodesBus.map(".nodes").onValue(newNodes);

    return this;
  }
})
