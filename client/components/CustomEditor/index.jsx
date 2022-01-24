import React, { useState, useEffect, useRef } from 'react';

export default function MyEditor({ input, setInput, onChange }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    };
    setEditorLoaded(true);
  }, []);

  return editorLoaded ? (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={input}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'blockQuote',
            'link',
            // '|',
            // 'imageUpload',
            // 'mediaEmbed',
            '|',
            'undo',
            'redo',
          ],
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          // console.log('Editor is ready to use!', editor);
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          // console.log({ event, editor, data });
          setInput(data);
          onChange(data);
        }}
      />
    </>
  ) : (
    <div>Editor loading</div>
  );
}
