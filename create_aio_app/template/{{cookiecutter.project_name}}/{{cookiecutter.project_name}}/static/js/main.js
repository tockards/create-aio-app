// main component
var MainComponent = React.createClass({
  translateMarkdown: function (iniText) {
    return {
      __html: marked(iniText)
    };
  },

  getInitialState: function () {
    var iniText = 'I am using __markdown__.';
    return {
      text: iniText,
      markedText: this.translateMarkdown(iniText)
    };
  },

  // for initial state -- getting markdown preview from GitHub
  // source https://github.github.com/github-flavored-markdown/sample_content.html
  componentDidMount: function () {
    this.request = $.get('https://github.github.com/github-flavored-markdown/sample_content.html', function (result) {
      var splitted = result.split(/(<\/?body>\W<\/?pre>)|(<\/?pre>\W<\/?body>)/gmi);
      if (splitted.length !== 0) {
        var textToInit = splitted[3].replace(/(&gt;)/gmi, '>');
        textToInit = textToInit.replace(/(&lt;)/gmi, '<');
        this.setState({
          text: textToInit,
          markedText: this.translateMarkdown(textToInit)
        });
      }
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.request.abort();
  },

  textChanged: function (event) {
    var changed = event.target.value
    this.setState({
      text: changed,
      markedText: this.translateMarkdown(changed)
    });
  },

  render: function () {
    return (
      <div className="row">
        <div className="col-md-6 col-xs-12">
          { /* place for text input component */ }
          <h1 className="text-center">Text input here:</h1>
          <textarea autofocus={true} className="textInput form-control" value={this.state.text} onChange= {this.textChanged}>
          </textarea>
        </div>
        <div className="col-md-6 col-xs-12">
          { /* place for text output component */ }
          <h1 className="text-center">Text output here:</h1>
          <div className="outputText" dangerouslySetInnerHTML={this.state.markedText} />
        </div>
      </div>
    );
  }
});

// render the whole view with components
ReactDOM.render(
  <MainComponent />,
  document.getElementById('container')
);