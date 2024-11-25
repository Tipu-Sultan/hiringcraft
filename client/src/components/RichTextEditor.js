// src/components/RichTextEditor.js
import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ value, onChange }) => {
  const handleEditorChange = (content) => {
    onChange(content); // Handle content change
  };

  return (
    <Editor
      apiKey={process.env.REACT_APP_EditorAPI_KEY} // Add your API key
      value={value} // Directly bind value here
      onEditorChange={handleEditorChange} // Handle content change
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
    />
  );
};

export default RichTextEditor;
