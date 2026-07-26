import { Editor } from '@tinymce/tinymce-react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  id?: string;
  height?: number;
}

export default function RichTextEditor({ value, onChange, height = 600 }: Props) {
  return (
    <Editor
      apiKey={import.meta.env.VITE_TINYMCE_API_KEY || ''}
      value={value}
      onEditorChange={(newValue) => onChange(newValue)}
      init={{
        height,
        menubar: true,
        plugins: [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
          'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
          'fullscreen', 'insertdatetime', 'media', 'table', 'help', 'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter alignright alignjustify | ' +
          'bullist numlist outdent indent | removeformat | image media link | code fullscreen help',
        content_style:
          'body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 16px; line-height: 1.6; padding: 1rem; }',
        promotion: false,
        branding: false,
        statusbar: true,
      }}
    />
  );
}
