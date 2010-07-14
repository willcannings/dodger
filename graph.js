var Graph = function(options) {
  ensurePropertiesPresent(options, 'width', 'height');
  mergeOptions(Graph.defaults, options, this);
  this.setAxisPainter(this.axisPainter);
  this.painters = [];
  this.paper    = Raphael(this.element, this.width, this.height);
}

Graph.defaults = {
  gutter: 10,
  width: null,
  height: null,
  element: document.body,
  axisPainter: null
}


Graph.prototype = {
  draw: function() {
    // draw the axis and background
    if(this.axisPainter != null)
      this.axisPainter.draw();
    
    // draw the series data
    for(var i = 0, ii = this.painters.length; i < ii; i++)
      this.painters[i].draw();
    
    // force a redraw
    this.paper.safari();
  },
  
  scaleSeries: function(series) {
    var scaledSeries = new Series();
    var minX    = series.minX();
    var maxY    = series.maxY();
    var rangeX  = series.maxX() - series.minX();
    var rangeY  = series.maxY() - series.minY();
    var gWidth  = this.width - (2 * this.gutter);
    var gHeight = this.height - (2 * this.gutter);
    
    for(var i = 0, ii = series.points.length; i < ii; i++) {
      var point = series.points[i];
      var scaledX = (((point.x - minX) / rangeX) * gWidth) + this.gutter + 0.5;
      var scaledY = (((maxY - point.y) / rangeY) * gHeight) + this.gutter + 0.5;
      scaledSeries.addPoint(scaledX, scaledY, point.label1, point.label2);
    }
    return scaledSeries;
  },
  
  setAxisPainter: function(painter) {
    if(painter == undefined || painter == null)
      return;
    painter.graph = this;
    this.axisPainter = painter;
  }
}
