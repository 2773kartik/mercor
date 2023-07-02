import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface RichTextEditor {
    onChange: (content:string) => void;
}

const RichTextEditor = ({ onChange }:RichTextEditor) => {
    const [editorContent, setEditorContent] = useState('');
  
    const handleEditorChange = (content:string, delta:any, source:string, editor:any) => {
      onChange(content);
    setEditorContent(content);
    };
  
    return (
      <ReactQuill
        className='bg-white text-black'
        value={editorContent}
        onChange={handleEditorChange}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ color: [] }, { background: [] }],
            [{ script: 'sub' }, { script: 'super' }],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ indent: '-1' }, { indent: '+1' }],
            ['link', 'image', 'video'],
            ['clean'],
          ],
        }}
        formats={[
          'header',
          'bold',
          'italic',
          'underline',
          'strike',
          'color',
          'background',
          'script',
          'blockquote',
          'code-block',
          'list',
          'bullet',
          'indent',
          'link',
          'image',
          'video',
        ]}
      />
    );
  };
  
    export default RichTextEditor;