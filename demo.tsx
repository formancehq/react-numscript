import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup";
import {numscript} from "codemirror-lang-numscript";
import React, {useRef, useEffect} from 'react';
import ReactDOM from "react-dom";

const script1 = `
send [USD/2 100] (
  source = @world
  destination = {
    90% to @users:001
    remaining to {
      10% to @charity
      remaining to @platform
    }
  }
)
`;

const script2 = `
vars {
  account  $order
  monetary $price = meta($order, "price")
}

send $price (
  source = {
    @payments:001
    @users:001:wallet
    @world
  }
  destination = $order
)
`;

const NumscriptBlock = ({script}) => {
  const editor = useRef();

  useEffect(() => {
    const state = EditorState.create({doc: script, extensions: [
      basicSetup,
      numscript(),
    ]});

    const view = new EditorView({
      state,
      parent: editor.current,
    });

    return () => {
      view.destroy();
    }
  }, []);

  return (
    <div>
      <div ref={editor}></div>
    </div>
  );
}

const App = () => {
  return (
    <div>
      <h2>Doing things</h2>
      <p>You can do this:</p>
      <NumscriptBlock script={script1}></NumscriptBlock>
      <p>Alternatively, can do that:</p>
      <NumscriptBlock script={script2}></NumscriptBlock>
    </div>
  );
}

const container = document.querySelector('#app');
ReactDOM.render(<App></App>, container);
