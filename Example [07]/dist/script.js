"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// View a more complex version of this project with custom toolbar here: https://codepen.io/no_stack_dub_sack/pen/JbPZvm?editors=0110
// coded by @no-stack-dub-sack (github) / @no_stack_sub_sack (codepen)
var projectName = "markdown-previewer";
localStorage.setItem("example_project", "Markdown Previewer"); // ALLOWS LINE BREAKS WITH RETURN BUTTON

marked.setOptions({
  breaks: true
}); // INSERTS target="_blank" INTO HREF TAGS (required for codepen links)

var renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  return "<a target=\"_blank\" href=\"".concat(href, "\">").concat(text) + "</a>";
};

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      markdown: placeholder,
      editorMaximized: false,
      previewMaximized: false
    };
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.handleEditorMaximize = _this.handleEditorMaximize.bind(_assertThisInitialized(_this));
    _this.handlePreviewMaximize = _this.handlePreviewMaximize.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(App, [{
    key: "handleChange",
    value: function handleChange(e) {
      this.setState({
        markdown: e.target.value
      });
    }
  }, {
    key: "handleEditorMaximize",
    value: function handleEditorMaximize() {
      this.setState({
        editorMaximized: !this.state.editorMaximized
      });
    }
  }, {
    key: "handlePreviewMaximize",
    value: function handlePreviewMaximize() {
      this.setState({
        previewMaximized: !this.state.previewMaximized
      });
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.state.editorMaximized ? ["editorWrap maximized", "previewWrap hide", "fa fa-compress"] : this.state.previewMaximized ? ["editorWrap hide", "previewWrap maximized", "fa fa-compress"] : ["editorWrap", "previewWrap", "fa fa-arrows-alt"];
      return React.createElement("div", null, React.createElement("div", {
        className: classes[0]
      }, React.createElement(Toolbar, {
        icon: classes[2],
        onClick: this.handleEditorMaximize,
        text: "Editor"
      }), React.createElement(Editor, {
        markdown: this.state.markdown,
        onChange: this.handleChange
      })), React.createElement("div", {
        className: "converter"
      }), React.createElement("div", {
        className: classes[1]
      }, React.createElement(Toolbar, {
        icon: classes[2],
        onClick: this.handlePreviewMaximize,
        text: "Previewer"
      }), React.createElement(Preview, {
        markdown: this.state.markdown
      })));
    }
  }]);

  return App;
}(React.Component);

var Toolbar = function Toolbar(props) {
  return React.createElement("div", {
    className: "toolbar"
  }, React.createElement("i", {
    title: "no-stack-dub-sack",
    className: "fa fa-free-code-camp"
  }), props.text, React.createElement("i", {
    onClick: props.onClick,
    className: props.icon
  }));
};

var Editor = function Editor(props) {
  return React.createElement("textarea", {
    id: "editor",
    value: props.markdown,
    onChange: props.onChange,
    type: "text"
  });
};

var Preview = function Preview(props) {
  return React.createElement("div", {
    id: "preview",
    dangerouslySetInnerHTML: {
      __html: marked(props.markdown, {
        renderer: renderer
      })
    }
  });
};

var placeholder = "# Welcome to my React Markdown Previewer!\n\n## This is a sub-heading...\n### And here's some other cool stuff:\n  \nHeres some code, `<div></div>`, between 2 backticks.\n\n```\n// this is multi-line code:\n\nfunction anotherExample(firstLine, lastLine) {\n  if (firstLine == '```' && lastLine == '```') {\n    return multiLineCode;\n  }\n}\n```\n  \nYou can also make text **bold**... whoa!\nOr _italic_.\nOr... wait for it... **_both!_**\nAnd feel free to go crazy ~~crossing stuff out~~.\n\nThere's also [links](https://www.freecodecamp.com), and\n> Block Quotes!\n\nAnd if you want to get really crazy, even tables:\n\nWild Header | Crazy Header | Another Header?\n------------ | ------------- | ------------- \nYour content can | be here, and it | can be here....\nAnd here. | Okay. | I think we get it.\n\n- And of course there are lists.\n  - Some are bulleted.\n     - With different indentation levels.\n        - That look like this.\n\n\n1. And there are numbererd lists too.\n1. Use just 1s if you want! \n1. But the list goes on...\n- Even if you use dashes or asterisks.\n* And last but not least, let's not forget embedded images:\n\n![React Logo w/ Text](https://goo.gl/Umyytc)\n";
ReactDOM.render(React.createElement(App, null), document.getElementById("app"));