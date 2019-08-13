marked.setOptions({
    breaks: true,
    smartLists: true
});
const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:
  
Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`
  
You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.com), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | ------------- 
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbererd lists too.
1. Use just 1s if you want! 
1. But the list goes on...
- Even if you use dashes or asterisks.
* And last but not least, let's not forget embedded images:

![React Logo w/ Text](https://goo.gl/Umyytc)
`;

const Toolbar = (props) => {
  return (
      <div className="toolbar">
          <i className="fas fa-chess" />
          {props.text}
          <i onClick={props.onClick} className={props.icon} />
      </div>
  );
};
const Editor = (props) => {
    return (
        <textarea
            id="editor"
            value={props.markdown}
            onChange={props.onChange}
        />
    );
};
const Preview = (props) => {
    return (
        <div
            id="preview"
            dangerouslySetInnerHTML={{
                __html: marked(props.markdown)
            }}
        />
    );
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: placeholder,
            editorMaximized: false,
            previewMaximized: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleEditorMaximize = this.handleEditorMaximize.bind(this);
        this.handlePreviewMaximize = this.handlePreviewMaximize.bind(this);
    }
    handleChange(e) {
        this.setState({
            markdown: e.target.value
        });
    }
    handleEditorMaximize() {
        this.setState((prevState) => {
            return {editorMaximized: !prevState.editorMaximized};
        });
    }
    handlePreviewMaximize() {
        this.setState((prevState) => {
            return {previewMaximized: !prevState.previewMaximized};
        });
    }
    render() {
        const classes = this.state.editorMaximized
            ? ["editorWrap maximized", "previewWrap hide", "fas fa-compress"]
            : this.state.previewMaximized
                ? ["editorWrap hide", "previewWrap maximized", "fas fa-compress"]
                : ["editorWrap", "previewWrap", "fas fa-expand"];
        return (
            <div>
                <div className={classes[0]}>
                    <Toolbar
                        icon={classes[2]}
                        onClick={this.handleEditorMaximize}
                        text="MaverickNone's Editor"
                    />
                    <Editor
                        markdown={this.state.markdown}
                        onChange={this.handleChange}
                    />
                </div>
                <div className={classes[1]}>
                    <Toolbar
                        icon={classes[2]}
                        onClick={this.handlePreviewMaximize}
                        text="MaverickNone's Previewer"
                    />
                    <Preview markdown={this.state.markdown} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("app"));