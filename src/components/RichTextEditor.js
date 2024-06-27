// src/components/RichTextEditor.js
import React, { useRef, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setContent(value || '');
    }
  }, [value]);

  const handleEditorChange = (content, editor) => {
    if (onChange) {
      onChange(content);
    }
  };

  return (
    <Editor
      onInit={(evt, editor) => (editorRef.current = editor)}
      initialValue={value || ''}
      apiKey={process.env.REACT_APP_EditorAPI_KEY}
      init={{
        height: 300,
        menubar: true,
        plugins: [
          'advlist autolink lists link image',
          'charmap print preview anchor help',
          'searchreplace visualblocks code',
          'insertdatetime media table paste wordcount',
        ],
        toolbar:
          `undo redo | formatselect | bold italic | \
          alignleft aligncenter alignright | \
          bullist numlist outdent indent | help`,
      }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default RichTextEditor;
