var CircleSymbolPainter = function(options) {
  mergeOptions(CircleSymbolPainter.defaults, options, this);
}

CircleSymbolPainter.defaults = {
  radius: 4,
  style: {
    stroke: '#555',
    fill: '#aaa'
  },
  animation: {
    duration: 1000,
    easing: 'bounce',
    from: {scale: '0.001 0.001', opacity: 0.0},
    to: {scale: '1.0 1.0', opacity: 1.0}
  }
}

CircleSymbolPainter.prototype = {
  drawSymbol: function(paper, point) {
    point.shape = paper.circle(point.x, point.y, this.radius).attr(this.style);
    if(this.animation) {
      point.shape.attr(this.animation.from);
      point.shape.animate(this.animation.to, this.animation.duration, this.animation.easing);
    }
  }
}
