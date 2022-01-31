import {EditorState, EditorView, basicSetup} from "@codemirror/basic-setup";
import {numscript} from "codemirror-lang-numscript";
import React, {useRef, useEffect} from 'react';
import 'bundle-text:./editor.css';

const NumscriptBlock = ({script, callback}) => {
  const editor = useRef();

  useEffect(() => {
    let view;

    const state = EditorState.create({doc: script, extensions: [
      basicSetup,
      numscript(),
      EditorView.updateListener.of(() => {
        if (callback) {
          callback(view, state);
        }
      }),
    ]});

    view = new EditorView({
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

export {
  NumscriptBlock,
}